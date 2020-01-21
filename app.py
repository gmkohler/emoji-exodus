from flask import Flask, jsonify, request
from emoji import slack_emoji_service, emoji_transfer_service
import util.tokens as tokens
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
        source_token = tokens.token_from_header_or_env(
            request.headers.get(tokens.SOURCE_AUTHORIZATION_HEADER, os.environ.get(tokens.SOURCE_ENV_VARIABLE))
        )
        source_service = slack_emoji_service(source_token)

        source_dict = source_service.emoji_dict.emoji_dict # don't ask.

        # map alias values to URL values or None
        names_and_urls = {}
        for k, v in source_dict.items():
            names_and_urls[k] = emoji_transfer_service.url_even_if_alias(source_dict, k)

        # filter out None values (aliases of standard emoji).
        names_and_urls = { k: v for k, v in names_and_urls.items() if v is not None and not v.startswith('alias:') }

        return jsonify(names_and_urls)
    except:
        print('Unexpected error:', sys.exc_info()[0])
        return jsonify('error: could not fetch emoji :(')

@app.route('/transfer', methods=['POST'])
def transfer_emoji():
    source_token = tokens.token_from_header_or_env(
        request.headers.get(tokens.SOURCE_AUTHORIZATION_HEADER, os.environ.get(tokens.SOURCE_ENV_VARIABLE))
    )
    destination_token = tokens.token_from_header_or_env(
        request.headers.get(tokens.DESTINATION_AUTHORIZATION_HEADER, os.environ.get(tokens.DESTINATION_ENV_VARIABLE))
    )

    emoji_names = request.json.get('emoji')
    source_dict = slack_emoji_service(source_token).emoji_dict
    destination_service = slack_emoji_service(destination_token)

    for emoji_name in emoji_names:
        emoji_transfer_service.transfer(source_dict, destination_service, emoji_name)

    return json.dumps({ 'success': True }), 200, { 'Content-Type': 'application/json' }

if __name__ == '__main__':
    app.run()
