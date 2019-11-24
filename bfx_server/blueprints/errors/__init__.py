from flask import Blueprint

err = Blueprint('errors', __name__, template_folder='templates')

from bfx_server.blueprints.errors import handler
