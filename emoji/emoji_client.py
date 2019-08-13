import os
import sys
import slack


class EmojiClient:
    def __init__(self):
        self.source_client = slack.WebClient(token=os.environ["SOURCE_SLACK_API_TOKEN"])
        self.destination_client = slack.WebClient(token=os.environ["DESTINATION_SLACK_API_TOKEN"])

    def add_emoji(self, filepath, name):
        return self.destination_client.api_call(
            "emoji.add",
            files={"image": filepath},
            data={"name": name, "mode": "data"}
        )

    def add_alias(self, name, alias_for):
        formatted_alias_for = ":{}:".format(alias_for)
        return self.destination_client.api_call(
            "emoji.add",
            data={"name": name, "mode": "alias", "alias_for": formatted_alias_for}
        )

    def remove_emoji(self, name):
        return self.destination_client.api_call("emoji.remove", data={"name": name, "mode": "data"})

    def emoji_dict(self):
        return self.source_client.emoji_list().data['emoji']
