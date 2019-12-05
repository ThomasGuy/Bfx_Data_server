from flask import render_template
from flask_login import login_required
from flask import Blueprint

main_bp = Blueprint('main', __name__, template_folder='templates')


@main_bp.route('/main')
@login_required
def main():
    return render_template('main.html', title='Bitfinex Coins')
