from .alias_dict import AliasDict
from .image_hash_dict import ImageHashDict

class EmojiDict:
    def __init__(self, emoji_dict):
        self.emoji_dict = emoji_dict
        self._image_hash_dict = None
        self._alias_dict = None

    def get(self, key, default = None):
        return self.emoji_dict.get(key, default)

    def get_emoji(self, key, default = None):
        return self.get(key, default)

    def get_aliases(self, key, default = set()):
        return self.alias_dict().get(key, default)

    def get_emoji_name_for_image(self, image):
        return self.image_hash_dict().get_for_image(image)

    def add_alias(self, emoji_name, aliased_from):
        self.emoji_dict.update(emoji_name = aliased_from)
        self.alias_dict().update(emoji_name, aliased_from)

        return self.emoji_dict

    def add_emoji(self, emoji_name, image_path, image_file):
        self.emoji_dict.update(emoji_name = image_path)
        self.alias_dict().update(emoji_name, emoji_name)
        self.image_hash_dict().update(emoji_name, image_file=image_file)

        return self.emoji_dict

    def alias_dict(self):
        if self._alias_dict is None:
            self._alias_dict = AliasDict(self.emoji_dict)

        return self._alias_dict

    def image_hash_dict(self):
        """ crucial to lazy-load because initialization makes many API calls. """
        if self._image_hash_dict is None:
            self._image_hash_dict = ImageHashDict(self.emoji_dict)

        return self._image_hash_dict
