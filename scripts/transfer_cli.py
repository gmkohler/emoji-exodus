import click
import csv
import os
import re
import time
from slack.errors import SlackApiError
from emoji import emoji_transfer_service, emoji_service, find_all_emoji_by_name
from util.iterable import each_slice
from util.status_codes import TOO_MANY_REQUESTS
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE

class InputError(Exception):
    pass


SLEEP_SECONDS = os.environ.get('SLEEP_SECONDS', 60)
SLICE_SIZE = os.environ.get('SLICE_SIZE', 30) # empirically, the API accepts 30 calls per minute.

@click.command()
@click.option('--csv_filename', default=None, help='A csv filename including emoji names from the source which should be transferred')
@click.argument('emoji_names', nargs=-1)
def import_emoji(emoji_names, csv_filename):
    """
    Transfers emoji from one slack to another via EmojiTransferService.

    Input argument (CLI) can be a series of names or a path to a CSV file (via `--csv_filename` option).

    Source and destination are configured via environment variables defined by the *_ENV_VARIABLE
    consants in util.tokens.

    Slicing is done to pre-emptively avoid rate-limiting, but rate-limiting is also handled.
    """
    if not bool(csv_filename) ^ bool(emoji_names):
        raise InputError("You must either provide a list emoji_names or provide a CSV file via the --csv_filename option")

    source_dict = emoji_service(os.environ.get(SOURCE_ENV_VARIABLE)).emoji_dict.emoji_dict
    destination_service = emoji_service(os.environ.get(DESTINATION_ENV_VARIABLE))
    if bool(csv_filename):
        emoji_names = _emoji_from_csv(csv_filename)

    emoji_names_to_be_transferred = sorted(find_all_emoji_by_name(emoji_names, source_dict))

    failed_emoji = []
    try:
        for emoji_name_slice in each_slice(emoji_names_to_be_transferred, SLICE_SIZE):
            uploads_for_slice = 0 # avoids proactive waiting in idempotency.
            for emoji_name in emoji_name_slice:
                try:
                    result = emoji_transfer_service.transfer(
                        source_dict,
                        destination_service,
                        emoji_name
                    )
                    if result is not None:
                        uploads_for_slice += 1
                except SlackApiError as api_error:
                    failed_emoji.append(emoji_name)
                    print("SlackApiError {} encountered for emoji {}.".format(
                        api_error.response.data.get('error', '(unknown)'),
                        emoji_name
                    ))
                    # Too Many Requests should come with a 'Retry-After' header per the documentation.
                    if api_error.response.status_code == TOO_MANY_REQUESTS:
                        # The response includes a Retry-After header but in practice it doens't allow
                        # many more requests after this value before failing with another 429.
                        # Instead of eating that many failures, we'll sleep for 60 seconds, which in
                        # practice allows another 30 requests before failing agianag
                        print("🛑 Rate limit reached.  Sleeping for {} seconds".format(SLEEP_SECONDS))
                        time.sleep(SLEEP_SECONDS)
                except Exception as e:
                    failed_emoji.append(emoji_name)
                    print("Unknown exception {} for {}.".format(e, emoji_name))

            if uploads_for_slice > 0:
                print("😴 Proactive stalling.  Sleeping for {} seconds".format(SLEEP_SECONDS))
                time.sleep(SLEEP_SECONDS)
            else:
                print("No uploads for slice.  Onward and Upward 📈.")

        print("🎉 Transfer complete! 🎉")
    finally:
        if len(failed_emoji) > 0:
            print("😿 failed to transfer the following:\n{}\n\n\n\n\n\n\n".format(
                "\n".join(failed_emoji)
            ))

def _emoji_from_csv(csv_filename):
    emoji_names = set()
    with open(csv_filename, mode='r') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            emoji_names.add(row['emoji name'].strip())

    return emoji_names
