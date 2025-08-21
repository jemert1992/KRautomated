# Public Adjuster Pro

Public Adjuster Pro is a comprehensive, AI-powered web platform designed for public adjusters in South Florida. It provides real-time disaster monitoring, AI-powered claim prediction, client acquisition tools, performance analytics, and a knowledge hub.

## Project Structure

This repository contains both the frontend (React) and backend (Flask) components of the application, structured for easy deployment with platforms like Render.

```
public-adjuster-backend/
├── src/
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   ├── static/                   # Static files (including the React frontend)
│   │   └── public-adjuster-platform/ # React project directory
│   │       ├── dist/             # Built React frontend files
│   │       └── ...               # Other React project files
│   ├── main.py                   # Main Flask application
│   └── database/
│       └── app.db                # SQLite database file
├── venv/                         # Python virtual environment
├── requirements.txt              # Python dependencies
├── Dockerfile                    # Docker configuration for deployment
└── render.yaml                   # Render deployment configuration
```

## Local Development

To run the application locally, you will need Node.js (v20.x) and Python (v3.11) installed.

### 1. Backend Setup (Flask)

Navigate to the `public-adjuster-backend` directory:

```bash
cd public-adjuster-backend
```

Create and activate a Python virtual environment:

```bash
python3.11 -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 2. Frontend Setup (React)

Navigate to the React project directory within the backend's static folder:

```bash
cd src/static/public-adjuster-platform
```

Install Node.js dependencies (using `pnpm` as specified in the original project):

```bash
pnpm install
```

### 3. Build Frontend for Local Testing

Build the React frontend. This will place the production-ready files into `src/static/public-adjuster-platform/dist`.

```bash
pnpm run build
```

### 4. Run the Flask Backend

From the `public-adjuster-backend` directory, run the Flask application:

```bash
python src/main.py
```

The Flask application will serve the React frontend from `http://localhost:5000/` and its API endpoints will be available under `http://localhost:5000/api/`.

## Deployment with Render

This project is configured for easy deployment to Render using the `render.yaml` file.

1.  **Create a new Web Service on Render**: Connect your GitHub repository containing this project.
2.  **Select `Blueprint` for deployment**: Render will automatically detect the `render.yaml` file.
3.  **Configure Environment Variables**: Ensure any necessary environment variables (e.g., `SECRET_KEY` for Flask) are set in Render. The `render.yaml` includes `generateValue: true` for `SECRET_KEY` to automatically generate one.
4.  **Deploy**: Trigger the deployment. Render will build the Docker image, install dependencies, build the React frontend, and then run the Flask application.

## API Endpoints

Refer to `deployment_guide.md` for a detailed list of API endpoints.

## License

[Specify your license here, e.g., MIT, Apache 2.0, etc.]
etc.]


