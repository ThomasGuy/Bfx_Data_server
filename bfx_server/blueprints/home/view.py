from flask import render_template
from . import bp


@bp.route('/')
@bp.route('/api')
def home():
    return render_template('index.html')
