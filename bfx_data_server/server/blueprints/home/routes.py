from flask import render_template, redirect, url_for
from flask_login import current_user
from flask import Blueprint

home_bp = Blueprint('home', __name__, template_folder='templates')


@home_bp.route('/')
def home():
    return render_template('home.html', title='Welcome')
