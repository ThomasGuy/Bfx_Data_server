from flask import Flask
# from flask_cachebuster import CacheBuster
# from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy_session import flask_scoped_session
from flask_migrate import Migrate
from flask_login import LoginManager


# cb_Config = {'extensions': ['.js', '.css', '.csv'], 'hash_size': 5}

# Globally accessible libraries
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
# cache_buster = CacheBuster(config=cb_Config)
# migrate = Migrate()


def create_app(config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app
    """
    app = Flask(__name__,
                instance_relative_config=True,
                static_folder='../public')
    app.config.from_object(config)
    app.config.from_pyfile('settings', silent=True)

    # a sqlalchemy database session
    from bfx_data_server import session_factory
    session = flask_scoped_session(session_factory, app)

    # Initialize Plugins
    # migrate.init_app(app, session)
    login_manager.init_app(app)
    # cache_buster.init_app(app)

    with app.app_context():
        from bfx_data_server.server.blueprints import home, main, errors, data, auth
        app.register_blueprint(auth.bp)
        app.register_blueprint(home.bp)
        app.register_blueprint(main.bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.bp)

        from bfx_data_server.database.models import User
        @login_manager.user_loader
        def load_user(id):
            return session.query(User).get(int(id))

        @app.teardown_request
        def shutdown_session(exception=None):
            session.remove()

        return app, session
