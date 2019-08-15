SOURCE_AUTHORIZATION_HEADER = 'X-Authorization-Source'
SOURCE_ENV_VARIABLE = 'SOURCE_SLACK_API_TOKEN'
DESTINATION_AUTHORIZATION_HEADER = 'X-Authorization-Destination'
DESTINATION_ENV_VARIABLE = 'DESTINATION_SLACK_API_TOKEN'

def token_from_header_or_env(token):
    if token is None:
        return None
    elif token.startswith('Token '):
        return token.replace('Token ', '')
    else:
        return token
