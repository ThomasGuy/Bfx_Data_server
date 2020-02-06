"""
    Flask route; api
"""
import logging

# 3rd party imports
from flask import Blueprint, jsonify, request, session
from flask_login import login_required
import requests

# package imports
from .bfx import tickerDict
from ...utils.tickerHolder import Ticker


log = logging.getLogger(__name__)
api_v1 = Blueprint('API_v1', __name__)
url = 'https://api-pub.bitfinex.com/v2/candles/trade:1h:tBTCUSD/hist?limit=50'


@api_v1.route('/api/v1/favCoins', methods=['GET', 'POST'])
@login_required
def userData():
    '''
        load/save users favourtie coins
    '''
    if request.method == 'GET':
        return jsonify(session['favCoins'])

    if request.method == 'POST':
        log.info(f'response type - {type(request.get_json())}')
        session['favCoins'] = request.get_json()
        log.info(session['favCoins'])
        return ''


@api_v1.route('/api/v1/candles', methods=['GET', 'POST'])
@login_required
def userCandles():
    '''
        seed candle data
    '''
    data = requests.get(url).json()
    output = []
    for item in data:
        el = {}
        el['time'] = item[0]
        el['open'] = item[1]
        el['high'] = item[3]
        el['low'] = item[4]
        el['close'] = item[2]
        output.append(el)
    return jsonify(output)


@api_v1.route('/api/v1/tickers', methods=['GET', 'POST'])
@login_required
def intialTickers():
    response = tickerDict.values()
    # pylint: disable=no-member
    return Ticker.schema().dumps(response, many=True)
