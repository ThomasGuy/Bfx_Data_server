from flask import Blueprint

err = Blueprint('errors', __name__,)

from bfx_data_server.server.blueprints.errors import handler
