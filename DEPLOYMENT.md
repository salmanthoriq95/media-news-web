# Deployment Guide - Vercel + PlanetScale

Panduan lengkap untuk deploy aplikasi Media Promote ke production menggunakan Vercel (untuk Nuxt.js) dan PlanetScale (untuk MySQL).

## 📋 Prerequisites

- Akun GitHub (sudah ada)
- Repository sudah di-push ke GitHub
- Akun Vercel (gratis)
- Akun PlanetScale (gratis)

---

## 🗄️ Part 1: Setup PlanetScale Database

### 1. Buat Akun PlanetScale

1. Buka https://planetscale.com
2. Klik **"Sign up"** atau **"Get Started"**
3. Sign up dengan GitHub account kamu
4. Verifikasi email jika diminta

### 2. Create Database

1. Di dashboard PlanetScale, klik **"Create a database"**
2. Isi form:
   - **Name**: `media-promote-db` (atau nama lain)
   - **Region**: Pilih yang terdekat (contoh: `ap-southeast` untuk Asia)
   - **Plan**: Pilih **"Hobby"** (gratis, 5GB storage)
3. Klik **"Create database"**
4. Tunggu beberapa detik sampai database ready

### 3. Create Branch (Production)

PlanetScale menggunakan sistem branching seperti Git:

1. Database akan otomatis punya branch `main`
2. Klik **"main"** branch
3. Klik **"Connect"**
4. Pilih **"Connect with"**: `@planetscale/database` (untuk Node.js)
5. Klik **"Create password"**
6. **PENTING**: Copy semua credentials yang muncul:
   ```
   HOST: aws.connect.psdb.cloud
   USERNAME: xxxxxxxxx
   PASSWORD: pscale_pw_xxxxxxxxx
   DATABASE: media-promote-db
   ```
   ⚠️ **Password hanya muncul 1x, simpan di tempat aman!**

### 4. Run Migrations di PlanetScale

PlanetScale tidak support foreign keys secara default, jadi kita perlu update migrations.

**Option A: Menggunakan PlanetScale CLI (Recommended)**

Install PlanetScale CLI:
```bash
# macOS
brew install planetscale/tap/pscale

# Linux
curl -fsSL https://raw.githubusercontent.com/planetscale/cli/main/install.sh | sh

# Windows (via scoop)
scoop install pscale
```

Login dan connect:
```bash
# Login
pscale auth login

# Connect to database
pscale connect media-promote-db main --port 3309

# Di terminal baru, run migrations
npx knex migrate:latest --env production

# Run seeds (optional)
npx knex seed:run --env production
```

**Option B: Menggunakan Connection String**

Update `knexfile.js` untuk production:
```javascript
production: {
  client: 'mysql2',
  connection: {
    host: process.env.PLANETSCALE_HOST,
    user: process.env.PLANETSCALE_USER,
    password: process.env.PLANETSCALE_PASSWORD,
    database: process.env.PLANETSCALE_DATABASE,
    ssl: {
      rejectUnauthorized: true
    }
  },
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
}
```

Set environment variables locally:
```bash
export PLANETSCALE_HOST="aws.connect.psdb.cloud"
export PLANETSCALE_USER="your_username"
export PLANETSCALE_PASSWORD="pscale_pw_xxxxxxxxx"
export PLANETSCALE_DATABASE="media-promote-db"
```

Run migrations:
```bash
npx knex migrate:latest --env production
npx knex seed:run --env production
```

### 5. Promote to Production (Important!)

Setelah migrations selesai:

1. Di PlanetScale dashboard, buka database
2. Klik tab **"Branches"**
3. Pada branch `main`, klik **"Promote to production"**
4. Confirm promosi
5. Ini akan enable automatic backups dan safe migrations

---

## 🚀 Part 2: Deploy ke Vercel

### 1. Prepare Project untuk Vercel

