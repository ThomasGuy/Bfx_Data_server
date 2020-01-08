"""
    kick off socketio and flask server
"""
# package imports
from bfx_data_server.server import create_app
from bfx_data_server.server.blueprints.api.bfx import bfx

app, sockio = create_app('config.DevConfig')

if __name__ == "__main__":
    bfx.ws.run()
    sockio.run(app)
