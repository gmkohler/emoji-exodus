import os
import sys
import slack


class SlackEmojiClient:
    def __init__(self, token):
        self.client = slack.WebClient(token=token)

    def add_emoji(self, filepath, name):
        return self.client.api_call(
            "emoji.add",
            files={"image": filepath},
            data={"name": name, "mode": "data"}
        )

    def add_alias(self, name, alias_for):
        formatted_alias_for = ":{}:".format(alias_for)
        return self.client.api_call(
            "emoji.add",
            data={"name": name, "mode": "alias", "alias_for": formatted_alias_for}
        )

    def remove_emoji(self, name):
        return self.client.api_call("emoji.remove", data={"name": name, "mode": "data"})

    def emoji_dict(self):
        return self.client.emoji_list().data['emoji']
