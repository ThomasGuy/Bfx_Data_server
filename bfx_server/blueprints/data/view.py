from . import bp
from bfx_server.api.getCoins import getCoins


@bp.route('/api/data')
def data():
    return getCoins()
