from flask import render_template, redirect, url_for
from flask_login import current_user
from . import bp


@bp.route('/')
@bp.route('/index')
@bp.route('/welcome')
def home():
    return render_template('home.html', title='Welcome')
