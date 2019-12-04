from flask import Blueprint

bp = Blueprint('home', __name__, template_folder='templates')

from bfx_data_server.server.blueprints.home import routes
