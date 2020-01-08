"""
    If necessary initialize a new database. Create session_factory decoupleing
    the dbSession from flask app.
"""
import logging
import os

# Third party imports
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

from .models import Base, User, Favourite


log = logging.getLogger(__name__)
dbPath = "sqlite:////c/data/sqlite/db/bfx_testDB.db"
# dbPath = os.getenv('DATABASE_URI')

engine = create_engine(dbPath)
if not database_exists(engine.url):
    log.info('Data Base Created')
    create_database(engine.url)
Base.metadata.create_all(engine)

session_factory = sessionmaker(bind=engine)
