from flask import Flask
from flask_cachebuster import CacheBuster

cb_Config = {'extensions': ['.js', '.css', '.csv'], 'hash_size': 5}
cache_buster = CacheBuster(config=cb_Config)


def create_app():
    """
    Create Flask application using app factory pattern.

    :return: Flask app
    """
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config.settings')
    app.config.from_pyfile('settings', silent=True)
    cache_buster.init_app(app)

    return app
