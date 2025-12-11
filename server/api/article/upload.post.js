import { readMultipartFormData } from 'h3';
import { join, basename } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { checkFirstLogin } from '~/server/shared/authMiddleware';
import { successResponse } from '~/server/shared/response';
import { isValidFilename } from '../../security/security.js';
import { uploadLimiter } from '../../security/rateLimiter.js';

// Magic numbers untuk validasi file type berdasarkan content
const FILE_SIGNATURES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46]
};

// Maksimal file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Validate file content berdasarkan magic numbers
 */
function validateFileSignature(buffer, mimeType) {
  const signature = FILE_SIGNATURES[mimeType];
  if (!signature) return false;

  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) {
      // Special case untuk WebP (check WEBP di offset 8)
      if (mimeType === 'image/webp' && i === 0) {
        return buffer[8] === 0x57 && buffer[9] === 0x45 &&
               buffer[10] === 0x42 && buffer[11] === 0x50;
      }
      return false;
    }
  }
  return true;
}

/**
 * POST /api/article/upload
 * Router: Upload image endpoint dengan enhanced security
 * Flow: Request → Rate Limiter → Auth Middleware → File Upload → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 0. Apply rate limiting
    await uploadLimiter(event);

    // 1. Check authentication & first login (Middleware)
    await checkFirstLogin(event);

    // 2. Read multipart form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Tidak ada file yang diupload'
      });
    }

    // 3. Get file from form data
    const file = formData.find(item => item.name === 'image');

    if (!file) {
      throw createError({
        statusCode: 400,
        message: 'Field "image" tidak ditemukan'
      });
    }

    // 4. Security: Validate file size
    if (!file.data || file.data.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'File kosong'
      });
    }

    if (file.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        message: 'Ukuran file terlalu besar. Maksimal 5MB'
      });
    }

    // 5. Security: Validate file type by MIME
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'Tipe file tidak diizinkan. Hanya JPEG, PNG, dan WebP yang diperbolehkan'
      });
    }

    // 6. Security: Validate file content (magic numbers)
    const isValidContent = validateFileSignature(file.data, file.type === 'image/jpg' ? 'image/jpeg' : file.type);
    if (!isValidContent) {
      throw createError({
        statusCode: 400,
        message: 'File tidak valid. Konten file tidak sesuai dengan ekstensi'
      });
    }

    // 7. Security: Sanitize filename (prevent path traversal)
    const originalFilename = basename(file.filename || 'image.jpg');
    if (!isValidFilename(originalFilename)) {
      throw createError({
        statusCode: 400,
        message: 'Nama file tidak valid'
      });
    }

    // 8. Generate unique & safe filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalFilename.split('.').pop().toLowerCase();

    // Whitelist extension
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    if (!allowedExtensions.includes(extension)) {
      throw createError({
        statusCode: 400,
        message: 'Ekstensi file tidak diizinkan'
      });
    }

    const newFilename = `${timestamp}-${randomString}.${extension}`;

    // 9. Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // 10. Save file
    const filePath = join(uploadDir, newFilename);
    await writeFile(filePath, file.data);

    // 11. Return response with file URL
    const fileUrl = `/uploads/${newFilename}`;

    return successResponse({ url: fileUrl }, 'File berhasil diupload');
  } catch (error) {
    console.error('[UploadImageRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengupload file'
    });
  }
});
