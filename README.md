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

- run `python3 application.py [message]` to send a message to the sandbox.


## Testing in a python console
#### Slack Emoji Client
```python
from emoji import emoji_service
service = emoji_service(<api_token>)
```

#### Emoji Transfer Service (for transferring emoji)
```python
from emoji import emoji_transfer_service, emoji_service

source_dict = emoji_service(<source_api_token>).emoji_dict.emoji_dict # don't ask.
destination_service = emoji_service(<destination_api_token>)
emoji_name = "my-emoji"

emoji_transfer_service.transfer(source_dict, destination_service, emoji_name)
```
