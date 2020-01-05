'''
    bfx_data_server - connect to bitfinex-api-py through websocket and server
    client from flask api
'''
import logging
from pathlib import Path


path = Path('.').parent / 'log'

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                    datefmt='%m-%d %H:%M',
                    filename=path / 'bfx_ds.log',
                    filemode='w')
