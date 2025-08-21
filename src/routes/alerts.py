from flask import Blueprint, jsonify, request
from src.models.alert import Alert, db
import json

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/alerts', methods=['GET'])
def get_alerts():
    """Get all active alerts"""
    try:
        alerts = Alert.query.filter_by(is_active=True).order_by(Alert.created_at.desc()).all()
        return jsonify([alert.to_dict() for alert in alerts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/alerts/<int:alert_id>', methods=['GET'])
def get_alert(alert_id):
    """Get a specific alert by ID"""
    try:
        alert = Alert.query.get_or_404(alert_id)
        return jsonify(alert.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/alerts', methods=['POST'])
def create_alert():
    """Create a new alert"""
    try:
        data = request.get_json()
        
        alert = Alert(
            title=data.get('title'),
            description=data.get('description'),
            severity=data.get('severity'),
            location=data.get('location'),
            source=data.get('source'),
            affected_areas=json.dumps(data.get('affected_areas', [])),
            estimated_claims=data.get('estimated_claims')
        )
        
        db.session.add(alert)
        db.session.commit()
        
        return jsonify(alert.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/alerts/<int:alert_id>', methods=['PUT'])
def update_alert(alert_id):
    """Update an existing alert"""
    try:
        alert = Alert.query.get_or_404(alert_id)
        data = request.get_json()
        
        alert.title = data.get('title', alert.title)
        alert.description = data.get('description', alert.description)
        alert.severity = data.get('severity', alert.severity)
        alert.location = data.get('location', alert.location)
        alert.source = data.get('source', alert.source)
        alert.affected_areas = json.dumps(data.get('affected_areas', json.loads(alert.affected_areas or '[]')))
        alert.estimated_claims = data.get('estimated_claims', alert.estimated_claims)
        alert.is_active = data.get('is_active', alert.is_active)
        
        db.session.commit()
        
        return jsonify(alert.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/alerts/<int:alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    """Deactivate an alert"""
    try:
        alert = Alert.query.get_or_404(alert_id)
        alert.is_active = False
        db.session.commit()
        
        return jsonify({'message': 'Alert deactivated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/alerts/summary', methods=['GET'])
def get_alerts_summary():
    """Get summary statistics for alerts"""
    try:
        critical_count = Alert.query.filter_by(severity='critical', is_active=True).count()
        high_count = Alert.query.filter_by(severity='high', is_active=True).count()
        medium_count = Alert.query.filter_by(severity='medium', is_active=True).count()
        low_count = Alert.query.filter_by(severity='low', is_active=True).count()
        
        return jsonify({
            'critical': critical_count,
            'high': high_count,
            'medium': medium_count,
            'low': low_count,
            'total': critical_count + high_count + medium_count + low_count
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

