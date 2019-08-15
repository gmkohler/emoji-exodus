import os
import sys
import slack
from .slack_emoji_client import SlackEmojiClient

def emoji_client(token):
    return SlackEmojiClient(token)
