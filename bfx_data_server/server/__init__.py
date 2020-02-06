'''
    initialize flask from here
'''
# pylint: skip-file
from flask import Flask
from flask_sqlalchemy_session import flask_scoped_session
from flask_login import LoginManager
from flask_session import Session
from flask_cors import CORS

# package imports
from bfx_data_server.server.blueprints.myEvents.events import sockio


# initialize globals
login_manager = LoginManager()
login_manager.login_view = 'author.login'  # name of blueprint.route
sesh = Session()


def create_app(Config):
    """
    Create Flask application using app factory pattern.

    :return: Flask app, SocketIO sockio
    """
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # initialize plugins
    from bfx_data_server.database import session_factory, User, Favourite
    dbSession = flask_scoped_session(session_factory, app)
    login_manager.init_app(app)
    sesh.init_app(app)
    sockio.init_app(app, manage_session=False)


    with app.app_context():
        from bfx_data_server.server.blueprints import home, auth, main, errors, data, api
        app.register_blueprint(home.home_bp)
        app.register_blueprint(auth.auth_bp, url_prefix='/auth')
        app.register_blueprint(main.main_bp)
        app.register_blueprint(errors.err, url_prefix='/error')
        app.register_blueprint(data.data_bp)
        app.register_blueprint(api.api_v1, url_perfix='/api_v1')

        @login_manager.user_loader
        def load_user(user_id):
            if user_id is not None:
                return dbSession.query(User).get(int(user_id))
            return None

        @app.shell_context_processor
        def make_shell_context():
            return {'db': dbSession, 'User': User, 'Favourite': Favourite}

        @app.teardown_appcontext
        def shutdown_session(exception=None):
            dbSession.remove()

    return app, sockio
