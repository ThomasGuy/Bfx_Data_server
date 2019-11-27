from flask import Blueprint

bp = Blueprint('home', __name__)

from bfx_data_server.server.blueprints.home import view
