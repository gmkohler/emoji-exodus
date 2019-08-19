import os
import sys
import slack
from .emoji_service import EmojiService
from .emoji_finder import EmojiFinder

def emoji_service(token):
    return EmojiService(token)


def find_all_emoji_by_name(emoji_names, emoji_dict):
    return EmojiFinder(emoji_names, emoji_dict).find_all()
