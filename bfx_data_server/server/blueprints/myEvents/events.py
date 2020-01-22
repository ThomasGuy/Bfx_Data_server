"""
    Initialize Socketio and events
"""
import logging
# import json
from flask import request
from flask_socketio import SocketIO, emit


log = logging.getLogger(__name__)
sockio = SocketIO()


@sockio.on('connect', namespace='/main/test')
def test_connected():
    emit('my_response', {'data': 'Well Connected'})
    log.info(f"socketio: {request.sid} connected")


@sockio.on('disconnect')
def test_disconnect():
    print(f"socketio: {request.sid} disconnected")
    log.info(f"socketio: {request.sid} disconnected")


@sockio.on('message')
def messsage_handler(msg):
    # emit('my_response', {'data': 'got it'})
    print(msg)


@sockio.on('json')
def handle_json(json):
    print('received json: ' + str(json))
