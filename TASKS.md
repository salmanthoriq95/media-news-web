# Task List - Media Promote SMK Web App

## Status Legend
- ✅ Completed
- 🔄 In Progress
- ⏳ Pending

---

## 1. Database & Infrastructure (Backend - Layer 1)
- ✅ Drop existing MySQL database dan reinit dengan user root:root
- ✅ Buat database media_db di MySQL
- ✅ Install dependencies (mysql2, knex, express-session, multer, TailwindCSS, hashids, joi, nodemailer, bcrypt)
- ✅ Setup dan konfigurasi KnexJS
- ✅ Buat migration untuk table users
- ✅ Buat migration untuk table articles
- ✅ Buat seeder untuk default admin user
- ✅ Run migrations dan seeders

## 2. Utilities & Helpers (Backend - Layer 2)
- ✅ Setup hashids utility untuk encrypt/decrypt ID
- ✅ Setup Joi schemas untuk validasi request
- ✅ Setup nodemailer untuk kirim email
- ✅ Setup express-session untuk authentication
- ✅ Setup folder public/uploads untuk menyimpan images

## 3. Backend Architecture - Layered Structure (Vertical Slice)
**Architecture Flow:** Request → Router → Middleware (Validator) → Service → Repository → Interceptor → Response

### 3.1. Repositories (Data Access Layer)
- ✅ Buat auth repository
- ✅ Buat user repository
- ✅ Buat article repository

### 3.2. Services (Business Logic Layer)
- ✅ Buat auth service (login, logout, check session, change password)
- ✅ Buat user service (create user dengan auto-generate password & email)
- ✅ Buat article service (CRUD operations)

### 3.3. Middleware & Interceptors
- ✅ Buat validator middleware (Joi validation in modules)
- ✅ Buat auth middleware (protect routes)
- ✅ Buat first login middleware (force change password)
- ✅ Buat response interceptor (standardize responses)

### 3.4. API Routes (Presentation Layer)
**Auth Module:**
- ✅ POST /api/auth/login
- ✅ POST /api/auth/logout
- ✅ GET /api/auth/session
- ✅ POST /api/auth/change-password
- ✅ POST /api/auth/forgot-password

**User Module:**
- ✅ POST /api/user/create

**Article Module:**
- ✅ GET /api/article (get latest 6 for homepage)
- ✅ GET /api/article/[id]
- ✅ POST /api/article/create
- ✅ PUT /api/article/[id]
- ✅ DELETE /api/article/[id]
- ✅ POST /api/article/upload

## 7. Frontend Setup (Frontend - Layer 1)
- ✅ Setup project NuxtJS baru
- ⏳ Setup dan konfigurasi TailwindCSS

## 8. Frontend Pages - Public (Frontend - Layer 2)
- ⏳ Buat halaman Home (list 6 article terakhir)
- ⏳ Buat halaman Article detail (dengan hashid di URL)
- ⏳ Buat halaman Login
- ⏳ Buat halaman Force Change Password (untuk first login)

## 9. Frontend Dashboard - Protected (Frontend - Layer 3)
- ⏳ Buat halaman Dashboard dengan list articles
- ⏳ Buat form Create Article di Dashboard
- ⏳ Buat form Edit Article di Dashboard
- ⏳ Implementasi Delete Article di Dashboard
- ⏳ Buat halaman Manage Users di Dashboard
- ⏳ Buat form Create User dengan auto-generate password

---

## Execution Strategy
**Mengerjakan dari backend ke frontend:**
1. Database & Migrations (Data Layer)
2. Utilities & Helpers
3. API Endpoints (Backend Logic)
4. Middleware (Security Layer)
5. Frontend Pages (UI Layer)

**Current Progress:** Backend - Database Setup
