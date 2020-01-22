from os import listdir
from os.path import isfile, join, splitext
from .dicts.emoji_dict import EmojiDict
from image import image_client


class DirectoryEmojiService():
    """ Only usable as a source; see the write_to_directory script for inspiration on letting this be a destination. """
    def __init__(self, directory_path):
        self.directory_path = directory_path
        self.emoji_dict = EmojiDict(_emoji_from_directory(directory_path))

    def get_path(self, emoji_name):
        return self.emoji_dict.get(emoji_name)

    def get_image(self, image_path):
        """ assumes the image_path was had from self.get_path, which does the join via _get_emoji_from_directory """
        return image_client.get_from_directory(image_path)


def _emoji_from_directory(directory_path='./source-emoji-data'):
    """ e.g. { 'fishthonk': './source-directory/fishthonk.png' } """
    return {
        splitext(filename)[0]: join(directory_path, filename)
        for filename in listdir(directory_path)
        if isfile(join(directory_path, filename))
    }
