# Environment Setup Guide

## Initial Setup

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd media-promote-smk-web-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy template file
cp .env.example .env

# Edit .env with your actual credentials
nano .env  # or use your preferred editor
```

**IMPORTANT**: Never commit `.env` file to git!

### 4. Generate Security Keys

Generate random strings for security keys:

```bash
# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate HASHIDS_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy hasil generate ke file `.env`:
```env
SESSION_SECRET=<paste-generated-key-here>
HASHIDS_SALT=<paste-generated-key-here>
```

### 5. Setup Database

```bash
# Create database (via MySQL client)
mysql -u root -p
> CREATE DATABASE media_db;
> exit;

# Run migrations
npm run migrate

# Seed default admin user
npm run seed
```

### 6. Setup Email (Development)

Untuk development, gunakan [Ethereal Email](https://ethereal.email):

1. Kunjungi https://ethereal.email
2. Click "Create Ethereal Account"
3. Copy credentials ke `.env`:
```env
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=<ethereal-username>
MAIL_PASSWORD=<ethereal-password>
```

### 7. Start Development Server

```bash
npm run dev
```

Server akan running di `http://localhost:3000`

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `3307` |
| `DB_USER` | Database username | `root` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `media_db` |
| `DEFAULT_ADMIN_EMAIL` | Admin email for seeding | `admin@example.com` |
| `DEFAULT_ADMIN_PASSWORD` | Admin password for seeding | `SecurePass123` |
| `SESSION_SECRET` | Session encryption key | *random 64 char hex* |
| `HASHIDS_SALT` | ID encryption salt | *random 64 char hex* |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BCRYPT_SALT_ROUNDS` | Bcrypt cost factor | `10` |
| `NODE_ENV` | Environment mode | `development` |
| `MAIL_HOST` | SMTP host | - |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USER` | SMTP username | - |
| `MAIL_PASSWORD` | SMTP password | - |
| `MAIL_FROM` | From email address | - |

---

## Security Checklist

### Before First Commit

- ✅ `.env` file is in `.gitignore`
- ✅ `node_modules/` is in `.gitignore`
- ✅ `public/uploads/*` is in `.gitignore`
- ✅ No sensitive data in committed files
- ✅ Generated strong `SESSION_SECRET`
- ✅ Generated strong `HASHIDS_SALT`

### Verify Ignored Files

```bash
# Check what will be committed
git status

# Should NOT see:
# - .env
# - node_modules/
# - .nuxt/
# - public/uploads/*.png
# - *.log files

# Verify specific files are ignored
git check-ignore -v .env
# Should output: .gitignore:12:*.env	.env
```

---

## Production Deployment

### Additional Steps for Production

1. **Change Environment Mode**
```env
NODE_ENV=production
```

2. **Use Strong Passwords**
- Change `DEFAULT_ADMIN_PASSWORD` to strong password
- Use strong database password
- Never use default values in production

3. **Use Production Email Service**
- Replace Ethereal with real SMTP service
- Options: SendGrid, Mailgun, AWS SES

4. **Setup HTTPS**
- Configure SSL/TLS certificates
- Update security headers (uncomment `Strict-Transport-Security`)

5. **Use Redis for Sessions & Rate Limiting**
- Replace in-memory storage
- See `SECURITY.md` for details

6. **Database Security**
- Restrict database access to app server only
- Use separate database user (not root)
- Enable database audit logging

7. **Monitoring**
- Setup error tracking (Sentry, etc.)
- Monitor security logs
- Setup alerts for suspicious activity

---

## Troubleshooting

### "Error: Cannot find module '.env'"
- Make sure `.env` file exists in project root
- Check file permissions: `chmod 600 .env`

### "Database connection failed"
- Verify database credentials in `.env`
- Check if MySQL is running: `systemctl status mysql`
- Check database exists: `SHOW DATABASES;`

### "Session secret required"
- Generate `SESSION_SECRET` using crypto command above
- Add to `.env` file

### "Email not sending"
- Check SMTP credentials
- For development, use Ethereal Email
- Check firewall allows port 587

---

## Team Setup

### For New Team Members

1. **Never commit `.env` file**
2. **Copy `.env.example` to `.env`**
3. **Get credentials from team lead:**
   - Database access
   - Email service credentials
   - Shared secrets (SESSION_SECRET, etc.)
4. **Or generate own local development secrets**

### For Shared Development Database

If team uses shared dev database:
```env
DB_HOST=dev.database.example.com
DB_USER=dev_user
DB_PASSWORD=<get-from-team-lead>
```

### For Local Development Database

Each developer can have their own local database:
```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=<your-local-password>
```

---

## Questions?

- Security: See `SECURITY.md`
- Tasks: See `TASKS.md`
- Issues: Create GitHub issue or contact team lead
