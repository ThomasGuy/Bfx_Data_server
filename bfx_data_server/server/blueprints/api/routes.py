from flask import Blueprint, session, jsonify
from flask_sqlalchemy_session import current_session as cs
from flask_login import login_required, current_user
from flask_cors import CORS

from bfx_data_server.database.models import Favourite

api_v1 = Blueprint('API_v1', __name__, template_folder='templates')
CORS(api_v1)


@api_v1.route('/api/v1/userFavCoins', methods=['GET', 'POST'])
@login_required
def userData():
    '''
        load users favourtie coins
    '''
    fav, *rest = cs.query(Favourite.coins).filter(Favourite.user_id == current_user.id)[0]
    return jsonify(fav.split(','))


@api_v1.route('/api/v1/users/')
@login_required
def list_users():
    '''
        # A list of currently logged in users

        Since the path matches the regular expression r'/api/*', this resource
        automatically has CORS headers set. The expected result is as follows:

        $ curl --include -X GET http://127.0.0.1:5000/api/v1/users/ \
            --header Origin:www.examplesite.com
        HTTP/1.0 200 OK
        Access-Control-Allow-Headers: Content-Type
        Access-Control-Allow-Origin: *
        Content-Length: 21
        Content-Type: application/json
        Date: Sat, 09 Aug 2014 00:26:41 GMT
        Server: Werkzeug/0.9.4 Python/2.7.8

        {
            "success": true
        }

    '''
    return jsonify('btc','ltc','xrp')
