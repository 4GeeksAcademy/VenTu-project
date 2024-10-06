"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    # Replace deprecated 'postgres://' with 'postgresql://' for SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # Fallback to SQLite if no database URL is provided
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and migrations
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Set up admin interface
setup_admin(app)

# Set up custom commands
setup_commands(app)

# Register the API routes with the blueprint
app.register_blueprint(api, url_prefix='/api')

# Handle errors with custom API exception
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all available endpoints (only in development mode)
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve any static file, including frontend assets
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Disable cache
    return response

# Run the Flask app
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=ENV == "development")
