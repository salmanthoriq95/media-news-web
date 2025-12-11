/**
 * Response Interceptor - Standardize API responses
 */

export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

export const errorResponse = (message = 'Error occurred', statusCode = 500) => {
  throw createError({
    statusCode,
    message
  });
};

export const validationErrorResponse = (errors) => {
  throw createError({
    statusCode: 400,
    message: errors
  });
};

export const unauthorizedResponse = (message = 'Unauthorized') => {
  throw createError({
    statusCode: 401,
    message
  });
};

export const notFoundResponse = (message = 'Not found') => {
  throw createError({
    statusCode: 404,
    message
  });
};
