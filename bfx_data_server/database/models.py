from datetime import datetime

# third  party imports
from sqlalchemy import Column, DateTime, Float, String, Integer, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()


class User(UserMixin, Base):
    __tablename__ = 'users'

    id = Column(Integer(), primary_key=True)
    username = Column(String(64), index=True, unique=True, nullable=False)
    email = Column(String(120), index=True, unique=True, nullable=False)
    password_hash = Column(String(128))
    favourites = relationship('Favourite', uselist=False, back_populates='users')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Favourite(Base):
    __tablename__ = 'favourites'

    id = Column(Integer, primary_key=True)
    coins = Column('favCoins', String)
    user_id = Column(Integer, ForeignKey('users.id'))
    users = relationship('User', back_populates='favourites')

    def __repr__(self):

        return f'<Favourite coins: {self.coins}>'
