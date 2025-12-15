# Railway Deployment Guide

Panduan lengkap untuk deploy aplikasi Media Promote SMK ke Railway.com

## Prasyarat

- [ ] Akun Railway.com (bisa login dengan GitHub)
- [ ] Git repository di GitHub
- [ ] Code sudah di-push ke GitHub repository

## Langkah 1: Setup Railway Project

### 1.1 Buat Akun Railway
1. Buka https://railway.com
2. Klik **Login** atau **Start a New Project**
3. Login menggunakan akun GitHub Anda
4. Railway akan memberi Anda **$5 free credit** setiap bulan

### 1.2 Buat Project Baru
1. Di Railway dashboard, klik **New Project**
2. Pilih **Deploy MySQL** untuk database

## Langkah 2: Deploy MySQL Database

### 2.1 Create MySQL Service
1. Railway akan otomatis membuat MySQL instance
2. Tunggu hingga deployment selesai (status: Active)
3. Klik pada MySQL service card

### 2.2 Catat Database Credentials
1. Klik tab **Variables**
2. Catat variable berikut (akan digunakan nanti):
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

### 2.3 Connect ke Database (Optional - untuk testing)
```bash
# Gunakan credentials dari Railway
mysql -h <MYSQL_HOST> -P <MYSQL_PORT> -u <MYSQL_USER> -p<MYSQL_PASSWORD> <MYSQL_DATABASE>
```

## Langkah 3: Deploy Nuxt Application

### 3.1 Deploy dari GitHub
1. Masih di project yang sama, klik **New** atau **+**
2. Pilih **Deploy from GitHub repo**
3. Railway akan menampilkan list repository Anda
4. Pilih repository `media-promote-smk-web-app`
5. Railway akan otomatis detect Nuxt.js dan mulai build

### 3.2 Atau Deploy via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

## Langkah 4: Configure Environment Variables

### 4.1 Buka Service Settings
1. Klik pada Nuxt service card
2. Klik tab **Variables**

### 4.2 Tambahkan Environment Variables

Klik **New Variable** dan tambahkan satu per satu:

#### Database Configuration (Reference dari MySQL Service)
```env
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=${{MySQL.MYSQL_DATABASE}}
```

#### Admin User (Ubah sesuai kebutuhan)
```env
DEFAULT_ADMIN_EMAIL=admin@yourdomain.com
DEFAULT_ADMIN_PASSWORD=YourSecurePassword123!
```

#### Security Configuration
```env
BCRYPT_SALT_ROUNDS=10
```

#### Session & Hashids (Generate random string!)
```env
SESSION_SECRET=your-very-long-random-secret-key-min-32-chars
HASHIDS_SALT=your-random-hashids-salt-different-from-session
```

Untuk generate random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Email Configuration
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM="Media Promote SMK <your-email@gmail.com>"
```

**Catatan Gmail App Password:**
1. Buka https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Buka https://myaccount.google.com/apppasswords
4. Generate App Password untuk "Mail"
5. Copy password tersebut ke `MAIL_PASSWORD`

### 4.3 Save Variables
Setelah semua variable ditambahkan, Railway akan otomatis trigger re-deployment.

## Langkah 5: Run Database Migrations

### 5.1 Via Railway CLI (Recommended)
```bash
# Install Railway CLI jika belum
npm install -g @railway/cli

# Login
railway login

# Link ke project
railway link

# Run migrations
railway run npm run migrate

# (Optional) Run seeds untuk default admin
railway run npm run seed
```

### 5.2 Via Railway Dashboard (One-time Command)
1. Klik service Nuxt app
2. Klik tab **Settings**
3. Scroll ke **Deploy**
4. Di **Custom Start Command**, temporary ubah menjadi:
   ```
   npm run migrate && npm run start
   ```
5. Trigger re-deploy
6. Setelah migration berhasil, kembalikan ke `npm run start` saja

### 5.3 Via Deployment Script (Automated)
Update `package.json`:
```json
{
  "scripts": {
    "build": "npm run migrate && nuxt build",
    "start": "node .output/server/index.mjs",
    "migrate": "knex migrate:latest"
  }
}
```

Dengan cara ini, migration akan auto-run setiap deployment.

## Langkah 6: Setup Custom Domain (Optional)

### 6.1 Generate Railway Domain
1. Di Nuxt service, klik tab **Settings**
2. Scroll ke **Networking**
3. Klik **Generate Domain**
4. Railway akan memberikan domain gratis: `your-app.up.railway.app`

### 6.2 Custom Domain
1. Di section yang sama, klik **Custom Domain**
2. Masukkan domain Anda (contoh: `app.yourdomain.com`)
3. Railway akan memberikan CNAME record
4. Tambahkan CNAME record di DNS provider Anda:
   ```
   Type: CNAME
   Name: app
   Value: <provided by Railway>
   ```
5. Tunggu DNS propagation (5-30 menit)

## Langkah 7: Verifikasi Deployment

### 7.1 Check Deployment Status
1. Klik tab **Deployments**
2. Pastikan status: **SUCCESS**
3. Lihat deployment logs untuk memastikan tidak ada error

### 7.2 Check Application Logs
1. Klik tab **Logs**
2. Filter by service jika perlu
3. Pastikan aplikasi running tanpa error

### 7.3 Test Application
1. Buka URL Railway Anda
2. Test login dengan admin credentials yang Anda set
3. Test fitur-fitur utama:
   - [ ] Login/Logout
   - [ ] Dashboard
   - [ ] User management
   - [ ] Media upload
   - [ ] Email notifications

## Troubleshooting

### Build Gagal
```bash
# Check logs di Railway dashboard
# Atau via CLI:
railway logs
```

Common issues:
- Missing dependencies: Check `package.json`
- Build timeout: Contact Railway support
- Memory limit: Upgrade Railway plan

### Database Connection Error
- Pastikan environment variables DB_* sudah benar
- Check reference variables syntax: `${{MySQL.MYSQL_HOST}}`
- Pastikan MySQL service sudah running

### Migration Gagal
```bash
# Check migration files
ls database/migrations/

