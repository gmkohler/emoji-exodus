from flask import Flask, jsonify
from emoji import emoji_client
from emoji.emoji_transfer_service import url_even_if_alias
import os
import sys
from flask_cors import CORS
import json

# instantiate the app
app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)

@app.route('/emoji', methods=['GET'])
def get_emoji_list():

    try:

        source_client = emoji_client(os.environ["SOURCE_SLACK_API_TOKEN"])
        source_dict = source_client.emoji_dict()

        # map alias values to URL values or None
        names_and_urls = {}
        for k, v in source_dict.items():
            names_and_urls[k] = url_even_if_alias(source_dict, k)

        # filter out None values (aliases of standard emoji).
        names_and_urls = { k: v for k, v in names_and_urls.items() if v is not None and not v.startswith("alias:") }

        return jsonify(names_and_urls)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        return jsonify('error: could not fetch emoji :(')

if __name__ == '__main__':
    app.run()
