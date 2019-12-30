"""Flask config class."""
import os
import redis


class Config(object):
    """Base config vars."""
    SESSION_COOKIE_NAME = os.getenv('SESSION_COOKIE_NAME') or 'cookie'
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SEND_FILE_MAX_AGE_DEFAULT = 0
    CACHE_BUSTER={
        'extensions':['.js', '.css', '.csv'],
        'hash_size':5
        }

    # Flask-Session
    SESSION_TYPE = os.getenv('SESSION_TYPE')
    SESSION_REDIS =os.getenv('SESSION_REDIS')


class DevConfig(Config):
    DEBUG = True
    FLASK_APP = os.getenv('FLASK_APP')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI') or None
    print('development config set...')


class ProdConfig(Config):
    DEBUG = False
    DATABASE_URI = os.getenv('PROD_DATABASE_URI') or "sqlite:///:memory:"
