from flask import Blueprint

bp = Blueprint('data', __name__)

from bfx_server.blueprints.data import view
