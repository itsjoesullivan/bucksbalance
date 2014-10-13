import json
import os
import re

import requests

BALANCE_URL = "https://www.starbucks.com/card/guestbalance"
HEADERS = {
    "Pragma": "no-cache",
    "Origin": "https://www.starbucks.com",
    "Accept-Encoding": "gzip,deflate",
    "Accept-Language": "en-US,en;q=0.8,fr;q=0.6,es;q=0.4",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "text/html, */*; q=0.01",
    "Cache-Control": "no-cache",
    "X-Requested-With": "XMLHttpRequest",
    "Connection": "keep-alive",
    "Referer": "https://www.starbucks.com/card/guestbalance",
    "DNT": "1",
}
BALANCE_RE = re.compile(r'(?:fetch_balance_value">\$)([0-9\.]+)')

def get_balance(card):
    """
    Retrieve the balance, as a float, for the card provided or None

    """
    data = {
        "Card.Number": card[0],
        "Card.Pin": card[1],
    }

    response = requests.post(BALANCE_URL, data=data, headers=HEADERS)
    if response.status_code == 200:
        match = BALANCE_RE.search(response.text)
        if match:
            return float(match.group(1))


def load_config():
    with open(os.path.expanduser('~/.bucksbalance'), 'r') as bucksfile:
        return json.loads(bucksfile.read())


def main():
    config = load_config()
    for cardname, card in config['cards'].items():
        print("{} balance: ${}".format(cardname, get_balance(card)))


if __name__ == '__main__':
    main()
