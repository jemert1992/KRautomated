from src.models.user import db
from datetime import datetime

class Alert(db.Model):
    __tablename__ = 'alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    severity = db.Column(db.String(20), nullable=False)  # critical, high, medium, low
    location = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    affected_areas = db.Column(db.Text)  # JSON string of affected areas
    estimated_claims = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'severity': self.severity,
            'location': self.location,
            'source': self.source,
            'affected_areas': self.affected_areas,
            'estimated_claims': self.estimated_claims,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }

