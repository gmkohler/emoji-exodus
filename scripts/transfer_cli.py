import click
import csv
import os
import re
import time

from emoji import emoji_transfer_service, emoji_service, find_all_emoji_by_name
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE


class InputError(Exception):
    pass


CHUNK_SIZE = os.environ.get('CHUNK_SIZE', 40)
SLEEP_SECONDS = os.environ.get('SLEEP_SECONDS', 60)


@click.command()
@click.option('--source', default=None, help='A csv filename from which to import emoji')
@click.argument('emoji_names', nargs=-1)
def import_emoji(emoji_names, source):
    if not bool(source) ^ bool(emoji_names):
        raise InputError("You must either provide a list emoji_names or provide a CSV file via the --csv option")

    source_dict = emoji_service(os.environ.get(SOURCE_ENV_VARIABLE)).emoji_dict.emoji_dict
    destination_service = emoji_service(os.environ.get(DESTINATION_ENV_VARIABLE))
    if bool(source):
        emoji_names = _emoji_from_csv(source)

    emoji_names_to_be_transferred = find_all_emoji_by_name(emoji_names, source_dict)

    for emoji_names in each_slice(emoji_names_to_be_transferred):
        for emoji_name in emoji_names:
            try:
                emoji_transfer_service.transfer(
                    source_dict,
                    destination_service,
                    emoji_name
                )
            except:
                print("Unable to add {} - probably a standard emoji".format(emoji_name))


        if len(emoji_names) > 1:
            print("SLEEPING FOR {} SECONDS TO AVOID RATE LIMITING".format(SLEEP_SECONDS))
            time.sleep(SLEEP_SECONDS)

    print("🦙 Transfer complete! 🦙")

def _emoji_from_csv(source):
    emoji_names = set()
    with open(source, mode='r') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            emoji_names.add(row['emoji name'].strip())

    return emoji_names


def each_slice(iterable):
    """ Chunks the iterable into size elements at a time, each yielded as a list.

    Example:
      for chunk in each_slice(2, [1,2,3,4,5]):
          print(chunk)

      # output:
      [1, 2]
      [3, 4]
      [5]
    """
    current_slice = []
    for item in iterable:
        current_slice.append(item)
        if len(current_slice) >= CHUNK_SIZE:
            yield current_slice
            current_slice = []
    if current_slice:
        yield current_slice