from flask import Blueprint

bp = Blueprint('home', __name__)

from bfx_server.blueprints.home import view
