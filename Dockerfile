FROM python:3.11-slim-buster

WORKDIR /app

# Install Node.js for building the React frontend
RUN apt-get update --fix-missing && apt-get install -y curl && \
    apt-get clean && apt-get autoclean
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Build the React frontend
WORKDIR /app/src/static/public-adjuster-platform
RUN npm install
RUN npm run build

# Move the built frontend to the Flask static directory
RUN mv dist/* ../

WORKDIR /app

EXPOSE 5000

CMD ["python", "src/main.py"]
