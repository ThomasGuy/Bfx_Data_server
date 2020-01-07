"""
    flask route: an api data route
"""
from flask import Blueprint
from flask_login import login_required

from bfx_data_server.api.getCoins import getCoins

data_bp = Blueprint('data', __name__)


@data_bp.route('/api/data')
@login_required
def data():
    return getCoins()
