"""
    Initialize Socketio and events
"""
import logging
# import json

from flask_socketio import SocketIO, emit
from flask import request


log = logging.getLogger(__name__)
sockio = SocketIO()


@sockio.on('connect')
def test_connected():
    emit('my response', {'data': 'Connected'})
    log.info(f"socketio: {request.sid} connected")


@sockio.on('disconnect')
def test_disconnect():
    print(f"socketio: {request.sid} disconnected")
    log.info(f"socketio: {request.sid} disconnected")


@sockio.on('message', namespace='/api/test')
def messsage_handler(msg):
    emit('my response', {'data': msg['data']})


@sockio.on('ticker_update')
def handle_ticker_update(json):
    emit('ticker_update', {'delta': 255})
    log.info(f'ticker_update_event: {str(json)}')


@sockio.on('event')
def handle_event(json):
    emit('Ahoy there', {'data': 42})
    log.info(f'Event', str(json))
