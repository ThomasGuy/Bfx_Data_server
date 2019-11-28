from flask import Flask
from flask_sqlalchemy_session import flask_scoped_session
# from flask_redis import FlaskRedis
from flask_login import LoginManager

# package imports
from bfx_data_server import session_factory
from bfx_data_server.database.models import User


def create_app(config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app, session
    """
    app = Flask(__name__,
                instance_relative_config=False,
                static_folder='static')
    app.config.from_object(config)

    # redis_store = FlaskRedis()
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'

    with app.app_context():
        # Set global values
        # redis_store.endpoint = app.config['ENDPOINT']
        # redis_store.post_query = app.config['POST_QUERY']

        # initialize globals
        session = flask_scoped_session(session_factory, app)
        # Initialize Plugins
        login_manager.init_app(app)

        @login_manager.user_loader
        def load_user(id):
            return session.query(User).get(int(id))

        from bfx_data_server.server.blueprints import home, main, errors, data, auth
        app.register_blueprint(auth.bp)
        app.register_blueprint(home.bp)
        app.register_blueprint(main.bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.bp)

        @app.teardown_request
        def shutdown_session(exception=None):
            session.remove()

    return app, session
