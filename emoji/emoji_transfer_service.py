from image.image_client import get as get_image


class EmojiNotFoundError(Exception):
    pass


def url_even_if_alias(emoji_dict, emoji_name):
    """If it's an alias, we want to get the url for the file.  Will return None if aliasing a standard emoji"""
    emoji_path = emoji_dict.get(emoji_name)

    if emoji_path is None:
        raise EmojiNotFoundError("'{}' is not the name of an emoji in the source.".format(emoji_name))
    if emoji_path.startswith("alias:"):
        aliased_from = emoji_path.replace("alias:", "")
        emoji_path = emoji_dict.get(aliased_from)

    return emoji_path

def collision_free_name(destination_dict, source_emoji_name, prefix="cav"):
    destination_name = source_emoji_name
    destination_name_exists = destination_dict.get(destination_name)

    while destination_name_exists is not None:
        taken_name = destination_name
        destination_name = "{}-{}".format(prefix, destination_name)
        destination_name_exists = destination_dict.get(destination_name)

        print("'{taken_name}' exists as a name in the destination.  This emoji will be named '{destination_name}' instead.".format(
            taken_name=taken_name,
            destination_name=destination_name
        ))

    return destination_name

def transfer(source_dict, destination_service, source_emoji_name):
    print("Transferring '{}'".format(source_emoji_name))

    try:
        emoji_image_url = url_even_if_alias(source_dict, source_emoji_name)
    except EmojiNotFoundError:
        print("Image file not found for emoji '{}'".format(source_emoji_name))
        return

    if emoji_image_url is None:
        # Making an alias for a standard emoji
        standard_emoji_name = source_dict.get(source_emoji_name).replace("alias:", "")
        print("'{}' aliases standard emoji '{}' detected.  Creating alias.".format(source_emoji_name, standard_emoji_name))
        return destination_service.add_alias(source_emoji_name, standard_emoji_name)

    # Creating a new emoji
    source_emoji_image = get_image(emoji_image_url)
    destination_dict = destination_service.emoji_dict

    # Check destination emoji for the exact same image as the source emoji
    destination_emoji_name_having_identical_image = destination_dict.get_emoji_name_for_image(source_emoji_image)

    if destination_emoji_name_having_identical_image is None:
        name_of_source_emoji_in_destination = collision_free_name(destination_dict, source_emoji_name)
        print("No existing image detected.  Adding new emoji '{}'.".format(name_of_source_emoji_in_destination))
        return destination_service.add_emoji(
            name_of_source_emoji_in_destination,
            source_emoji_image,
            emoji_image_url)
    else:
        names_for_identical_image = destination_service.emoji_dict.get_aliases(destination_emoji_name_having_identical_image)

        if source_emoji_name in names_for_identical_image:
            print("source emoji '{}' already exists in the destination with this image and name.  Taking no action.".format(source_emoji_name))
            return None
        else:
            name_of_source_emoji_in_destination = collision_free_name(destination_dict, source_emoji_name)
            print("source emoji '{source_emoji_name}' exists as destination emoji '{identical_destination_emoji_name}' with the same image.  Creating alias '{aliased_name}'.".format(
                source_emoji_name=source_emoji_name,
                identical_destination_emoji_name=destination_emoji_name_having_identical_image,
                aliased_name=name_of_source_emoji_in_destination
            ))

            return destination_service.add_alias(name_of_source_emoji_in_destination, destination_emoji_name_having_identical_image)


