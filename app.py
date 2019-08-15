from flask import Flask, jsonify, request
from emoji import emoji_client, emoji_transfer_service
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
            names_and_urls[k] = emoji_transfer_service.url_even_if_alias(source_dict, k)

        # filter out None values (aliases of standard emoji).
        names_and_urls = { k: v for k, v in names_and_urls.items() if v is not None and not v.startswith("alias:") }

        return jsonify(names_and_urls)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        return jsonify('error: could not fetch emoji :(')

@app.route('/transfer', methods=['POST'])
def transfer_emoji():
    emoji_name = request.json.get('emoji')[0]
    source_dict = emoji_client(os.environ["SOURCE_SLACK_API_TOKEN"]).emoji_dict()
    destination_client = emoji_client(os.environ["DESTINATION_SLACK_API_TOKEN"])

    emoji_transfer_service.transfer(source_dict, destination_client, emoji_name)

    return json.dumps({ 'success':True }), 200, { 'ContentType':'application/json' }

if __name__ == '__main__':
    app.run()
