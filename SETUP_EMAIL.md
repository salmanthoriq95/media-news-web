# Setup Email dengan Gmail

Aplikasi ini menggunakan Gmail untuk mengirim email ke user baru. Ikuti langkah-langkah berikut untuk setup:

## 1. Aktifkan 2-Step Verification di Gmail

1. Buka [Google Account Security](https://myaccount.google.com/security)
2. Di bagian "Signing in to Google", klik **2-Step Verification**
3. Ikuti instruksi untuk mengaktifkan 2-Step Verification

## 2. Buat App Password

1. Setelah 2-Step Verification aktif, kembali ke [Google Account Security](https://myaccount.google.com/security)
2. Di bagian "Signing in to Google", klik **App passwords**
3. Jika tidak melihat option "App passwords", pastikan 2-Step Verification sudah aktif
4. Pilih app: **Mail**
5. Pilih device: **Other (Custom name)**
6. Masukkan nama: **Media Promote App**
7. Klik **Generate**
8. Google akan memberikan **16-digit password** (contoh: `abcd efgh ijkl mnop`)
9. **SIMPAN password ini** - Anda akan memasukkannya di file `.env`

## 3. Update File `.env`

Edit file `.env` di root project dan update bagian email:

```env
# Email Configuration (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
MAIL_FROM="Media Promote <your-email@gmail.com>"
```

Ganti:
- `your-email@gmail.com` dengan email Gmail Anda
- `abcd efgh ijkl mnop` dengan App Password yang Anda dapatkan (hapus spasi, jadi: `abcdefghijklmnop`)

## 4. Restart Server

Setelah update `.env`, restart development server:

```bash
npm run dev
```

## 5. Testing

Untuk test email, buat user baru di halaman `/admin/users`:

1. Login sebagai admin
2. Buka halaman **Users**
3. Klik **Tambah User**
4. Masukkan nama dan email
5. Klik **Simpan**
6. Email akan dikirim ke user dengan credentials login

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

- Pastikan 2-Step Verification sudah aktif
- Pastikan menggunakan **App Password**, bukan password Gmail biasa
- Pastikan tidak ada spasi di App Password

### Error: "Connection timeout"

- Pastikan `MAIL_PORT=587` (bukan 465)
- Cek koneksi internet Anda

### Error: "self signed certificate"

- Sudah di-handle di kode dengan `tls.rejectUnauthorized = false`
- Jika masih error, coba gunakan port 465 dengan `secure: true`

## Alternatif: Ethereal Email (Development Only)

Jika Anda hanya ingin testing tanpa email asli, gunakan [Ethereal](https://ethereal.email/):

1. Buka https://ethereal.email/create
2. Copy credentials yang diberikan
3. Update `.env`:

```env
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=<username-dari-ethereal>
MAIL_PASSWORD=<password-dari-ethereal>
MAIL_FROM=noreply@admin.com
```

Email tidak akan terkirim ke user asli, tapi Anda bisa preview di Ethereal inbox.

## Keamanan

- **JANGAN** commit file `.env` ke git
- File `.env` sudah ada di `.gitignore`
- App Password berbeda dengan password Gmail Anda
- App Password bisa di-revoke kapan saja di Google Account
