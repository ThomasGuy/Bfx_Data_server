import os
import logging
import asyncio
from bfxapi import Client

API_KEY = os.getenv('BFX_KEY')
API_SECRET = os.getenv('BFX_SECRET')
log = logging.getLogger(__name__)

bfx = Client()

class AuthError(Exception):
    """
    Thrown whenever there is a problem with the authentication packet
    """
    pass


def main_async():
    try:
        loop = asyncio.events.get_event_loop()
        tasks = [
            asyncio.ensure_future(bfx.ws.get_task_executable()),
        ]
        loop.run_until_complete(asyncio.wait(tasks))

    except Exception:
        log.error('Exception ', exc_info=True)
    else:
        log.info('Bitfinex user is logging in...')
