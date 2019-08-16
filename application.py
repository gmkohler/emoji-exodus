import os
import sys
import click
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE
from emoji import emoji_transfer_service, emoji_service

@click.command()
@click.option('--csv', default=None, help='A filename from which to import emoji')
@click.argument('emoji_names', nargs=-1)
def import_emoji(emoji_names, csv):
    if not bool(csv) ^ bool(emoji_names):
        raise("You must either provide a list emoji_names or provide a CSV file via the --csv option")
    source_dict = emoji_service(os.environ[SOURCE_ENV_VARIABLE]).emoji_dict.emoji_dict
    destination_service = emoji_service(os.environ[DESTINATION_ENV_VARIABLE])
    emoji_names_to_be_transferred = set()
    wildcard_names = set()

    for name in emoji_names:
        if name.endswith('*'):
            wildcard_names.add(name)
        else:
            emoji_names_to_be_transferred.add(name)

    for wildcard_name in wildcard_names:
        matches = set()
        startswith = wildcard_name[:-1]

        for name in source_dict.keys():
            if name.startswith(startswith):
                matches.add(name)

        for name in matches:
            emoji_names_to_be_transferred.add(name)

    for emoji_name in emoji_names_to_be_transferred:
        emoji_transfer_service.transfer(
            source_dict,
            destination_service,
            emoji_name
        )

if __name__ == '__main__':
    import_emoji()
