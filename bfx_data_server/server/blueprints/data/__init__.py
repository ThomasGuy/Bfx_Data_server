from flask import Blueprint

bp = Blueprint('data', __name__)

from bfx_data_server.server.blueprints.data import view
