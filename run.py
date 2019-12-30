from bfx_data_server.server import create_app

app = create_app('config.DevConfig')

if __name__ == "__main__":
    app.run(host='0.0.0.0', load_dotenv=True, threaded=True)
