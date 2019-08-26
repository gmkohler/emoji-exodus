# import json
import os
import sys
from util.tokens import DESTINATION_ENV_VARIABLE

from emoji.slack_emoji_client import SlackEmojiClient

client = SlackEmojiClient(os.environ[DESTINATION_ENV_VARIABLE])

emoji = client.emoji_list().data['emoji']
emoji_name = set(sys.argv[1:])

if len(emoji_name) > 0:
    emoji_to_delete = { k: v for k, v in emoji.items() if k in emoji_name }
else:
    emoji_to_delete = emoji

for name, url in emoji_to_delete.items():
    try:
        client.remove_emoji(name)
        print("deleted {}".format(name))
    except:
        print("You don't have permission to delete {}".format(name))
