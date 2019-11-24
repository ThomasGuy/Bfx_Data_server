from flask import render_template
from bfx_server import create_app


app = create_app('config.DevConfig')
app.run()
