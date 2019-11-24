from flask import Flask
from flask_cachebuster import CacheBuster
from flask_sqlalchemy import SQLAlchemy
# from flask_socketio import SocketIO


cb_Config = {'extensions': ['.js', '.css', '.csv'], 'hash_size': 5}

# Globally accessible libraries
db = SQLAlchemy()
# socketio = SocketIO()
cache_buster = CacheBuster(config=cb_Config)


def create_app(config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app
    """
    app = Flask(__name__,
                instance_relative_config=True,
                static_folder='public')
    app.config.from_object(config)
    app.config.from_pyfile('settings', silent=True)

    # Initialize Plugins
    db.init_app(app)
    # socketio.init_app(app)
    cache_buster.init_app(app)

    with app.app_context():
        from bfx_server.blueprints import home, errors, data
        app.register_blueprint(home.bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.bp)

        return app
