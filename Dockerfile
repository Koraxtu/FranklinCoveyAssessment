# Pull the full Python 3.11 image
FROM python:3.11.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies for PostgreSQL and build tools
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose the application port
EXPOSE 8000

# Command to run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]