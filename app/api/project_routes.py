from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, User, Project

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:user_id>', methods=['POST'])
def save_project(user_id):
    if user_id != current_user.id:
        return 'whatcha doing there bud?'
    project = request.json['save']
    saved_project = Project(
        user_id=current_user.id,
        title='Untitled',
        description='Hello World',
        state=project
    )
    db.session.add(saved_project)
    db.session.commit()
    return {'hello': 'world'}

@project_routes.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.filter_by(id=project_id).first()
    print('\n hello \n')
    print(project)
    print('\n hello \n')
    return {"project": project.to_dict()}
