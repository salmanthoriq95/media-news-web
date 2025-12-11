import validator from 'validator';

/**
 * Security Middleware
 * Input sanitization dan validasi untuk mencegah XSS, injection attacks
 */

/**
 * Sanitize string input untuk mencegah XSS
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;

  // Escape HTML entities
  return validator.escape(str);
}

/**
 * Sanitize object secara rekursif
 */
export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Note: Sanitize body dilakukan di validator setiap module
 * Tidak perlu middleware global karena bisa break multipart form data
 */

/**
 * Validasi email untuk mencegah email injection
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;

  // Validasi format email
  if (!validator.isEmail(email)) return false;

  // Cek panjang maksimal
  if (email.length > 255) return false;

  // Cek karakter berbahaya
  const dangerousChars = /[<>\"'`;()]/;
  if (dangerousChars.test(email)) return false;

  return true;
}

/**
 * Validasi nama file untuk upload
 */
export function isValidFilename(filename) {
  if (!filename || typeof filename !== 'string') return false;

  // Cek path traversal attacks
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return false;
  }

  // Cek karakter berbahaya
  const dangerousChars = /[<>\"'`;()&|$]/;
  if (dangerousChars.test(filename)) return false;

  return true;
}

/**
 * Validasi password strength
 */
export function isStrongPassword(password) {
  if (!password || typeof password !== 'string') return false;

  // Minimal 8 karakter
  if (password.length < 8) return false;

  // Maksimal 128 karakter (prevent DoS via bcrypt)
  if (password.length > 128) return false;

  // Harus ada huruf dan angka
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
}

/**
 * Prevent NoSQL injection untuk MongoDB (jika nanti migrasi)
 */
export function sanitizeNoSQL(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const sanitized = {};

  for (const key in obj) {
    // Block operator keys
    if (key.startsWith('$')) continue;

    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeNoSQL(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
