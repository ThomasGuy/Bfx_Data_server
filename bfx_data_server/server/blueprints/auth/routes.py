"""
    Flask login
"""
import logging

# third party imports
from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_sqlalchemy_session import current_session as db
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required

# package imports
from bfx_data_server.database.models import User, Favourite
from bfx_data_server.server.utils.userSesh import userSesh
from .forms import LoginForm, RegistrationForm


log = logging.getLogger(__name__)
auth_bp = Blueprint('author', __name__, template_folder='templates')


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.main'))
    form = LoginForm()
    if form.validate_on_submit():
        user = db.query(User).filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('author.login'))
        login_user(user, remember=form.remember_me.data)
        userSesh()
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('main.main')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)


@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home.home'))


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.main'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.add(user)
        newuser = db.query(User).filter_by(username=form.username.data).first()
        fav = Favourite(user_id=newuser.id, coins='btc')
        db.add(fav)
        db.commit()
        flash(f'Congratulations, you are now a registered user! {user.id}')
        return redirect(url_for('author.login'))
    return render_template('register.html', title='Register', form=form)


# @auth_bp.route('/reset_password_request', methods=['GET', 'POST'])
# def reset_password_request():
#     if current_user.is_authenticated:
#         return redirect(url_for('main.index'))
#     form = ResetPasswordRequestForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         if user:
#             send_password_reset_email(user)
#         flash(
#             _('Check your email for the instructions to reset your password'))
#         return redirect(url_for('auth.login'))
#     return render_template('auth/reset_password_request.html',
#                            title=_('Reset Password'), form=form)


# @auth_bp.route('/reset_password/<token>', methods=['GET', 'POST'])
# def reset_password(token):
#     if current_user.is_authenticated:
#         return redirect(url_for('main.index'))
#     user = User.verify_reset_password_token(token)
#     if not user:
#         return redirect(url_for('main.index'))
#     form = ResetPasswordForm()
#     if form.validate_on_submit():
#         user.set_password(form.password.data)
#         db.session.commit()
#         flash(_('Your password has been reset.'))
#         return redirect(url_for('auth.login'))
#     return render_template('auth/reset_password.html', form=form)
