# Dockerfile

# Base image for Python
FROM python:3.9-slim

# Install the PostgreSQL client and development libraries
RUN apt-get update && apt-get install -y \
    libpq-dev gcc

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the requirements.txt file
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files to the container
COPY . /app/

# Expose the Django port
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
