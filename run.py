from bfx_data_server.server import create_app
from bfx_data_server.database.models import User, Post


app, session = create_app('config.DevConfig')


@app.shell_context_processor
def make_shell_context():
    return {'session': session, 'User': User, 'Post': Post}
