import { requireAuth } from '~/server/shared/authMiddleware';
import { successResponse, errorResponse } from '~/server/shared/response';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * POST /api/upload/image
 * Upload image file
 */
export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    await requireAuth(event);

    // Read form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      return errorResponse('No file uploaded', 400);
    }

    // Get the file from form data
    const file = formData.find(item => item.name === 'file');

    if (!file) {
      return errorResponse('File field is required', 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Only image files (JPEG, PNG, GIF, WebP) are allowed', 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.data.length > maxSize) {
      return errorResponse('File size must not exceed 5MB', 400);
    }

    // Generate unique filename
    const fileExt = path.extname(file.filename || '');
    const randomName = crypto.randomBytes(16).toString('hex');
    const filename = `${randomName}${fileExt}`;

    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Create upload directory if it doesn't exist
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, file.data);

    // Return file URL
    return successResponse({
      filename,
      url: `/uploads/${filename}`,
      size: file.data.length,
      type: file.type
    }, 'File uploaded successfully');

  } catch (error) {
    console.error('[UploadImageRoute] Error:', error);

    if (error.statusCode === 401) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to upload image'
    });
  }
});
