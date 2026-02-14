# Docker

Run the app with PHP 8.3, Laravel 12, PostgreSQL, Redis, and Node:

```bash
cp .env.docker.example .env
docker compose up -d
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

- **App**: http://localhost:8080
- **Vite** (dev): http://localhost:5173
- **PostgreSQL**: localhost:5432 (user: genz, password: secret, db: genz)
- **Redis**: localhost:6379

**Node service** runs `npm run dev` for hot reload. For a one-off build:
```bash
docker compose run --rm node npm run build
```
