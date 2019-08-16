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

- Add appropriate environment variables.  You're going to want the following:

  | Key  | Description |
  | ------------- | ------------- |
  | SOURCE_SLACK_API_KEY  | A personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the source slack instance.  It should start with `xoxs-*`. |
  | DESTINATION_SLACK_API_KEY  | A personal API key that can be found under `window.TS.boot_data.api_token` while inspecting the "customize slack" webpage of the destination slack instance.  It should start with `xoxs-*`. |


- Install the packages via `pip3`:

  ```sh
  (env) $ pip3 install -r requirements.txt
  ```


## CLI interface
### List of names
Passing a list of names, e.g. `python application.py emoji_1 emoji_2 emoji_3`

### CSV file
Passing the filepath to a CSV file, e.g. `python application.py --source='path/to/file.csv'`
The CSV should have a column header called `emoji name`

### Wildcards
Both CLI interfaces support the use of wildcards at the end of the name. For example,
passing `llama*` would transfer all emoji whose names start with `llama`.


## Testing in a python console
#### Emoji Transfer Service (for transferring emoji)
```python
from emoji import emoji_transfer_service, emoji_service

source_dict = emoji_service(<source_api_token>).emoji_dict.emoji_dict # don't ask.
destination_service = emoji_service(<destination_api_token>)
emoji_name = "my-emoji"

emoji_transfer_service.transfer(source_dict, destination_service, emoji_name)
```
