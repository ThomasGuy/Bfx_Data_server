"""
    Flask route; api
"""
from flask import Blueprint, jsonify, request, session
from flask_login import login_required


api_v1 = Blueprint('API_v1', __name__, template_folder='templates')



@api_v1.route('/api/v1/favCoins', methods=['GET', 'POST'])
@login_required
def userData():
    '''
        load/save users favourtie coins
    '''
    if request.method == 'GET':
        return jsonify(session['favCoins'])
    elif request.method == 'POST':
        pass