Buat file `vercel.json` di root project:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NUXT_PUBLIC_API_BASE": "/api"
  }
}
```

### 2. Update nuxt.config.ts

Pastikan config sudah production-ready:

```javascript
export default defineNuxtConfig({
  // ... existing config

  nitro: {
    preset: 'vercel',
    serveStatic: true
  },

  // Runtime config
  runtimeConfig: {
    // Private (server-only)
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    sessionSecret: process.env.SESSION_SECRET,
    hashidsSalt: process.env.HASHIDS_SALT,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailFrom: process.env.MAIL_FROM,

    // Public (exposed to client)
    public: {
      apiBase: '/api'
    }
  }
})
```

### 3. Push ke GitHub

```bash
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin master
```

### 4. Deploy di Vercel

1. Buka https://vercel.com
2. Klik **"Sign Up"** dengan GitHub
3. Klik **"Add New Project"**
4. Import repository `media-promote-smk-web-app`
5. Configure Project:
   - **Framework Preset**: Nuxt.js (auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `.output/public` (auto)

### 5. Set Environment Variables di Vercel

Di halaman project configuration, klik **"Environment Variables"** dan tambahkan:

```bash
# Database (PlanetScale)
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_USER=your_planetscale_username
DB_PASSWORD=pscale_pw_xxxxxxxxx
DB_NAME=media-promote-db

# Admin Default
DEFAULT_ADMIN_EMAIL=admin@admin.com
DEFAULT_ADMIN_PASSWORD=admin

# Security
BCRYPT_SALT_ROUNDS=10
SESSION_SECRET=your-very-secret-key-min-32-chars-long-change-this
HASHIDS_SALT=your-hashids-salt-change-this

# Email (Gmail or Ethereal)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM="Media Promote <your-email@gmail.com>"
```

**IMPORTANT**:
- Generate secret yang aman untuk `SESSION_SECRET` dan `HASHIDS_SALT`
- Bisa pakai command: `openssl rand -base64 32`
- Jangan pakai value yang sama dengan development!

### 6. Deploy!

1. Klik **"Deploy"**
2. Tunggu 2-5 menit
3. Vercel akan build dan deploy aplikasi
4. Setelah selesai, kamu akan dapat URL: `https://your-app.vercel.app`

---

## ✅ Verification

### 1. Test Database Connection

Buka URL Vercel kamu, lalu coba:
- Login dengan admin credentials
- Buat artikel baru
- Upload gambar
- Buat user baru

### 2. Check Logs

Di Vercel dashboard:
- Klik **"Deployments"**
- Klik deployment terbaru
- Klik **"Runtime Logs"** untuk lihat error (jika ada)

### 3. Monitor Database

Di PlanetScale dashboard:
- Klik **"Insights"** untuk lihat query performance
- Cek storage usage
- Monitor connection count

---

## 🔧 Troubleshooting

### Error: "Unable to connect to database"

**Solusi:**
1. Cek environment variables di Vercel sudah benar
2. Pastikan PlanetScale credentials valid
3. Verifikasi database branch sudah promoted to production
4. Cek PlanetScale firewall settings (allow all IPs untuk Hobby plan)

### Error: "SSL connection error"

**Solusi:**
Update `server/utils/db.js`:
```javascript
connection: {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
}
```

### Error: "Foreign key constraint fails"

**Solusi:**
PlanetScale tidak support foreign keys. Update migrations untuk remove foreign keys atau pakai `SET FOREIGN_KEY_CHECKS=0;`

### Images tidak muncul setelah deploy

**Masalah:** Uploaded images disimpan di filesystem, tapi Vercel adalah serverless (ephemeral filesystem)

**Solusi:** Pakai cloud storage (akan saya jelaskan di bagian terpisah jika diperlukan):
- Cloudinary (gratis)
- AWS S3
- Vercel Blob Storage

---

## 🔄 Updates & Redeploy

Setiap kali push ke GitHub, Vercel akan otomatis redeploy:

```bash
git add .
git commit -m "feat: add new feature"
git push origin master
```

Vercel akan:
1. Detect push
2. Build ulang
3. Deploy otomatis
4. Update URL production

---

## 💰 Costs (Free Tier Limits)

**Vercel Free:**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless function execution: 100GB-hours

**PlanetScale Hobby:**
- 5GB storage
- 1 billion row reads/month
- 10 million row writes/month
- 1 production branch
- 1 development branch

---

## 📝 Next Steps (Optional)

1. **Custom Domain**: Add domain kamu sendiri di Vercel
2. **Image Storage**: Setup Cloudinary untuk image uploads
3. **Email**: Setup SMTP production (Gmail App Password atau SendGrid)
4. **Monitoring**: Setup Sentry untuk error tracking
5. **Analytics**: Add Google Analytics atau Vercel Analytics

---

## 🆘 Need Help?

Jika ada masalah:
1. Check Vercel Runtime Logs
2. Check PlanetScale Insights
3. Lihat error message di browser console
4. Tanya di dokumentasi ini atau ke saya

Good luck dengan deployment! 🚀
