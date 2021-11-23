from .db import db
from sqlalchemy_json import mutable_json_type
from sqlalchemy.dialects.postgresql import JSONB

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50))
    description = db.Column(db.String(500))
    state = db.Column(mutable_json_type(dbtype=JSONB, nested=True))

    user = db.relationship("User", back_populates="project");
