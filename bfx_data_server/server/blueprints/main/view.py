from flask import render_template
from flask_login import login_required
from . import bp


@bp.route('/main')
@login_required
def main():
    return render_template('main/main.html')