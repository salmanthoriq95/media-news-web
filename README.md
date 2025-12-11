# Media Promote SMK Web App

Web application untuk promosi media SMK dengan sistem manajemen artikel dan autentikasi.

## Features

### 🔐 Authentication System
- User login dan logout
- Session management
- Password change (forced on first login)
- Password recovery via email

### 📝 Article Management
- Create, Read, Update, Delete articles
- Image upload untuk artikel
- Article listing dengan preview
- Detail artikel dengan konten lengkap

### 👥 User Management
- Create new users (admin only)
- Auto-generated password
- Email notification ke user baru

## Tech Stack

- **Framework**: Nuxt.js 4.2.2 (Vue 3)
- **Database**: MySQL dengan Knex.js
- **Authentication**: bcrypt + express-session
- **Validation**: Joi
- **Email**: Nodemailer
- **File Upload**: Multer
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd media-promote-smk-web-app
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
```

4. Generate security keys
```bash
# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate HASHIDS_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Setup database
```bash
# Create database
mysql -u root -p
> CREATE DATABASE media_db;
> exit;

# Run migrations
npm run migrate

# Seed admin user
npm run seed
```

6. Start development server
```bash
npm run dev
```

Server akan running di `http://localhost:3000`

## Project Structure

```
.
├── database/
│   ├── migrations/     # Database schema migrations
│   └── seeds/          # Database seeders
├── server/
│   ├── api/           # API routes
│   ├── modules/       # Business logic (auth, user, article)
│   ├── security/      # Security utilities
│   ├── shared/        # Shared middleware
│   ├── plugins/       # Server plugins
│   └── utils/         # Server utilities
├── public/
│   └── uploads/       # User uploaded files
├── utils/             # Client utilities
└── .env.example       # Environment template

```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Check session
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset

### User Management
- `POST /api/user/create` - Create new user (admin only)

### Articles
- `GET /api/article` - List latest articles
- `GET /api/article/:id` - Get article detail
- `POST /api/article/create` - Create article (authenticated)
- `PUT /api/article/:id` - Update article (authenticated)
- `DELETE /api/article/:id` - Delete article (authenticated)
- `POST /api/article/upload` - Upload article image (authenticated)

## Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run migrate          # Run migrations
npm run migrate:rollback # Rollback last migration
npm run migrate:make     # Create new migration
npm run seed             # Run seeders
npm run seed:make        # Create new seeder

# Production
npm run build            # Build for production
npm run preview          # Preview production build
```

## Environment Variables

See `.env.example` for all available configuration options.

Required variables:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Database connection
- `DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PASSWORD` - Default admin credentials
- `SESSION_SECRET` - Session encryption key
- `HASHIDS_SALT` - ID obfuscation salt

Optional variables:
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD` - Email configuration
- `BCRYPT_SALT_ROUNDS` - Password hashing cost (default: 10)

## Security

This application implements various security measures:
- Input validation and sanitization
- Password hashing with bcrypt
- Session management with secure cookies
- Rate limiting on sensitive endpoints
- File upload validation
- SQL injection prevention
- XSS protection
- CSRF protection

For more details, see internal security documentation.

## Development Guide

### Adding New Migrations

```bash
npm run migrate:make migration_name
# Edit file di database/migrations/
npm run migrate
```

### Adding New Seeder

```bash
npm run seed:make seeder_name
# Edit file di database/seeds/
npm run seed
```

### Module Structure

Setiap module mengikuti pattern:
```
modules/[name]/
├── repository.js  # Data access layer
├── service.js     # Business logic
└── validators.js  # Input validation
```

## Contributing

1. Create feature branch (`git checkout -b feat/amazing-feature`)
2. Commit dengan conventional commit format
3. Push ke branch (`git push origin feat/amazing-feature`)
4. Create Pull Request

### Conventional Commit Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, chore, security, refactor, test
```

Examples:
- `feat(auth): add two-factor authentication`
- `fix(article): resolve image upload bug`
- `docs: update API documentation`

## License

[Your License Here]

## Contact

[Your Contact Information]
