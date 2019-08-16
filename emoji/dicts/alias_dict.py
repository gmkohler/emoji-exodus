class AliasDict():
    def __init__(self, emoji_dict):
        self.aliases = {}

        for name, value in emoji_dict.items():
            if value.startswith("alias:"):
                key = value.replace("alias:", "")
            else:
                key = name

            self.update(name, key)

    # TODO: make sure this is correct in the context of the transfer service.
    def update(self, emoji_name, aliased_from):
        if self.aliases.get(aliased_from) is None:
            self.aliases[aliased_from] = set({ emoji_name, aliased_from })
        else:
            self.aliases[aliased_from].add(emoji_name)

        return self.aliases

    def get(self, key, default = None):
        return self.aliases.get(key, default)
