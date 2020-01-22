"""
    Initialize current user session
"""
from flask import session
from flask_login import current_user
from flask_sqlalchemy_session import current_session as db

from bfx_data_server.database.models import Favourite


def userSesh():
    ''' Load up the user session '''
    fav, = db.query(Favourite.coins).filter(Favourite.user_id == current_user.id).first()
    session['favCoins'] = fav.split(',')
    session['name'] = current_user.username
