import os
import sys
import slack
from image import image_client


class SlackEmojiClient:
    def __init__(self, token):
        self.client = slack.WebClient(token=token)
        self._emoji_dict = None
        self._hashes_for_emoji_images = None

    def add_emoji(self, image_file, name):
        """ `image_file` can be a local path to a file or a sublcass of `IOBase`. """
        return self.client.api_call(
            "emoji.add",
            files={"image": image_file},
            data={"name": name, "mode": "data"}
        )

    def add_alias(self, name, alias_for):
        formatted_alias_for = ":{}:".format(alias_for)
        return self.client.api_call(
            "emoji.add",
            data={"name": name, "mode": "alias", "alias_for": formatted_alias_for}
        )

    def remove_emoji(self, name):
        return self.client.api_call("emoji.remove", data={"name": name, "mode": "data"})

    def emoji_dict(self):
        if self._emoji_dict is None:
            self._emoji_dict = self.client.emoji_list().data['emoji']

        return self._emoji_dict

    def hashes_for_emoji_images(self):
        if self._hashes_for_emoji_images is None:
            self._hashes_for_emoji_images = {}
            destination_emoji_with_urls = { name: val for name, val in self.emoji_dict().items() if not val.startswith("alias:") }

            for name, url in destination_emoji_with_urls.items():
                image = image_client.get(url)
                digest = image_client.hexdigest(image)

                if not self._hashes_for_emoji_images.get(digest):
                    self._hashes_for_emoji_images[digest] = name

        return self._hashes_for_emoji_images
