from flask import Flask, jsonify
from flask_cors import CORS
import json
import pdb

# instantiate the app
app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)

@app.route('/emoji', methods=['GET'])
def get_emoji_list():
    try:
        with open('results.json') as json_file:
            data = json.load(json_file)
            return jsonify(data)
    except:
        return jsonify('error: could not fetch emoji :(')

if __name__ == '__main__':
    app.run()
