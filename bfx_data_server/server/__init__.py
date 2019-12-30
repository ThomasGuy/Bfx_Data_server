from flask import Flask
from flask_sqlalchemy_session import flask_scoped_session
from flask_login import LoginManager
from flask_cache_buster import CacheBuster

cacheConfig = {
     'extensions': ['.js', '.css', '.csv'],
     'hash_size': 10
}
# initialize globals
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
buster = CacheBuster(config=cacheConfig)


def create_app(Config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app, session
    """
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    with app.app_context():
        # initialize plugins
        login_manager.init_app(app)
        buster.register_cache_buster(app)

        from bfx_data_server.database import session_factory, User, Favourite
        Session = flask_scoped_session(session_factory, app)

        from bfx_data_server.server.blueprints import home, auth, main, errors, data, api
        app.register_blueprint(home.home_bp)
        app.register_blueprint(auth.auth_bp, url_prefix='/auth')
        app.register_blueprint(main.main_bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.data_bp)
        app.register_blueprint(api.api_v1)

        @login_manager.user_loader
        def load_user(id):
            return Session.query(User).get(int(id))

        @app.shell_context_processor
        def make_shell_context():
            return {'Session': Session, 'User': User, 'Favourite': Favourite}

        @app.teardown_request
        def shutdown_session(exception=None):
            Session.remove()

    return app
