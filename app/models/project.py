from .db import db
from sqlalchemy.dialects.postgresql import JSONB

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50))
    description = db.Column(db.String(500))
    state = db.Column(JSONB)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "state": self.state
        }

    user = db.relationship("User", back_populates="project");
