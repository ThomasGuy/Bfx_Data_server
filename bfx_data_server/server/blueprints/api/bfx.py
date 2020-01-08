'''
    initialize and open Bitfinex websocket
'''
import logging
import os

from bfxapi import Client
from ..myEvents.events import sockio


log = logging.getLogger(__name__)
API_KEY = os.getenv('BFX_KEY')
API_SECRET = os.getenv('BFX_SECRET')

symbols = ['tBTCUSD', 'tBSVUSD', 'tETHUSD', 'tXRPUSD', 'tLTCUSD', 'tNEOUSD', 'tEOSUSD']

bfx = Client(
    API_KEY=API_KEY,
    API_SECRET=API_SECRET,
    logLevel='INFO',
    dead_man_switch=True,
    # channel_filter=['ticker', 'candles', 'book']
    )

@bfx.ws.on('error')
def log_error(msg):
    log.error(msg)


@bfx.ws.on('wallet_snapshot')
def log_snapshot(wallets):
    for wallet in wallets:
        print(wallet)
        log.info(wallet)


@bfx.ws.on('authenticated')
async def log_output(output):
    log.info("WS authenticated: {}".format(output))


@bfx.ws.on('subscribed')
def log_subscription(sub):
    log.info("New subscription: {} {} id:{}".format(
        sub.channel_name, sub.symbol, sub.chan_id))


# @bfx.ws.on('all')
# def bfxws_data_handler(data):
#     # if type(data) is list:
#     if type(data) is list:
#         dataEvent = data[1]
#         chan_id = data[0]

#         if type(dataEvent) is not str and bfx.ws.subscriptionManager.is_subscribed(chan_id):
#             subscription = bfx.ws.subscriptionManager.get(chan_id)
#             if subscription.channel_name == 'ticker':
#                 sockio.emit('event', {'symbol': subscription.symbol, 'data': dataEvent})
#                 log.debug(f'ticker: {subscription.symbol}')
#     else:
#         log.info(f'Bitfinex: {data}')


async def start():
    for sym in symbols:
        await bfx.ws.subscribe('ticker', sym)

bfx.ws.on('connected', start)
