from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import os
import json
from services.email_service import EmailService

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Serve frontend
@app.route('/')
def serve_frontend():
    frontend_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'index.html')
    return send_file(frontend_path)

@app.route('/<path:filename>')
def serve_static(filename):
    frontend_dir = os.path.join(os.path.dirname(__file__), '..', 'frontend')
    return send_file(os.path.join(frontend_dir, filename))

# API Routes
MOCK_WORKFLOWS = [
    {
        "id": 1,
        "name": "Schedule Team Meeting",
        "description": "Schedule meeting and email team members",
        "status": "completed",
        "icon": "fas fa-calendar-plus",
        "steps": ["Check calendar", "Create event", "Send emails"]
    }
]

@app.route('/api/workflows', methods=['GET'])
def get_workflows():
    return jsonify(MOCK_WORKFLOWS)

@app.route('/api/workflows', methods=['POST'])
def create_workflow():
    data = request.get_json()
    description = data.get('description', '')
    
    new_workflow = {
        "id": len(MOCK_WORKFLOWS) + 1,
        "name": f"Workflow from: {description[:30]}...",
        "description": description,
        "status": "pending",
        "icon": "fas fa-magic"
    }
    
    MOCK_WORKFLOWS.append(new_workflow)
    return jsonify(new_workflow)

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "Server is running!"})

@app.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    email_service = EmailService()
    result = email_service.send_email(
        data['to_email'],
        data['subject'], 
        data['body']
    )
    return jsonify(result)

if __name__ == '__main__':
    print("🚀 Starting Workflow Automator...")
    print("📍 Frontend: http://localhost:5000")
    print("🔗 API: http://localhost:5000/api/health")
    app.run(debug=True, port=5000, host='0.0.0.0')