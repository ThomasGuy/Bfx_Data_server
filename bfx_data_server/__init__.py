import logging
from pathlib import Path

# Third party imports
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# package imports
from bfx_data_server.database.models import Base
# from config import DevConfig


path = Path('.').parent / 'logs'

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                    datefmt='%m-%d %H:%M',
                    filename=path / 'bfx_ds.log',
                    filemode='w')

dbPath = "sqlite:////c/data/sqlite/db/bfx_serverDB.db"

engine = create_engine(dbPath)
Base.metadata.create_all(engine)

session_factory = sessionmaker(bind=engine)
