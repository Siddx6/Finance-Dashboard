# Finance Data Processing & Access Control Dashboard API

A production-ready REST API built with Node.js, Express, MongoDB, and JWT authentication. This project demonstrates backend architecture, role-based access control, data processing, and scalable API design for a finance dashboard system.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Validation:** Joi
* **Documentation:** Swagger (OpenAPI)
* **Architecture:** MVC Pattern

---

## 📦 Setup Instructions

### Prerequisites

* Node.js >= 18
* MongoDB (local or Atlas)

### Installation

```bash
git clone <your-repo-url>
cd finance-dashboard
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Update `.env` with:

* MongoDB URI
* JWT Secret
* Port

### Run the Server

```bash
npm run dev   # Development
npm start     # Production
```

### API Documentation

```
http://localhost:5000/api/docs
```

---

# ✅ Project Completion Status

The Finance Dashboard API is fully implemented and verified with the following features:

| Feature                          | Status |
| -------------------------------- | ------ |
| User registration & login        | ✅      |
| JWT authentication               | ✅      |
| Role-based access control        | ✅      |
| Financial records CRUD           | ✅      |
| Dashboard aggregations           | ✅      |
| Swagger API documentation        | ✅      |
| Postman collection               | ✅      |
| Joi input validation             | ✅      |
| Centralized error handling       | ✅      |
| ESLint (0 errors)                | ✅      |
| Rate limiting (100 req / 15 min) | ✅      |

---

# ✅ Assignment Requirements Coverage

## 1. User & Role Management ✔️

* Create and manage users
* Assign roles (Viewer, Analyst, Admin)
* Activate/Deactivate users
* Role-based restrictions enforced via middleware

### Roles & Permissions

| Role    | Permissions                              |
| ------- | ---------------------------------------- |
| Viewer  | View records only                        |
| Analyst | View records + access analytics          |
| Admin   | Full access (users + records management) |

---

## 2. Financial Records Management ✔️

* Create, read, update, delete (soft delete)
* Filtering support:

  * By date range
  * By category
  * By type (income/expense)
* Pagination supported

### Record Fields

* Amount
* Type (income / expense)
* Category
* Date
* Description

---

## 3. Dashboard Summary APIs ✔️

Aggregation-based endpoints:

* Total income
* Total expenses
* Net balance
* Category-wise breakdown
* Monthly trends (last 12 months)
* Recent transactions

---

## 4. Access Control Logic ✔️

* Implemented using middleware
* Role-based restrictions enforced across all endpoints

### Examples:

* Viewer → Read-only access
* Analyst → Analytics access
* Admin → Full system control

---

## 5. Validation & Error Handling ✔️

* Joi-based schema validation
* Centralized error handling middleware
* Proper HTTP status codes:

  * 400 → Bad request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 404 → Not found
  * 500 → Server error

---

## 6. Data Persistence ✔️

* MongoDB used for storage
* Mongoose schemas for structured modeling

---

## ⭐ Additional Enhancements

* JWT-based authentication
* Pagination (`page`, `limit`)
* Soft delete functionality
* Rate limiting (100 requests / 15 minutes)
* Swagger API documentation
* Postman collection for testing
* ESLint configured with zero errors

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login            |
| GET    | /api/auth/me       | Get current user |

---

## Users (Admin Only)

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /api/users            | List all users     |
| PATCH  | /api/users/:id/status | Toggle user status |

---

## Financial Records

| Method | Endpoint         | Role  | Description   |
| ------ | ---------------- | ----- | ------------- |
| POST   | /api/records     | Admin | Create record |
| GET    | /api/records     | All   | List records  |
| PUT    | /api/records/:id | Admin | Update record |
| DELETE | /api/records/:id | Admin | Soft delete   |

---

## Dashboard

| Method | Endpoint                           | Role          | Description       |
| ------ | ---------------------------------- | ------------- | ----------------- |
| GET    | /api/dashboard/summary             | Analyst/Admin | Financial summary |
| GET    | /api/dashboard/category-breakdown  | Analyst/Admin | Category totals   |
| GET    | /api/dashboard/monthly-trends      | Analyst/Admin | Monthly trends    |
| GET    | /api/dashboard/recent-transactions | Analyst/Admin | Recent activity   |

---

# 📌 Example Requests

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Admin","email":"admin@example.com","password":"Admin@1234","role":"admin"}'
```

---

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@example.com","password":"Admin@1234"}'
```

---

### Create Record

```bash
curl -X POST http://localhost:5000/api/records \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"amount":5000,"type":"income","category":"Salary","date":"2024-01-15"}'
```

---

# 📐 Architecture Overview

```
Routes → Controllers → Services → Models → Database
```

* Controllers handle request/response
* Services contain business logic
* Models define schema
* Middleware handles authentication, authorization, and validation

---

# ⚠️ Assumptions

* Role can be assigned during registration (simplified for this assignment)
* Soft-deleted records are excluded from queries
* JWT expiry configurable via environment variables
* Pagination defaults: page=1, limit=10

---

# 🧠 Key Highlights

* Clean modular architecture
* Strong role-based access control
* Aggregation-based analytics APIs
* Scalable backend design
* Production-ready practices applied

---

# 📬 Conclusion

This project fulfills all core assignment requirements while incorporating additional production-level enhancements. It demonstrates backend engineering skills in API design, access control, data modeling, and system architecture.
