// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      error: 'Duplicate entry',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};

// Request sanitization middleware
export const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  if (req.params) {
    Object.keys(req.params).forEach((key) => {
      if (typeof req.params[key] === 'string') {
        req.params[key] = req.params[key].trim().toLowerCase();
      }
    });
  }

  next();
};

// Rate limiting middleware (simple in-memory implementation)
const requestCounts = new Map();

export const rateLimit = (maxRequests = 30, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, []);
    }

    const requests = requestCounts.get(ip);

    // Remove requests outside the window
    const validRequests = requests.filter((time) => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      });
    }

    validRequests.push(now);
    requestCounts.set(ip, validRequests);

    next();
  };
};

// Async error wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default {
  errorHandler,
  sanitizeInput,
  rateLimit,
  asyncHandler,
};
