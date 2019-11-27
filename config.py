"""Flask config class."""
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """Base config vars."""
    SECRET_KEY = os.getenv('SECRET_KEY') or 'secret'
    SESSION_COOKIE_NAME = os.getenv('SESSION_COOKIE_NAME') or 'cookie'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    HOST_NAME = 'localhost:5000'
    PORT = 5000


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:////c/data/sqlite/db/bfx_serverDB.db" or None
    print('development config set...')


class ProdConfig(Config):
    DEBUG = False
    DATABASE_URI = os.getenv('PROD_DATABASE_URI') or "sqlite:///:memory:"
