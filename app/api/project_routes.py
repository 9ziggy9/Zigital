from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:user_id>', methods=['POST'])
def save_project(user_id):
    if user_id != current_user.id:
        return 'whatcha doing there bud?'
    saved_project = request.json['save']
    return {'save': saved_project}
