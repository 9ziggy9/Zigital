from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, User, Project

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:user_id>', methods=['POST'])
def save_project(user_id):
    if user_id != current_user.id:
        return 'whatcha doing there bud?'
    project = request.json['save']
    project_title = request.json['title']
    project_desc = request.json['description']
    saved_project = Project(
        user_id=current_user.id,
        title=project_title,
        description=project_desc,
        state=project
    )
    db.session.add(saved_project)
    db.session.commit()
    return {'project': saved_project.to_dict()}

@project_routes.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.filter_by(id=project_id).first()
    print('\n hello \n')
    print(project)
    print('\n hello \n')
    return {"project": project.to_dict()}

@project_routes.route('/all', methods=['GET'])
def get_projects():
    user_id = current_user.id
    projects = Project.query.filter_by(user_id=user_id).all()
    print('\n hello \n')
    print(projects)
    print('\n hello \n')
    return {"projects": [{'id': project.to_dict()['id'], 'title': project.to_dict()['title'], 'description': project.to_dict()['description']} for project in projects]}
