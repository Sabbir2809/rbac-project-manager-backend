# RBAC Project Manager

## Overview

RBAC Project Manager is a Role-Based Admin & Project Management System with Invitation-Based User Onboarding. Admins can manage users and projects, while new users can only register via admin-generated invitations.

---

## Features

**User Management**

- Users cannot self-register
- Admin-generated invites
- Invite token-based registration
- Role management (ADMIN | MANAGER | STAFF)
- Activate / deactivate users
- Deactivated users cannot log in

**Project Management**

- Authenticated users can create projects
- Only ADMIN can edit or delete projects
- Soft delete for projects (not permanently removed)
- All users can view projects

**Security & Validation**

- JWT authentication
- Password hashing with bcrypt
- Protected routes with role-based access
- Request validation using Zod
- Centralized error handling

---

## Database Design

## ![Database](./ERD.png)

---

## REST API Endpoints

**Authentication**

- `POST /auth/login` → Login with email/password
- `POST /auth/invite` → Admin generates invite
- `POST /auth/register-via-invite` → Complete registration using invite token

**User Management (ADMIN only)**

- `GET /users` → List all users (paginated)
- `PATCH /users/:id/role` → Update user role
- `PATCH /users/:id/status` → Activate / deactivate user

**Project Management**

- `POST /projects` → Create project
- `GET /projects` → List projects
- `PATCH /projects/:id` → Edit project (ADMIN only)
- `DELETE /projects/:id` → Soft delete project (ADMIN only)

---

## Technology Stack

- **Programming Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Security:** CORS, Rate Limiting
- **Email Service:** Nodemailer

---

## Project Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Sabbir2809/rbac-project-manager-backend.git
   cd rbac-project-manager-backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
3. Setup environment variables in `.env`.

   ```bash
   NODE_ENVIRONMENT=development

   PORT=
   DATABASE_URL=
   CORS_ORIGIN=

   # password
   BCRYPT_SALT_ROUNDS=

   # JWT
   JWT_ACCESS_SECRET_KEY=
   JWT_REFRESH_SECRET_KEY=

   # SMTP
   SMTP_USER=
   SMTP_PASSWORD=
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```
5. Open `http://localhost:5000` in your browser.
