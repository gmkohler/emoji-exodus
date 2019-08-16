from image import image_client

class ImageHashDict:
    def __init__(self, emoji_dict):
        self.image_hashes = {}

        destination_emoji_with_urls = { name: val for name, val in emoji_dict.items() if not val.startswith("alias:") }

        for name, url in destination_emoji_with_urls.items():
            self.update(name, url)

    def update(self, emoji_name, image_url = None, image_file = None):
        digest = image_client.hexdigest(image = image_file, url = image_url)

        if not self.image_hashes.get(digest):
            self.image_hashes[digest] = emoji_name

    def get_for_image(self, image):
        digest = image_client.hexdigest(image = image)
        return self.get(digest)

    def get(self, key, default = None):
        return self.image_hashes.get(key, default)
