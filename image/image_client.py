import hashlib
import requests
from io import BytesIO

def get_from_url(url):
    response = requests.get(url)
    return BytesIO(response.content)

def get_from_directory(filepath):
    image = None
    with open(filepath, 'rb') as file:
        image = BytesIO(file.read())
    return image

def hexdigest(image = None, url = None, filepath = None):
    if not bool(image) ^ bool(url) ^ bool(filepath):
        raise('must include precisely one of `image`, `url`, or `filepath`')

    if image is None and bool(url):
        image = get_from_url(url)
    elif image is None and bool(filepath):
        image = get_from_directory(filepath)

    """ accepts a BytesIO representation of an image (e.g., from `image_client.get()`) """
    return hashlib.md5(image.getvalue()).hexdigest()
