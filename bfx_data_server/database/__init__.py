import logging

# Third party imports
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

from .models import Base, User, Post


log = logging.getLogger(__name__)
dbPath = "sqlite:////c/data/sqlite/db/bfx_testDB.db"

engine = create_engine(dbPath)
if not database_exists(engine.url):
    log.info('Data Base Created')
    create_database(engine.url)
Base.metadata.create_all(engine)

session_factory = sessionmaker(bind=engine)
