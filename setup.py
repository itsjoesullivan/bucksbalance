#!/usr/bin/env python

from distutils.core import setup

setup(
    name = 'bucksbalance',
    version = '0.0.1',
    description = 'Get your starbucks balance where it matters, in your terminal',
    author = 'Philip Forget',
    author_email = 'philipforget@gmail.com',
    url = 'https://github.com/philipforget/bucksbalance',
    packages = ['bucksbalance'],
    install_requires  =  ['requests'],
    entry_points = {
        'console_scripts': ['bucksbalance = bucksbalance:main']
    }
)
