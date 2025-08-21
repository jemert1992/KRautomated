import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.models.alert import Alert
from src.models.lead import Lead
from src.routes.user import user_bp
from src.routes.alerts import alerts_bp
from src.routes.leads import leads_bp
from src.routes.analytics import analytics_bp
from src.routes.weather import weather_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static', 'public-adjuster-platform', 'dist'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(alerts_bp, url_prefix='/api')
app.register_blueprint(leads_bp, url_prefix='/api')
app.register_blueprint(analytics_bp, url_prefix='/api')
app.register_blueprint(weather_bp, url_prefix='/api')

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize database and create sample data
with app.app_context():
    db.create_all()
    
    # Create sample alerts if none exist
    if Alert.query.count() == 0:
        sample_alerts = [
            Alert(
                title='Hurricane Warning - Miami-Dade County',
                description='Category 2 hurricane approaching with sustained winds of 105 mph. Expected landfall in 18 hours.',
                severity='critical',
                location='Miami-Dade',
                source='National Hurricane Center',
                affected_areas='["Downtown Miami", "Miami Beach", "Coral Gables", "Homestead"]',
                estimated_claims='2,500-3,000'
            ),
            Alert(
                title='Severe Thunderstorm Warning - Broward County',
                description='Severe thunderstorms with hail up to 2 inches and winds up to 70 mph moving through the area.',
                severity='high',
                location='Broward',
                source='National Weather Service',
                affected_areas='["Fort Lauderdale", "Hollywood", "Pembroke Pines"]',
                estimated_claims='800-1,200'
            ),
            Alert(
                title='Flood Advisory - Palm Beach County',
                description='Heavy rainfall causing street flooding in low-lying areas. 3-5 inches of rain expected.',
                severity='medium',
                location='Palm Beach',
                source='Local Emergency Management',
                affected_areas='["West Palm Beach", "Delray Beach", "Boynton Beach"]',
                estimated_claims='400-600'
            )
        ]
        
        for alert in sample_alerts:
            db.session.add(alert)
    
    # Create sample leads if none exist
    if Lead.query.count() == 0:
        sample_leads = [
            Lead(
                name='Eleanor Pena',
                contact='(728) 523-0188',
                email='eleanor.pena@email.com',
                claim_type='Property Damage',
                status='new',
                location='Miami'
            ),
            Lead(
                name='Ariens McCoy',
                contact='(466) 332-0128',
                email='ariens.mccoy@email.com',
                claim_type='Auto',
                status='in-progress',
                location='Fort Lauderdale'
            ),
            Lead(
                name='Dernet Steward',
                contact='(508) 818-0198',
                email='dernet.steward@email.com',
                claim_type='Property Damage',
                status='in-progress',
                location='West Palm Beach'
            ),
            Lead(
                name='Jecoo Jones',
                contact='(216) 321-0148',
                email='jecoo.jones@email.com',
                claim_type='Health',
                status='new',
                location='Miami Beach'
            ),
            Lead(
                name='Theness Wekts',
                contact='(687) 523-0122',
                email='theness.wekts@email.com',
                claim_type='Property Damage',
                status='closed',
                location='Boca Raton'
            )
        ]
        
        for lead in sample_leads:
            db.session.add(lead)
    
    db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
