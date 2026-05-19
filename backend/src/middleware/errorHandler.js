/**
 * Error handling middleware + custom error classes
 */

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

export class ValidationError extends AppError {
  constructor(message) { super(message, 400) }
}

export class AuthError extends AppError {
  constructor(message = 'Unauthorized') { super(message, 401) }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') { super(`${resource} not found`, 404) }
}

export class RateLimitError extends AppError {
  constructor() { super('Too many requests, slow down', 429) }
}

export function notFound(req, res, next) {
  next(new NotFoundError(`Route ${req.originalUrl}`))
}

export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal server error'

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${statusCode} ${req.method} ${req.path}: ${err.message}`)
    if (!err.isOperational) console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
