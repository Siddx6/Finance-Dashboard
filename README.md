# Finance Data Processing & Access Control Dashboard API

A production-ready REST API built with Node.js, Express, MongoDB, and JWT authentication following clean MVC architecture with role-based access control.

## Setup Instructions

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone and install
```bash
git clone <repo-url>
cd finance-dashboard
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start the server
```bash
npm run dev   # development
npm start     # production
```

### 4. Open API docs
```
http://localhost:5000/api/docs
```

## API Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login, get JWT |
| GET | /api/auth/me | Any | Current user |
| GET | /api/users | Admin | List all users |
| PATCH | /api/users/:id/status | Admin | Toggle status |
| POST | /api/records | Admin | Create record |
| GET | /api/records | All | List records |
| PUT | /api/records/:id | Admin | Update record |
| DELETE | /api/records/:id | Admin | Soft delete |
| GET | /api/dashboard/summary | Analyst/Admin | Totals |
| GET | /api/dashboard/category-breakdown | Analyst/Admin | By category |
| GET | /api/dashboard/monthly-trends | Analyst/Admin | 12 month trends |
| GET | /api/dashboard/recent-transactions | Analyst/Admin | Recent activity |

## Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"Admin@1234","role":"admin"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@1234"}'
```

### Create Record
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":5000,"type":"income","category":"Salary","date":"2024-01-15"}'
```

## Assumptions
1. Any role can be set at registration — restrict this in production.
2. Soft-deleted records are excluded from all queries automatically.
3. Dashboard endpoints are restricted to analyst and admin roles.
4. JWT expires in 7 days by default, configurable via JWT_EXPIRES_IN.
5. Pagination defaults to page=1, limit=10, max limit is 100.