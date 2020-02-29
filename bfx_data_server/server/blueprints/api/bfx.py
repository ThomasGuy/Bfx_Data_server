'''
    initialize and open Bitfinex websocket
'''
import logging
import os
import json

# 3rd party imports
from bfxapi import Client

# package imports
# from bfx_data_server.server.utils.tickerHolder import Ticker
from ..myEvents.events import sockio


log = logging.getLogger(__name__)
API_KEY = os.getenv('BFX_KEY')
API_SECRET = os.getenv('BFX_SECRET')
symbols = ['BTC', 'BCH', 'BSV', 'BTG', 'DSH', 'EOS', 'ETC', 'ETH', 'ETP', 'IOT',
           'LTC', 'NEO', 'OMG', 'SAN', 'TRX', 'XLM', 'XMR', 'XRP', 'XTZ', 'ZEC', 'ZRX']
sym2 = ['BTC', 'ETH', 'XRP', 'LTC', 'NEO', 'BSV', 'EOS', 'ETC', 'XMR', 'TRX', 'ZEC']
tickerDataFields = ['daily_change', 'daily_change_relative', 'last_price',
                    'volume', 'high', 'low']
# tickerDict = {}
tickerArrayDict = {}

bfx = Client(
    # API_KEY=API_KEY,
    # API_SECRET=API_SECRET,
    logLevel='INFO',
    dead_man_switch=True,
    channel_filter=['ticker', 'candle'],
    )

@bfx.ws.on('error')
def log_error(msg):
    log.error(msg)


@bfx.ws.on('subscribed')
def show_channel(sub):
    symbol = sub.symbol
    channel_name = sub.channel_name
    log.info(f"{symbol} subscribed - channel: {channel_name}")


@bfx.ws.on('all')
def bfxws_data_handler(data):
    if type(data) is list:
        dataEvent = data[1]
        chan_id = data[0]

        if type(dataEvent) is not str and bfx.ws.subscriptionManager.is_subscribed(chan_id):
            sub = bfx.ws.subscriptionManager.get(chan_id)
            if sub.channel_name == 'ticker':
                # updates = dict(zip(tickerDataFields, dataEvent[4:]))
                # tickerDict[sub.symbol].update(**updates)
                tickerArrayDict[sub.symbol[1:]] = dataEvent[4:]

                payload = {
                    'symbol': sub.symbol[1:],
                    'data': dataEvent[4:],
                    }
                sockio.emit('ticker event', json.dumps(payload), namespace='/main', broadcast=True)
                log.debug(f'{sub.symbol} - ticker event')
    else:
        log.info(f'bfx-info: {data}')

async def start():
    await bfx.ws.subscribe('ticker', 'tBTCUSD')
    for sym in symbols[1:]:
        # btc = f't{sym}BTC'
        usd = f't{sym}USD'
        await bfx.ws.subscribe('ticker', usd)
        # await bfx.ws.subscribe('ticker', btc)

bfx.ws.on('connected', start)
