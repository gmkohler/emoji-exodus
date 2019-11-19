import os
import time
from emoji import emoji_transfer_service, emoji_service, find_all_emoji_by_name
from util.tokens import SOURCE_ENV_VARIABLE
from image import image_client

emoji_dict = emoji_service(os.environ.get(SOURCE_ENV_VARIABLE)).emoji_dict.emoji_dict
# emoji_dict = {
#     'burning-money': 'https://emoji.slack-edge.com/TMG9ZP0FN/burning-money/89a8f4991169040a.gif',
#     'sjsquirrel': 'https://emoji.slack-edge.com/TMG9ZP0FN/sjsquirrel/0cdecd8af2ee3834.jpg',
#     'no-longer-at-here': 'https://emoji.slack-edge.com/TMG9ZP0FN/no-longer-at-here/cb87d455603fb7fd.png'
# }

for emoji_name, url_or_alias in emoji_dict.items():
    url = emoji_transfer_service.url_even_if_alias(emoji_dict, emoji_name)
    if not url:
        print('Unable to find :{}: - probably an alias of a standard emoji'.format(emoji_name))
        continue

    file_extension = url.split('.')[-1]
    file_name = './emoji-data/{}.{}'.format(emoji_name, file_extension)
    image_data = image_client.get(url)

    with open(file_name, 'wb') as out:
        print('writing :{}: to {}'.format(emoji_name, file_name))
        out.write(image_data.read())

    time.sleep(1)
