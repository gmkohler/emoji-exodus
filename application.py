import os
import sys
import slack

client = slack.WebClient(token=os.environ['SLACK_API_TOKEN'])

client.chat_postMessage(
    channel=os.environ['SLACK_SANDBOX_CHANNEL_ID'],
    text=sys.argv[1])
