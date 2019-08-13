from emoji import image_client

def transfer(source_client, destination_client, emoji_name):
    source_dict = source_client.emoji_dict()
    destination_dict = destination_client.emoji_dict()

    emoji_path = source_dict.get(emoji_name)

    if emoji_path.startswith("alias:"):
        """If it's an alias, we want to get the url for the file"""
        aliased_from = emoji_path.replace("alias:", "")
        emoji_path = source_dict.get(aliased_from)

    if emoji_path is None:
        """Making an alias for a standard emoji"""
        return destination_client.add_alias(emoji_name, aliased_from)

    """Creating a new emoji"""
    image_file = image_client.get(emoji_path)
    return destination_client.add_emoji(image_file, emoji_name)
