# AANNHS Official Website

**Andres A. Nocon National High School**  
Caballero St., Buenavista II, City of General Trias, Cavite  
School ID: 307802 | Region IV-A CALABARZON

---

## Tech Stack

- **Frontend:** React + Vite (deployed to Netlify or similar static host)
- **Backend:** Node.js + Express (deployed to Render or similar)
- **Database:** MySQL / TiDB Cloud
- **File Storage:** Cloudinary

---

## Quick Start

### 1. Database Setup
```bash
# Create the database and tables
mysql -u root -p < database/schema.sql

# Seed initial AANNHS data
mysql -u root -p < database/seed.sql
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Fill in your DB credentials, Cloudinary keys, and JWT secret
npm install
npm start
```

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL to your backend URL (for production)
npm install
npm run dev
```

---

## Admin Panel

- **Login URL:** `http://your-domain.com/admin/login/307802`
- **Magic code:** `307802` (set `ADMIN_MAGIC_CODE` in backend `.env` — change before deploying!)
- 4 admin accounts needed (see school admin list)

---

## Deployment

### Frontend (Netlify)
```bash
cd frontend
npm run build
# Deploy the `dist/` folder to Netlify
```

### Backend (Render / Railway)
- Set all environment variables from `.env.example`
- Start command: `node index.js`

---

## School Information
- **Principal:** Rosalie P. Lujero, PhD. (Principal I)
- **Email:** 307802@deped.gov.ph
- **Phone:** (046) 432-0252
- **Facebook:** https://www.facebook.com/DepEdTayoAANNHS307802
- **Motto:** "Raising Character, Reaching Excellence"

## Content Managers
- Rosalie P. Lujero
- Kathleen L. Papa
- Donna Charize T. Ayon
- Gwen Denisse L. Dimapilis
