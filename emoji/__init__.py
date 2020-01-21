import os
import sys
import slack
from .slack_emoji_service import SlackEmojiService
from .emoji_finder import EmojiFinder

def slack_emoji_service(token):
    return SlackEmojiService(token)


def find_all_emoji_by_name(emoji_names, emoji_dict):
    return EmojiFinder(emoji_names, emoji_dict).find_all()
