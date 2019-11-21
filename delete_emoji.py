import os
import sys
import time
from util.status_codes import TOO_MANY_REQUESTS
from util.tokens import DESTINATION_ENV_VARIABLE
from slack.errors import SlackApiError
from emoji.slack_emoji_client import SlackEmojiClient

failed_emoji = []
try:
    client = SlackEmojiClient(os.environ[DESTINATION_ENV_VARIABLE])

    emoji = client.emoji_list().data['emoji']
    emoji_name = set(sys.argv[1:])

    if len(emoji_name) > 0:
        emoji_to_delete = { k: v for k, v in emoji.items() if k in emoji_name }
    else:
        emoji_to_delete = emoji

    for name, url in sorted(emoji_to_delete.items()):
        try:
            client.remove_emoji(name)
            print("deleted {}".format(name))
            time.sleep(1)
        except SlackApiError as error:
            print("failed on {}".format(name))
            failed_emoji.append(name)
            if error.response.status_code == TOO_MANY_REQUESTS:
                time_to_sleep = 60
                print("Rate limit reached. Sleeping {} seconds".format(time_to_sleep))
                time.sleep(time_to_sleep)
            else:
                print("Received SlackApiError: {}".format(error.response.data.get('error')))
        except Exception as e:
            failed_emoji.append(name)
            print("Unknown exception encountered while attempting to delete {}.".format(name))
finally:
    if len(failed_emoji) > 0:
        print("😿 deletion failed for:\n{}\n\n\n\n\n\n\n".format(
            "\n".join(sorted(failed_emoji))
        ))
