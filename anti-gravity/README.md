# Anti Gravity App

Fullstack application for Workforce Management (Attendance, Task, Schedule, Support).

## Structure

- **frontend/**: Mobile-first Web App (PWA). Built with Vite (Vanilla JS).
- **backend/**: REST API using Node.js, Express, and PostgreSQL (Prisma).
- **database/**: SQL scripts (`DDL.sql`, `DML.sql`) for database setup.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Database Setup

1. Run the scripts in `database/DDL.sql` to create the schema.
2. Run `database/DML.sql` to seed initial data.
3. Update `backend/.env` with your database credentials.

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`.
API Documentation: `backend/postman/anti-gravity.postman_collection.json`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Features

- **PWA**: Installable on mobile devices.
- **Attendance**: GPS & Photo based clock-in/out.
- **Task Management**: Track tasks and priorities.
- **Schedule**: View shifts and rosters.
- **Support**: Emergency contacts and helpdesk info.

## Architecture

- **Backend**: Modular Express.js, JSON Schema Validation, Prisma ORM.
- **Frontend**: Lightweight Vanilla JS SPA, Glassmorphism UI, Component-based structure.

## Deployment

1. Build frontend: `npm run build` in `frontend/`.
2. Serve static files via Nginx or backend static middleware.
3. Run backend with `pm2` or Docker.
