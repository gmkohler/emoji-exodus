from .slack_emoji_client import SlackEmojiClient
from .dicts.emoji_dict import EmojiDict
from image.image_client import get_from_url


class EmojiNotFoundError(Exception):
    pass


class SlackEmojiService():
    def __init__(self, token):
        self.client = SlackEmojiClient(token=token)
        self.emoji_dict = EmojiDict(self.client.emoji_list().data['emoji'])

    def add_emoji(self, name, image_file, image_url):
        """ unfortunately the repsonse from the client is only { 'ok': True } so we don't have the actual URL """
        self.client.add_emoji(image_file, name)
        return self.emoji_dict.add_emoji(name, image_path=image_url, image_file=image_file)

    def add_alias(self, emoji_name, aliased_from):
        self.client.add_alias(emoji_name, aliased_from)
        return self.emoji_dict.add_alias(emoji_name, aliased_from)

    def destination_emoji_name_having_identical_image(self, emoji_name):
        return self.emoji_dict.alias_dict().get(emoji_name)

    def get_path(self, emoji_name):
        return _url_even_if_alias(self.emoji_dict, emoji_name)

    def get_image(self, url):
        return get_from_url(url)


def _url_even_if_alias(emoji_dict, emoji_name):
    """If it's an alias, we want to get the url for the file.  Will return None if aliasing a standard emoji"""
    emoji_path = emoji_dict.get(emoji_name)

    if emoji_path is None:
        raise EmojiNotFoundError("'{}' is not the name of an emoji in the source.".format(emoji_name))
    if emoji_path.startswith("alias:"):
        aliased_from = emoji_path.replace("alias:", "")
        emoji_path = emoji_dict.get(aliased_from)

    return emoji_path

