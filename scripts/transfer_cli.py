import click
import csv
import os
import re

from emoji import emoji_transfer_service, emoji_service, find_all_emoji_by_name
from util.tokens import SOURCE_ENV_VARIABLE, DESTINATION_ENV_VARIABLE


class InputError(Exception):
    pass


@click.command()
@click.option('--source', default=None, help='A csv filename from which to import emoji')
@click.argument('emoji_names', nargs=-1)
def import_emoji(emoji_names, source):
    if not bool(source) ^ bool(emoji_names):
        raise InputError("You must either provide a list emoji_names or provide a CSV file via the --csv option")

    source_dict = emoji_service(os.environ[SOURCE_ENV_VARIABLE]).emoji_dict.emoji_dict
    destination_service = emoji_service(os.environ[DESTINATION_ENV_VARIABLE])
    if bool(source):
        emoji_names = _emoji_from_csv(source)

    emoji_names_to_be_transferred = find_all_emoji_by_name(emoji_names, source_dict)

    for emoji_name in emoji_names_to_be_transferred:
        emoji_transfer_service.transfer(
            source_dict,
            destination_service,
            emoji_name
        )


def _emoji_from_csv(source):
    emoji_names = set()
    with open(source, mode='r') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            emoji_names.add(row['emoji name'])

    return emoji_names
