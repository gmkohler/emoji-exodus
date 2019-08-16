import os
import sys
import slack
from .emoji_service import EmojiService

def emoji_service(token):
    return EmojiService(token)
