import os
import sys
import click
import csv
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE
from emoji import emoji_transfer_service, emoji_service

@click.command()
@click.option('--source', default=None, help='A csv filename from which to import emoji')
@click.argument('emoji_names', nargs=-1)
def import_emoji(emoji_names, source):
    if not bool(source) ^ bool(emoji_names):
        raise("You must either provide a list emoji_names or provide a CSV file via the --csv option")
    source_dict = emoji_service(os.environ[SOURCE_ENV_VARIABLE]).emoji_dict.emoji_dict
    destination_service = emoji_service(os.environ[DESTINATION_ENV_VARIABLE])

    if bool(source):
        emoji_names = _emoji_from_csv(source)

    emoji_names_to_be_transferred = set()
    wildcard_names = set()

    for name in emoji_names:
        if name.endswith('*'):
            wildcard_names.add(name)
        else:
            emoji_names_to_be_transferred.add(name)

    for wildcard_name in wildcard_names:
        startswith = wildcard_name[:-1]
        matches = _wildcard_matches(startswith, source_dict.keys())
        emoji_names_to_be_transferred.update(matches)

    for emoji_name in emoji_names_to_be_transferred:
        emoji_transfer_service.transfer(
            source_dict,
            destination_service,
            emoji_name
        )

def _wildcard_matches(startswith, emoji_dict):
    return {name for name in emoji_dict if name.startswith(startswith)}

def _emoji_from_csv(source):
    emoji_names = set()
    with open(source, mode='r') as infile:
        reader = csv.DictReader(infile)
        next(reader) # remove header
        for row in reader:
            emoji_names.add(row['emoji name'])

    return emoji_names

if __name__ == '__main__':
    import_emoji()
