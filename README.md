```bash
# Enter the backend directory
cd backend/

# Startup the application through Docker
docker compose up -d

# Apply migrations
docker-compose exec django python manage.py migrate

# Create a Superuser (Optional)
docker-compose exec django python manage.py createsuperuser

# Enter frontend
Open 'http://localhost:3000/' on your browser

```
