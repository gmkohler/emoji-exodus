# emoji-exodus

A way to move emoji from one Slack instance to another

## Setup

- Clone this repo

- From within the cloned directory, create and activate a virtual environment via `venv` ([instructions](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/))

  ```sh
    $ python3 -m venv env
    $ source env/bin/activate
  ```
  You will know if this worked if you see a `(env)` at the beginning of your CLI prompt.

- Install the packages via `pip3`:

  ```sh
  (env) $ pip3 install -r requirements.txt
  ```

## CLI interface

### Setup

You're going to want the following environment variables set in your virtual environment:

  | Key  | Description |
  | ------------- | ------------- |
  | SOURCE_SLACK_API_KEY  | A personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the source slack instance.  It should start with `xoxs-*`. |
  | DESTINATION_SLACK_API_KEY  | A personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the destination slack instance.  It should start with `xoxs-*`. |

### List of names
You can transfer a list of emoji names, e.g. `transfer emoji_1 emoji_2 emoji_3`

### CSV file
You can transfer emoji whose names are in a csv, e.g. `transfer --source='path/to/file.csv'`
The CSV should have a column header called `emoji name`

### Wildcards
Both CLI interfaces support the use of `*` as a wildcard character. For example,
passing `llama*` would transfer all emoji whose names start with `llama`, while `*llama*` would
transfer all emoji with the word `llama` somewhere in the name.



### Testing in a python console

#### Emoji Transfer Service (for transferring emoji)

```python
from emoji import emoji_transfer_service, emoji_service

source_dict = emoji_service(<source_api_token>).emoji_dict.emoji_dict # don't ask.
destination_service = emoji_service(<destination_api_token>)
emoji_name = "my-emoji"

emoji_transfer_service.transfer(source_dict, destination_service, emoji_name)
```

## JSON API interface

Your requests should include the following headers:

  | Key  | Value | Description |
  | ------------- | ------------- | -------------- |
  | Content-Type | `'application/json'` | We use JSON here.  Flask needs this to know how to parse the request bodies. |
  | X-Authorization-Source | `'Bearer ${token}'` | `token` refers to a personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the source slack instance.  It should start with `xoxs-*`. |
  | X-Authorization-Destination  | `'Bearer ${token}'` | `token` refers to a personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the destination slack instance.  It should start with `xoxs-*`. |
