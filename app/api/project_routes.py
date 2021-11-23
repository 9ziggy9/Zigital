from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

project_routes = Blueprint('projects', __name__)
