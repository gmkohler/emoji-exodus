# import json
import os
import sys
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE

from emoji import emoji_transfer_service, emoji_service

source_service = emoji_service(os.environ[SOURCE_ENV_VARIABLE])
destination_service = emoji_service(os.environ[DESTINATION_ENV_VARIABLE])

emoji_transfer_service.transfer(source_service.emoji_dict.emoji_dict, destination_service, sys.argv[1])
