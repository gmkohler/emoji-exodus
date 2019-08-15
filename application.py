# import json
import os
import sys
from emoji import emoji_transfer_service, emoji_client

source_client = emoji_client(os.environ["SOURCE_SLACK_API_TOKEN"])
destination_client = emoji_client(os.environ["DESTINATION_SLACK_API_TOKEN"])
# source_dict = json.load(open("results.json"))
# destination_dict = destination_client.emoji_dict()

emoji_transfer_service.transfer(source_client.emoji_dict(), destination_client, sys.argv[1])
