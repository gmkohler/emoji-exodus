from emoji import image_client

def collision_free_name(destination_dict, emoji_name, prefix="cav"):
    existing_name = destination_dict.get(emoji_name)

    if existing_name is not None:
        return "{}-{}".format(prefix, emoji_name)

    return emoji_name

def transfer(source_client, destination_client, source_emoji_name):
    source_dict = source_client.emoji_dict()
    destination_dict = destination_client.emoji_dict()

    emoji_path = source_dict.get(source_emoji_name)
    # deciding what call to make
    if emoji_path.startswith("alias:"):
        """If it's an alias, we want to get the url for the file"""
        aliased_from = emoji_path.replace("alias:", "")
        emoji_path = source_dict.get(aliased_from)

    if emoji_path is None:
        """Making an alias for a standard emoji"""
        return destination_client.add_alias(source_emoji_name, aliased_from)
    else:
        destination_emoji_name = collision_free_name(destination_dict, source_emoji_name)
        print("adding {}".format(destination_emoji_name))
        image_file = image_client.get(emoji_path)

        return destination_client.add_emoji(image_file, destination_emoji_name)

