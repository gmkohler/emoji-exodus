from setuptools import setup, find_packages


setup(
    name='transfer',
    version='0.1',
    py_modules=['transfer_cli'],
    install_requires=[
        'Click',
    ],
    entry_points='''
        [console_scripts]
        transfer=scripts.transfer_cli:import_emoji
    ''',
)
