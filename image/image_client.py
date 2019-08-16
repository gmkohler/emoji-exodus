import hashlib
import requests
from io import BytesIO

def get(url):
    response = requests.get(url)
    return BytesIO(response.content)

def hexdigest(image = None, url = None):
    if not bool(image) ^ bool(url):
        raise('must include precisely one of `image` or `url`')

    if image is None:
        image = get(url)

    """ accepts a BytesIO representation of an image (e.g., from `image_client.get()`) """
    return hashlib.md5(image.getvalue()).hexdigest()
