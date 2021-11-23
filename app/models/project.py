from .db import db
from sqlalchemy_json import mutable_json_type

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(50))
    description = db.Column(db.String(500))
    state = db.Column(mutable_json_type(dbtype=JSONB, nested=True))
