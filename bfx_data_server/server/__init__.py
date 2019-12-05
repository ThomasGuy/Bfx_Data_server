from flask import Flask
from flask_sqlalchemy_session import flask_scoped_session
# from flask_redis import FlaskRedis
from flask_login import LoginManager
# from flask_cachebuster import CacheBuster

# package imports
from bfx_data_server import session_factory
# CACHE_BUSTER={'extensions':['.js', '.css', '.csv'],'hash_size':5}
# cache_buster = CacheBuster(config=CACHE_BUSTER)

# initialize globals
# redis_store = FlaskRedis()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'

def create_app(Config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app, session
    """
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    with app.app_context():
        # Set global values
        # redis_store.endpoint = app.config['ENDPOINT']
        # redis_store.post_query = app.config['POST_QUERY']
        session = flask_scoped_session(session_factory, app)
        # Initialize Plugins
        login_manager.init_app(app)
        # cache_buster.init_app(app)

        from bfx_data_server.database.models import User, Post
        @login_manager.user_loader
        def load_user(id):
            return session.query(User).get(int(id))

        from bfx_data_server.server.blueprints.home import home_bp
        app.register_blueprint(home_bp)
        from bfx_data_server.server.blueprints.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/auth')
        from bfx_data_server.server.blueprints.main import main_bp
        app.register_blueprint(main_bp)
        from bfx_data_server.server.blueprints.errors import err
        app.register_blueprint(err, url_prefix='/error')
        from bfx_data_server.server.blueprints.data import data_bp
        app.register_blueprint(data_bp)


        @app.teardown_request
        def shutdown_session(exception=None):
            session.remove()

        @app.shell_context_processor
        def make_shell_context():
            return {'session': session, 'User': User, 'Post': Post}

    return app

from bfx_data_server.database import models
