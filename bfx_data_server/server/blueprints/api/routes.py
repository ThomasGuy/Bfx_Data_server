"""
    Flask route; api
"""
from flask import Blueprint, jsonify, request, session
from flask_login import login_required
import requests


api_v1 = Blueprint('API_v1', __name__, template_folder='templates')
url = 'https://api-pub.bitfinex.com/v2/candles/trade:1h:tBTCUSD/hist?limit=50'


@api_v1.route('/api/v1/favCoins', methods=['GET', 'POST'])
@login_required
def userData():
    '''
        load/save users favourtie coins
    '''
    if request.method == 'GET':
        return jsonify(session['favCoins'])
    elif request.method == 'POST':
        pass


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
