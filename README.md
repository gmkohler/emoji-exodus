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

- Add appropriate environment variables.  You're going to want `SLACK_API_TOKEN` and `SLACK_SANDBOX_CHANNEL_ID` set.


- Install the packages via `pip3`:

  ```sh
  (env) $ pip3 install -r requirements.txt
  ```

- run `python3 application.py [message]` to send a message to the sandbox.


## Testing in a python console
#### Slack Emoji Client
```python
from emoji import emoji_client
client = emoji_client(<api_token>)
```

#### Emoji Transfer Service (for transferring emoji)
```python
from emoji import emoji_transfer_service, emoji_client

source_client = emoji_client(<source_api_token>)
destination_client = emoji_client(<destination_api_token>)
emoji_name = "my-emoji"

emoji_transfer_service.transfer(source_client, destination_client, emoji_name)
```
