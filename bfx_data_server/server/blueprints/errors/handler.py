import logging

from flask import render_template
from flask_sqlalchemy_session import current_session
from flask import Blueprint

log = logging.getLogger(__name__)
err = Blueprint('errors', __name__, template_folder='templates')


@err.app_errorhandler(404)
def not_found_error(error):
    log.info('404')
    return render_template('404.html', title='Error'), 404


@err.app_errorhandler(500)
def internal_error(error):
    log.info('505')
    current_session.rollback()
    return render_template('500.html', title='Error'), 500
