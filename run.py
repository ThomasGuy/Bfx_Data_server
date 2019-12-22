from bfx_data_server.server import create_app

app = create_app('config.DevConfig')

if __name__ == "__main__":
    app.run(load_dotenv=True)
