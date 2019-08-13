import cloudinary
from cloudinary import uploader
import os

cloudinary.config(
    cloud_name=os.environ['CLOUDINARY_CLOUD_NAME'],
    api_key=os.environ['CLOUDINARY_API_KEY'],
    api_secret=os.environ['CLOUDINARY_API_SECRET']
)

def upload_image_from_url(url, file_name):
    """Upload an image at a URL to a cloudinary instance at the specified file_name."""
    return uploader.upload(url, public_id=file_name)
