'''
    initialize and open Bitfinex websocket
'''

import logging
import os

from bfxapi import Client


log = logging.getLogger(__name__)
API_KEY = os.getenv('BFX_KEY')
API_SECRET = os.getenv('BFX_SECRET')

symbols = ['tBTCUSD', 'tBSVUSD', 'tETHUSD', 'tXRPUSD', 'tLTCUSD', 'tNEOUSD', 'tEOSUSD']

bfx = Client(
    API_KEY=API_KEY,
    API_SECRET=API_SECRET,
    logLevel='INFO',
    dead_man_switch=True,
    channel_filter=['ticker']
    )

@bfx.ws.on('error')
def log_error(msg):
    log.error(msg)


@bfx.ws.on('authenticated')
async def log_output(output):
    log.info("WS authenticated: {}".format(output))


@bfx.ws.on('subscribed')
def log_subscribed(msg):
    log.info(f'Subscribed: {msg}')


async def start():
    for sym in symbols:
        await bfx.ws.subscribe('ticker', sym)


bfx.ws.on('connected', start)
