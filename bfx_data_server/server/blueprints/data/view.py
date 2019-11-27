from flask_login import login_required

from . import bp
from bfx_data_server.api.getCoins import getCoins


@bp.route('/api/data')
@login_required
def data():
    return getCoins()
