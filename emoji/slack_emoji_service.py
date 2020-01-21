from .slack_emoji_client import SlackEmojiClient
from .dicts.emoji_dict import EmojiDict

class SlackEmojiService():
    def __init__(self, token):
        self.client = SlackEmojiClient(token = token)
        self.emoji_dict = EmojiDict(self.client.emoji_list().data['emoji'])

    def add_emoji(self, name, image_file, image_url):
        """ unfortunately the repsonse from the client is only { 'ok': True } so we don't have the actual URL """
        self.client.add_emoji(image_file, name)
        return self.emoji_dict.add_emoji(name, image_url=image_url, image_file=image_file)

    def add_alias(self, emoji_name, aliased_from):
        self.client.add_alias(emoji_name, aliased_from)
        return self.emoji_dict.add_alias(emoji_name, aliased_from)

    def destination_emoji_name_having_identical_image(self, emoji_name):
        return self.emoji_dict.alias_dict().get(emoji_name)