# Test connection manual
railway run npm run migrate

# Rollback jika perlu
railway run npm run migrate:rollback
```

### Email Tidak Terkirim
- Verify Gmail App Password
- Check MAIL_* environment variables
- Test dengan Ethereal Email untuk development:
  1. Buka https://ethereal.email
  2. Create account
  3. Use provided SMTP credentials

## Monitoring & Maintenance

### View Metrics
1. Klik service
2. Tab **Metrics**
3. Monitor:
   - CPU usage
   - Memory usage
   - Network traffic
   - Response time

### View Logs
```bash
# Via CLI
railway logs

# Follow logs (real-time)
railway logs --follow
```

### Update Application
```bash
# Push ke GitHub
git add .
git commit -m "Update feature"
git push origin main

# Railway akan auto-deploy
```

### Rollback Deployment
1. Tab **Deployments**
2. Pilih deployment yang sukses sebelumnya
3. Klik **Redeploy**

## Database Backup

### Manual Backup
```bash
# Via Railway CLI
railway run mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup.sql
```

### Scheduled Backup (via Cron Job)
Setup cron job di Railway:
1. Create new service: **Cron Job**
2. Add script untuk backup database
3. Schedule: daily/weekly

Atau gunakan external service:
- Railway Backup Plugin (jika available)
- External backup service (BackupNinja, etc.)

## Scaling

### Vertical Scaling (Upgrade Resources)
1. Tab **Settings**
2. Scroll ke **Resources**
3. Adjust:
   - Memory allocation
   - CPU allocation
4. Save changes

### Horizontal Scaling
Railway Pro plan mendukung:
- Multiple replicas
- Load balancing
- Auto-scaling

## Pricing

### Free Tier
- $5 credit/month
- Cukup untuk development
- ~500-1000 requests/day

### Pro Plan ($20/month)
- $20 credit included
- Priority support
- More resources
- Custom metrics

### Usage Estimation
```
MySQL: ~$1-2/month (basic usage)
Nuxt App: ~$3-5/month (low traffic)
Total: ~$5/month (within free tier!)
```

## Security Checklist

- [ ] Environment variables sudah di-set dengan benar
- [ ] SESSION_SECRET dan HASHIDS_SALT adalah random & unique
- [ ] DEFAULT_ADMIN_PASSWORD sudah diganti dari default
- [ ] Gmail App Password (bukan password utama)
- [ ] Database tidak exposed publicly
- [ ] HTTPS enabled (automatic di Railway)
- [ ] File .env tidak ter-commit ke Git
- [ ] Rate limiting enabled
- [ ] XSS protection enabled
- [ ] Helmet security headers enabled

## Helpful Commands

```bash
# Railway CLI
railway login                    # Login to Railway
railway link                     # Link to existing project
railway status                   # Check project status
railway logs                     # View logs
railway run <command>            # Run command in Railway environment
railway open                     # Open project in browser
railway environment              # Manage environments
railway variables                # Manage variables

# Database
railway run npm run migrate      # Run migrations
railway run npm run seed         # Run seeds
railway run npm run migrate:rollback  # Rollback

# Application
railway up                       # Deploy application
railway deploy                   # Alternative deploy command
```

## Resources

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app
- Nuxt Deployment: https://nuxt.com/docs/getting-started/deployment

## Support

Jika mengalami masalah:
1. Check Railway logs
2. Check Railway Status page
3. Join Railway Discord
4. Create issue di GitHub repository
5. Contact Railway support (Pro plan)

---

Happy Deploying! 🚀
