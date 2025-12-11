/**
 * Security Plugin
 * Setup security headers dan error handling
 */

export default defineNitroPlugin((nitroApp) => {
  // Global error handler - hide stack traces in production
  nitroApp.hooks.hook('error', (error, { event }) => {
    // Log error untuk debugging (jangan log ke client)
    console.error('[Security] Error caught:', {
      message: error.message,
      statusCode: error.statusCode,
      url: event.node.req.url,
      method: event.node.req.method,
      timestamp: new Date().toISOString()
    });

    // Jangan ekspos stack trace ke client di production
    if (process.env.NODE_ENV === 'production') {
      delete error.stack;
    }
  });

  // Tambahkan security headers di setiap response
  nitroApp.hooks.hook('beforeResponse', (event, { body }) => {
    const headers = event.node.res;

    // Content Security Policy
    headers.setHeader('Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self';"
    );

    // Prevent clickjacking
    headers.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME type sniffing
    headers.setHeader('X-Content-Type-Options', 'nosniff');

    // XSS Protection (legacy browsers)
    headers.setHeader('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    headers.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy (formerly Feature Policy)
    headers.setHeader('Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=()'
    );

    // Remove X-Powered-By header (hide tech stack)
    headers.removeHeader('X-Powered-By');

    // Strict Transport Security (HTTPS only - uncomment jika sudah production dengan HTTPS)
    // headers.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  });

  // Log suspicious activities
  nitroApp.hooks.hook('request', (event) => {
    const req = event.node.req;
    const suspiciousPatterns = [
      /\.\.\//,  // Path traversal
      /<script>/i,  // XSS attempt
      /union.*select/i,  // SQL injection
      /eval\(/,  // Code injection
      /javascript:/i,  // JavaScript protocol
    ];

    const url = req.url || '';
    const userAgent = req.headers['user-agent'] || '';

    // Check for suspicious patterns
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(url) || pattern.test(userAgent)) {
        console.warn('[Security] Suspicious request detected:', {
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          url: url,
          method: req.method,
          userAgent: userAgent,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Detect common scanner/bot user agents
    const scannerPatterns = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /masscan/i,
      /acunetix/i,
      /netsparker/i,
      /burpsuite/i,
    ];

    scannerPatterns.forEach(pattern => {
      if (pattern.test(userAgent)) {
        console.warn('[Security] Security scanner detected:', {
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          userAgent: userAgent,
          url: url,
          timestamp: new Date().toISOString()
        });
      }
    });
  });
});
