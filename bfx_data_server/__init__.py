import logging
from pathlib import Path

# package imports
from bfx_data_server.database.models import Base


path = Path('.').parent / 'logs'

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                    datefmt='%m-%d %H:%M',
                    filename=path / 'bfx_ds.log',
                    filemode='w')
