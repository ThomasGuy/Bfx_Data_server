from flask import render_template
from flask_sqlalchemy_session import current_session
from . import err


@err.app_errorhandler(404)
def not_found_error(error):
    return render_template('404.html', title='Error'), 404


@err.app_errorhandler(500)
def internal_error(error):
    current_session.rollback()
    return render_template('500.html', title='Error'), 500
