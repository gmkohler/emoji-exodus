import requests
from io import BytesIO

def get(url):
    response = requests.get(url)
    return BytesIO(response.content)
