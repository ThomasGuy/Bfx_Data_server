from flask import render_template
from bfx_server import create_app
from config import DevConfig

app = create_app(DevConfig)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
