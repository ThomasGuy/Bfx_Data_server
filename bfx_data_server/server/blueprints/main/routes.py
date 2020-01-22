"""
    Flask route main: A logged user session showinf bitfinex coins
"""
from flask import render_template, session, Blueprint
from flask_login import login_required


main_bp = Blueprint('main', __name__, template_folder='templates')


@main_bp.route('/main')
@login_required
def main():
    session['redis-test'] = 'This is a session variable.'
    return render_template('main.html', title='Bitfinex Coin')


@main_bp.route('/main/test', methods=['GET', 'POST', 'PUT'])
@login_required
def test_view():
    return render_template('test.html',
                           title='Flask-Session',
                           template='test-template',
                           session_variable=str(session['name']))
