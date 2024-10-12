"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints
"""
import os


from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from dotenv import load_dotenv
from flask_login import LoginManager


# Load environment variables
load_dotenv()

# Initialize Flask app
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app) #Se inicializa cors
app.url_map.strict_slashes = False

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # Fallback to SQLite if no database URL is provided
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and migrations
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Setup admin interface and custom commands
setup_admin(app)
setup_commands(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Route for login view

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register the API blueprint
app.register_blueprint(api, url_prefix='/api')

# Error handler for the API
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Route for the sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve static files
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Disable cache
    return response

# Run the app
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=ENV == "development")
