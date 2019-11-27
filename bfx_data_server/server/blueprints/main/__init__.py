from flask import Blueprint

bp = Blueprint('main', __name__)

from bfx_data_server.server.blueprints.main import view
