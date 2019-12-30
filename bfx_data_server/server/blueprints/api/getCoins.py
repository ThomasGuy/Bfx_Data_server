import logging
import requests
from flask import jsonify


url = 'https://api-pub.bitfinex.com/v2/tickers?'\
    'symbols=tBTCUSD,tLTCUSD,tETHUSD,tXRPUSD,'\
    'tNEOUSD,tEOSUSD,tBSVUSD,tIOTUSD'

log = logging.getLogger(__name__)


def getCoins():
    data = {}
    response = requests.get(url)
    for ticker in response.json():
        data[ticker[0][1:4]] = ticker[1]
    log.info(data)
    return data
