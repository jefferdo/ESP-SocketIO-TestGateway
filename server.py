import eventlet
import socketio

sio = socketio.Server(cors_allowed_origins="*")

# the index.html file hosted by eventlet is a dummy file
# it appears to be required to host some html file..
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'},
    '/assets/css/main.css': {'content_type': 'text/css', 'filename': 'assets/css/main.css'},
    '/assets/js/main.js': {'content_type': 'application/javascript', 'filename': 'assets/js/main.js'}
})


@sio.on('connect')
def connect(sid, environ):
    print('connected: ', sid)


@sio.on('read_pump')
def message(sid, data):
    sio.emit('read_pump_display', data)


@sio.on('disconnect')
def disconnect(sid):
    print('disconnected: ', sid)


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 9000)), app)
