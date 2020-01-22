"""
    Set Flask configuration vars from .env and .flaskenv files
"""
import os
import redis
from dotenv import load_dotenv


load_dotenv()

class Config(object):
    """Base config vars."""
    SESSION_COOKIE_NAME = os.getenv('SESSION_COOKIE_NAME') or 'cookie'
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SEND_FILE_MAX_AGE_DEFAULT = 0
    CACHE_BUSTER = {
        'extensions':['.js', '.css', '.csv'],
        'hash_size':5
        }
    CORS_HEADERS = 'Content-Type'

    # Flask-Session
    SESSION_TYPE = os.getenv('SESSION_TYPE')
    SESSION_REDIS = redis.from_url(os.getenv('REDIS_LABS'))
    # SESSION_REDIS = redis.from_url(os.getenv('REDIS_LOCAL'))


class DevConfig(Config):
    """ Flask development config """
    DEBUG = True
    FLASK_APP = os.getenv('FLASK_APP')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI') or None
    print('development config set...')


class ProdConfig(Config):
    """ Flask propuction config """
    DEBUG = False
    DATABASE_URI = os.getenv('PROD_DATABASE_URI') or "sqlite:///:memory:"
