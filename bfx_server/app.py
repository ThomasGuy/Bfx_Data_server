from flask import render_template
from . import create_app
from ..config import DevConfig

app = create_app(DevConfig)


@app.route('/')
def index():
    return render_template('index.html')


app.run()
