from flask import Flask, jsonify
import json
import pdb

# instantiate the app
app = Flask(__name__)
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
