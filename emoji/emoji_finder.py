import re

class EmojiFinder:
    def __init__(self, emoji_names, emoji_dict):
        self.emoji_names = emoji_names
        self.emoji_dict = emoji_dict
        self.emoji_names_to_be_transferred = set()
        self.wildcard_names = set()

    def find_all(self):
        for name in self.emoji_names:
            if re.match(r"^.*\*.*$", name):
                self.wildcard_names.add(name)
            else:
                self.emoji_names_to_be_transferred.add(name)

        for wildcard_name in self.wildcard_names:
            matches = self._wildcard_matches(wildcard_name)
            self.emoji_names_to_be_transferred.update(matches)

        return self.emoji_names_to_be_transferred

    def _wildcard_matches(self, wildcard_name):
        name = wildcard_name.replace("*", ".*")
        regexp = r"^{}$".format(name)
        return {name for name in self.emoji_dict if re.match(regexp, name)}
