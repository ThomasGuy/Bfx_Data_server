"""Flask config class."""
import os


class Config(object):
    """Base config vars."""
    SECRET_KEY = os.getenv('SECRET_KEY') or 'secret'
    SESSION_COOKIE_NAME = os.getenv('SESSION_COOKIE_NAME') or 'cookie'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    HOST_NAME = 'localhost:5003'
    PORT = 5003


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI') or "sqlite:///:memory:"
    print('development config set...')


class ProdConfig(Config):
    DEBUG = False
    DATABASE_URI = os.getenv('PROD_DATABASE_URI') or "sqlite:///:memory:"
