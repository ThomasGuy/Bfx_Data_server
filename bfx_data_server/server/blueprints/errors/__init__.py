from flask import Blueprint

err = Blueprint('errors', __name__, template_folder='templates')

from bfx_data_server.server.blueprints.errors import handler
