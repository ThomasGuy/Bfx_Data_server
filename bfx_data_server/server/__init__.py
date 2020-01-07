'''
    initialize flask from here
'''
# pylint: skip-file
from flask import Flask
from flask_sqlalchemy_session import flask_scoped_session
from flask_login import LoginManager
from flask_cache_buster import CacheBuster
from flask_session import Session
# from flask_socketio import SocketIO

# cacheConfig = {
#      'extensions': ['.js', '.css', '.csv'],
#      'hash_size': 10
# }
# initialize globals
login_manager = LoginManager()
login_manager.login_view = 'author.login'  # name of blueprint.route
sesh = Session()
# buster = CacheBuster(config=cacheConfig)


def create_app(Config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app
    """
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    # initialize plugins
    from bfx_data_server.database import session_factory, User, Favourite
    Session = flask_scoped_session(session_factory, app)
    login_manager.init_app(app)
    sesh.init_app(app)
    # buster.register_cache_buster(app)

    with app.app_context():
        from bfx_data_server.server.blueprints import home, auth, main, errors, data, api
        app.register_blueprint(home.home_bp)
        app.register_blueprint(auth.auth_bp, url_prefix='/auth')
        app.register_blueprint(main.main_bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.data_bp)
        app.register_blueprint(api.api_v1)

        @login_manager.user_loader
        def load_user(user_id):
            if user_id is not None:
                return Session.query(User).get(int(user_id))
            return None

        @app.shell_context_processor
        def make_shell_context():
            return {'Session': Session, 'User': User, 'Favourite': Favourite}

        @app.teardown_request
        def shutdown_session(exception=None):
            Session.remove()

    return app
