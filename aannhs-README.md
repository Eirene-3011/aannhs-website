# AANNHS Official Website
**Andres A. Nocon National High School**  
Caballero St., Buenavista II, City of General Trias, Cavite  
School ID: 307802 | DepEd Region IV-A CALABARZON

---

## Table of Contents
1. [Tech Stack Overview](#tech-stack-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Production Deployment](#production-deployment)
   - [Step 1 — Database (TiDB Cloud / PlanetScale / Railway MySQL)](#step-1--database)
   - [Step 2 — Cloudinary (File Storage)](#step-2--cloudinary-file-storage)
   - [Step 3 — Backend on Render](#step-3--backend-on-render)
   - [Step 4 — Frontend on Netlify](#step-4--frontend-on-netlify)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Admin Panel Guide](#admin-panel-guide)
7. [Folder Structure](#folder-structure)

---

## Tech Stack Overview

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | React + Vite | Netlify |
| Backend API | Node.js + Express | Render |
| Database | MySQL | TiDB Cloud / Railway / PlanetScale |
| File Storage | Cloudinary | Cloudinary (free tier) |

---

## Prerequisites

Install these on your machine before starting:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher (comes with Node.js)
- [MySQL](https://dev.mysql.com/downloads/) v8+ (for local development only)
- [Git](https://git-scm.com/)

---

## Local Development Setup

### 1. Extract the project

```bash
unzip aannhs-website.zip
cd aannhs-website
```

---

### 2. Database Setup (Local MySQL)

Open your MySQL client and run the two SQL files in order:

```bash
# Create tables and schema
mysql -u root -p < database/schema.sql

# Seed with all AANNHS data
mysql -u root -p < database/seed.sql
```

> **Note:** The database will be created as `aannhs_db`. You can verify with `SHOW DATABASES;` in MySQL.

---

### 3. Backend Setup

```bash
cd backend
```

Copy the example environment file and fill it in:

```bash
cp .env.example .env
```

Edit `.env` with your local values:

```env
PORT=5000

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=aannhs_db

# JWT
JWT_SECRET=any_long_random_string_here

# Admin magic code (used in the login URL)
ADMIN_MAGIC_CODE=307802

# Cloudinary (can skip for local — file uploads will fail without it)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Install dependencies and start the backend:

```bash
npm install
npm start
```

The API server will run at: **http://localhost:5000**

Test it: open http://localhost:5000/api/health — you should see `{ "status": "ok", "app": "AANNHS API" }`

---

### 4. Frontend Setup

Open a **new terminal tab**, then:

```bash
cd frontend
```

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The frontend will run at: **http://localhost:5173**

> The frontend proxies `/api` requests to the backend automatically in dev mode.

---

### 5. Verify Everything Works

1. Open http://localhost:5173 — the homepage should load with AANNHS school info
2. Open http://localhost:5173/admin/login/307802 — the admin login page should appear
3. Log in using an admin account (check `admin_users` table or create one via the backend)

---

## Production Deployment

---

### Step 1 — Database

You need a hosted MySQL database. Recommended free options:

#### Option A: TiDB Cloud (recommended)
1. Go to [tidbcloud.com](https://tidbcloud.com) → create a free Serverless cluster
2. In the cluster dashboard, go to **Connect** → copy the connection string
3. Run the SQL files via their web SQL editor or connect with a MySQL client:
   ```bash
   mysql -u <user> -h <host> -P <port> -p --ssl-mode=REQUIRED < database/schema.sql
   mysql -u <user> -h <host> -P <port> -p --ssl-mode=REQUIRED < database/seed.sql
   ```
4. Note your: `host`, `port`, `user`, `password`, `database name` (aannhs_db)

#### Option B: Railway
1. Go to [railway.app](https://railway.app) → New Project → MySQL
2. Click on the MySQL service → **Variables** tab → copy credentials
3. Use the Railway MySQL GUI or connect via the provided `mysql://` URL to run the SQL files

---

### Step 2 — Cloudinary (File Storage)

All photo/file uploads from the admin panel go to Cloudinary.

1. Sign up free at [cloudinary.com](https://cloudinary.com)
2. From the **Dashboard**, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Save these — you'll need them in the Render environment variables below

---

### Step 3 — Backend on Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repository  
   *(or use **Deploy from existing code** → upload the `backend/` folder)*
3. Configure the service:

   | Setting | Value |
   |---|---|
   | **Name** | `aannhs-api` (or any name) |
   | **Root Directory** | `backend` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node index.js` |
   | **Instance Type** | Free (or Starter for always-on) |

4. Under **Environment Variables**, add all of these:

   | Key | Value |
   |---|---|
   | `PORT` | `10000` *(Render sets this automatically — leave as is)* |
   | `DB_HOST` | Your database host |
   | `DB_PORT` | Your database port (default: `3306`) |
   | `DB_USER` | Your database username |
   | `DB_PASSWORD` | Your database password |
   | `DB_NAME` | `aannhs_db` |
   | `DB_SSL` | `true` *(required for TiDB Cloud / Railway)* |
   | `JWT_SECRET` | A long random string (e.g. `openssl rand -hex 32`) |
   | `ADMIN_MAGIC_CODE` | `307802` |
   | `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
   | `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
   | `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
   | `FRONTEND_URL` | Your Netlify URL (add after Step 4, e.g. `https://aannhs.netlify.app`) |

5. Click **Create Web Service** and wait for the build to finish
6. Copy your Render backend URL — it looks like: `https://aannhs-api.onrender.com`

   > **Test it:** Open `https://aannhs-api.onrender.com/api/health` — should return `{ "status": "ok" }`

   > ⚠️ **Free Render plans spin down after 15 min of inactivity.** The first request after spin-down takes ~30 seconds. Upgrade to Starter ($7/mo) for always-on.

---

### Step 4 — Frontend on Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**
2. First, build the frontend locally:

   ```bash
   cd frontend
   ```

   Create a production `.env` file:

   ```env
   VITE_API_URL=https://aannhs-api.onrender.com
   ```

   Then build:

   ```bash
   npm run build
   ```

   This creates a `frontend/dist/` folder.

3. Drag and drop the **`dist/`** folder into the Netlify deploy area
4. Netlify will give you a URL like `https://random-name.netlify.app`

   **To set a custom name:**
   - Go to **Site configuration** → **Change site name** → set `aannhs` (or your preferred name)

5. Go to **Site configuration** → **Environment variables** → Add:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://aannhs-api.onrender.com` |

6. **Set up redirects** (already included in `frontend/public/_redirects`):
   ```
   /*  /index.html  200
   ```
   This ensures React Router routes work on page refresh.

7. Go back to Render → update `FRONTEND_URL` environment variable with your Netlify URL

---

#### Option: Auto-deploy via GitHub (Netlify)

If you push your code to GitHub, you can connect Netlify for automatic deploys:

1. In Netlify → **Add new site** → **Import an existing project** → connect GitHub
2. Set **Base directory** to `frontend`
3. Set **Build command** to `npm run build`
4. Set **Publish directory** to `frontend/dist`
5. Add the `VITE_API_URL` environment variable

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `DB_HOST` | MySQL host | `localhost` or TiDB/Railway host |
| `DB_PORT` | MySQL port | `3306` or `4000` (TiDB) |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `yourpassword` |
| `DB_NAME` | Database name | `aannhs_db` |
| `DB_SSL` | Enable SSL for DB connection | `true` (production) / `false` (local) |
| `JWT_SECRET` | Secret for signing admin JWTs | Any long random string |
| `ADMIN_MAGIC_CODE` | Code in the admin login URL | `307802` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my-cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123...` |
| `FRONTEND_URL` | Allowed CORS origin | `https://aannhs.netlify.app` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` (local) or `https://aannhs-api.onrender.com` (prod) |

---

## Admin Panel Guide

| Item | Value |
|---|---|
| **Admin Login URL** | `https://your-site.netlify.app/admin/login/307802` |
| **Magic Code in URL** | `307802` — this is part of the URL path, not a form field |
| **localStorage key** | `aannhs_admin_token` |

### Creating Admin Accounts

Run this SQL in your database (replace values as needed):

```sql
-- First hash a password using bcrypt (use a Node script or online bcrypt tool)
-- Then insert:
INSERT INTO admin_users (username, password_hash, full_name, role)
VALUES ('principal', '$2b$10$...bcrypt_hash...', 'Rosalie P. Lujero', 'superadmin');
```

Or create an account through the backend API (if a registration endpoint is enabled).

### What Each Admin Section Does

| Page | URL | Purpose |
|---|---|---|
| Dashboard | `/admin/dashboard` | Overview |
| School Info | `/admin/school-info` | Name, address, logo, motto |
| Banners | `/admin/banners` | Homepage slideshows |
| Staff | `/admin/staff` | Faculty list (Grade 7–10 filters) |
| Committees | `/admin/committees` | SSLG, SPTA BoD, SPTA ExCom |
| Enrollment Stats | `/admin/enrollment-stats` | Grade 7–10 enrollment data |
| FAQs | `/admin/faqs` | Frequently asked questions |
| Contact Messages | `/admin/contact` | View incoming inquiries |
| PPAs | `/admin/ppas` | Programs, Projects & Activities |
| Accomplishments | `/admin/accomplishments` | Awards & recognitions |
| Photos | `/admin/photos` | Gallery |
| Org Chart | `/admin/org-chart` | Upload org chart image |
| School Heads | `/admin/school-heads` | Historical list of principals |
| External Links | `/admin/external-links` | DepEd & Facebook links |

---

## Folder Structure

```
aannhs-website/
├── README.md                  ← This file
├── database/
│   ├── schema.sql             ← Creates all tables (run first)
│   └── seed.sql               ← Seeds AANNHS initial data (run second)
├── backend/
│   ├── .env.example           ← Copy to .env and fill in
│   ├── index.js               ← Express entry point
│   ├── config/
│   │   └── db.js              ← MySQL connection pool
│   ├── middleware/
│   │   ├── auth.js            ← JWT auth middleware
│   │   └── upload.js          ← Cloudinary upload middleware
│   └── routes/
│       └── *.js               ← One file per API resource
└── frontend/
    ├── .env.example           ← Copy to .env and fill in
    ├── index.html
    ├── vite.config.js
    ├── public/
    │   └── _redirects         ← Netlify SPA redirect rule
    └── src/
        ├── App.jsx            ← All routes defined here
        ├── index.css          ← Global CSS variables (Blue/Green theme)
        ├── components/
        │   ├── admin/         ← AdminLayout, RequireAuth
        │   └── public/        ← Header, Footer, Icons
        ├── pages/
        │   ├── admin/         ← All admin panel pages
        │   └── public/        ← All public-facing pages
        └── utils/
            └── api.js         ← Axios instance with auth headers
```

---

## Quick Reference: Deployment Checklist

- [ ] MySQL database created and both SQL files executed
- [ ] Cloudinary account created, cloud name/key/secret noted
- [ ] Backend deployed to Render with all environment variables set
- [ ] Backend health check returns `{ "status": "ok" }` at `/api/health`
- [ ] Frontend `.env` updated with Render backend URL
- [ ] Frontend built (`npm run build`) and `dist/` folder uploaded to Netlify
- [ ] Netlify site name customized (optional)
- [ ] Render `FRONTEND_URL` updated with Netlify URL (for CORS)
- [ ] Admin login tested at `/admin/login/307802`

---

*Generated for AANNHS — School ID 307802 | DepEd Region IV-A CALABARZON*
