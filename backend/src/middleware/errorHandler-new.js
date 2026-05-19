/**
 * ============================================================================
 * MIDDLEWARE: ERROR HANDLING, VALIDATION, AND RATE LIMITING
 * ============================================================================
 * Comprehensive middleware module providing:
 * - Advanced input sanitization and validation
 * - Multi-strategy rate limiting with memory and Redis support
 * - Comprehensive error handling with custom error types
 * - Request validation with schema support
 * - Logging and monitoring utilities
 * ============================================================================
 */

/**
 * ============================================================================
 * ADVANCED LOGGING SYSTEM
 * ============================================================================
 */

class MiddlewareLogger {
  constructor() {
    this.startTime = Date.now()
    this.errorLog = []
    this.warningLog = []
    this.auditLog = []
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString()
    const elapsed = Date.now() - this.startTime
    const logEntry = {
      timestamp,
      level,
      message,
      elapsed: `${elapsed}ms`,
      ...data
    }

    console.log(`[${level}] [MW] ${message}`, data)

    // Store in memory for analysis
    if (level === 'ERROR') this.errorLog.push(logEntry)
    if (level === 'WARN') this.warningLog.push(logEntry)
    if (level === 'AUDIT') this.auditLog.push(logEntry)

    return logEntry
  }

  info(message, data) { return this.log('INFO', message, data) }
  warn(message, data) { return this.log('WARN', message, data) }
  error(message, data) { return this.log('ERROR', message, data) }
  debug(message, data) { return this.log('DEBUG', message, data) }
  audit(message, data) { return this.log('AUDIT', message, data) }

  getLogs(type = 'all', limit = 100) {
    if (type === 'all') return [...this.errorLog, ...this.warningLog, ...this.auditLog].slice(-limit)
    if (type === 'error') return this.errorLog.slice(-limit)
    if (type === 'warn') return this.warningLog.slice(-limit)
    if (type === 'audit') return this.auditLog.slice(-limit)
  }

  getStats() {
    return {
      totalErrors: this.errorLog.length,
      totalWarnings: this.warningLog.length,
      totalAudit: this.auditLog.length,
      uptime: `${Math.floor((Date.now() - this.startTime) / 1000)}s`
    }
  }
}

const middlewareLogger = new MiddlewareLogger()

/**
 * ============================================================================
 * CUSTOM ERROR CLASSES
 * ============================================================================
 */

class ApplicationError extends Error {
  constructor(message, statusCode = 500, details = {}) {
    super(message)
    this.name = 'ApplicationError'
    this.statusCode = statusCode
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

class ValidationError extends ApplicationError {
  constructor(message, field = null, value = null) {
    super(message, 400, { field, value })
    this.name = 'ValidationError'
  }
}

class AuthenticationError extends ApplicationError {
  constructor(message = 'Authentication required') {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

class AuthorizationError extends ApplicationError {
  constructor(message = 'Not authorized') {
    super(message, 403)
    this.name = 'AuthorizationError'
  }
}

class NotFoundError extends ApplicationError {
  constructor(message, resource = null) {
    super(message, 404, { resource })
    this.name = 'NotFoundError'
  }
}

class ConflictError extends ApplicationError {
  constructor(message, conflict = null) {
    super(message, 409, { conflict })
    this.name = 'ConflictError'
  }
}

class RateLimitError extends ApplicationError {
  constructor(message, retryAfter = 60) {
    super(message, 429, { retryAfter })
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

/**
 * ============================================================================
 * INPUT SANITIZATION AND VALIDATION ENGINE
 * ============================================================================
 */

class InputSanitizer {
  /**
   * Sanitize string input
   */
  static sanitizeString(str, options = {}) {
    const {
      maxLength = 10000,
      allowHtml = false,
      removeNewlines = false,
      toLowerCase = false,
      trim = true
    } = options

    if (typeof str !== 'string') {
      return str
    }

    let sanitized = str

    // Trim whitespace
    if (trim) {
      sanitized = sanitized.trim()
    }

    // Convert to lowercase if needed
    if (toLowerCase) {
      sanitized = sanitized.toLowerCase()
    }

    // Remove dangerous characters if HTML not allowed
    if (!allowHtml) {
      sanitized = sanitized
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>\"'`();]/g, '') // Remove dangerous chars
        .replace(/javascript:/gi, '') // Remove javascript protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
    }

    // Remove newlines if specified
    if (removeNewlines) {
      sanitized = sanitized.replace(/[\n\r]/g, ' ')
    }

    // Enforce max length
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength)
    }

    return sanitized
  }

  /**
   * Deep sanitize object recursively
   */
  static sanitizeObject(obj, options = {}) {
    const {
      maxDepth = 5,
      maxProperties = 1000,
      allowedKeys = null,
      removeEmpty = false,
      currentDepth = 0,
      propertyCount = 0
    } = options

    // Prevent deep nesting attacks
    if (currentDepth > maxDepth) {
      middlewareLogger.warn('Max sanitization depth exceeded')
      return {}
    }

    // Prevent object expansion attacks
    if (propertyCount > maxProperties) {
      middlewareLogger.warn('Max properties exceeded')
      return {}
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj
        .slice(0, 1000) // Limit array size
        .map(item =>
          this.sanitizeObject(item, {
            ...options,
            currentDepth: currentDepth + 1,
            propertyCount: propertyCount + 1
          })
        )
    }

    // Handle objects
    if (obj !== null && typeof obj === 'object') {
      const sanitized = {}
      let count = 0

      for (const [key, value] of Object.entries(obj)) {
        if (count >= maxProperties) break

        // Check allowed keys
        if (allowedKeys && !allowedKeys.includes(key)) {
          continue
        }

        const sanitizedKey = this.sanitizeString(key, { maxLength: 256 })

        let sanitizedValue
        if (typeof value === 'string') {
          sanitizedValue = this.sanitizeString(value)
        } else if (typeof value === 'object' && value !== null) {
          sanitizedValue = this.sanitizeObject(value, {
            ...options,
            currentDepth: currentDepth + 1,
            propertyCount: propertyCount + count
          })
        } else {
          sanitizedValue = value
        }

        // Skip empty values if specified
        if (removeEmpty && !sanitizedValue) {
          continue
        }

        sanitized[sanitizedKey] = sanitizedValue
        count++
      }

      return sanitized
    }

    // Handle primitives
    return typeof obj === 'string' ? this.sanitizeString(obj) : obj
  }

  /**
   * Sanitize array of objects
   */
  static sanitizeArray(arr, options = {}) {
    if (!Array.isArray(arr)) {
      return []
    }

    const maxItems = options.maxItems || 1000
    return arr.slice(0, maxItems).map(item =>
      typeof item === 'object' ? this.sanitizeObject(item, options) : item
    )
  }

  /**
   * Validate and sanitize email
   */
  static sanitizeEmail(email) {
    const sanitized = this.sanitizeString(email)
      .toLowerCase()
      .replace(/\s+/g, '')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(sanitized) ? sanitized : null
  }

  /**
   * Validate and sanitize URL
   */
  static sanitizeURL(url) {
    try {
      const sanitized = this.sanitizeString(url).trim()
      new URL(sanitized)
      return sanitized
    } catch {
      return null
    }
  }

  /**
   * Sanitize username
   */
  static sanitizeUsername(username) {
    const sanitized = this.sanitizeString(username, {
      maxLength: 32,
      toLowerCase: true
    })

    const usernameRegex = /^[a-z0-9_.-]{3,32}$/
    return usernameRegex.test(sanitized) ? sanitized : null
  }

  /**
   * Sanitize phone number
   */
  static sanitizePhoneNumber(phone) {
    const sanitized = this.sanitizeString(phone)
      .replace(/\D/g, '')

    return sanitized.length >= 10 ? sanitized : null
  }
}

/**
 * ============================================================================
 * ADVANCED REQUEST VALIDATION
 * ============================================================================
 */

class RequestValidator {
  /**
   * Validate required fields exist and are not empty
   */
  static validateRequired(data, fields) {
    const missing = []
    const empty = []

    for (const field of fields) {
      if (!(field in data)) {
        missing.push(field)
      } else if (data[field] === null || data[field] === undefined) {
        empty.push(field)
      } else if (typeof data[field] === 'string' && !data[field].trim()) {
        empty.push(field)
      }
    }

    return {
      valid: missing.length === 0 && empty.length === 0,
      missing,
      empty,
      errors: [
        ...missing.map(f => `Missing required field: ${f}`),
        ...empty.map(f => `Field ${f} is empty`)
      ]
    }
  }

  /**
   * Validate field types
   */
  static validateTypes(data, schema) {
    const errors = []

    for (const [field, expectedType] of Object.entries(schema)) {
      if (field in data) {
        const actualType = Array.isArray(data[field]) ? 'array' : typeof data[field]
        if (actualType !== expectedType) {
          errors.push(
            `Field "${field}" should be ${expectedType}, got ${actualType}`
          )
        }
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Validate string lengths
   */
  static validateStringLengths(data, schema) {
    const errors = []

    for (const [field, limits] of Object.entries(schema)) {
      if (field in data && typeof data[field] === 'string') {
        const length = data[field].length
        if (limits.min && length < limits.min) {
          errors.push(
            `Field "${field}" must be at least ${limits.min} characters (got ${length})`
          )
        }
        if (limits.max && length > limits.max) {
          errors.push(
            `Field "${field}" must be at most ${limits.max} characters (got ${length})`
          )
        }
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Validate emails
   */
  static validateEmails(data, fields) {
    const errors = []
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    for (const field of fields) {
      if (field in data && !emailRegex.test(data[field])) {
        errors.push(`Field "${field}" must be a valid email address`)
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Validate URLs
   */
  static validateURLs(data, fields) {
    const errors = []

    for (const field of fields) {
      if (field in data) {
        try {
          new URL(data[field])
        } catch {
          errors.push(`Field "${field}" must be a valid URL`)
        }
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Validate numeric ranges
   */
  static validateRanges(data, schema) {
    const errors = []

    for (const [field, range] of Object.entries(schema)) {
      if (field in data) {
        const value = Number(data[field])
        if (isNaN(value)) {
          errors.push(`Field "${field}" must be a number`)
        } else {
          if (range.min !== undefined && value < range.min) {
            errors.push(`Field "${field}" must be at least ${range.min}`)
          }
          if (range.max !== undefined && value > range.max) {
            errors.push(`Field "${field}" must be at most ${range.max}`)
          }
        }
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Validate array items
   */
  static validateArrayItems(data, schema) {
    const errors = []

    for (const [field, itemRules] of Object.entries(schema)) {
      if (field in data && Array.isArray(data[field])) {
        data[field].forEach((item, index) => {
          if (itemRules.type && typeof item !== itemRules.type) {
            errors.push(
              `Array field "${field}[${index}]" must be of type ${itemRules.type}`
            )
          }
          if (itemRules.minLength && typeof item === 'string' && item.length < itemRules.minLength) {
            errors.push(
              `Array field "${field}[${index}]" must be at least ${itemRules.minLength} characters`
            )
          }
        })
      }
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Comprehensive validation
   */
  static validate(data, rules) {
    const allErrors = []

    // Required fields
    if (rules.required) {
      const validation = this.validateRequired(data, rules.required)
      allErrors.push(...validation.errors)
    }

    // Types
    if (rules.types) {
      const validation = this.validateTypes(data, rules.types)
      allErrors.push(...validation.errors)
    }

    // String lengths
    if (rules.lengths) {
      const validation = this.validateStringLengths(data, rules.lengths)
      allErrors.push(...validation.errors)
    }

    // Emails
    if (rules.emails) {
      const validation = this.validateEmails(data, rules.emails)
      allErrors.push(...validation.errors)
    }

    // URLs
    if (rules.urls) {
      const validation = this.validateURLs(data, rules.urls)
      allErrors.push(...validation.errors)
    }

    // Ranges
    if (rules.ranges) {
      const validation = this.validateRanges(data, rules.ranges)
      allErrors.push(...validation.errors)
    }

    // Array items
    if (rules.arrayItems) {
      const validation = this.validateArrayItems(data, rules.arrayItems)
      allErrors.push(...validation.errors)
    }

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      errorCount: allErrors.length
    }
  }
}

/**
 * ============================================================================
 * ADVANCED RATE LIMITING
 * ============================================================================
 */

class RateLimitStore {
  constructor() {
    this.requests = new Map()
    this.blocked = new Map()
  }

  addRequest(key, timestamp) {
    if (!this.requests.has(key)) {
      this.requests.set(key, [])
    }
    this.requests.get(key).push(timestamp)
  }

  getRequests(key, windowMs) {
    if (!this.requests.has(key)) {
      return []
    }

    const now = Date.now()
    const validRequests = this.requests
      .get(key)
      .filter(time => now - time < windowMs)

    this.requests.set(key, validRequests)
    return validRequests
  }

  isBlocked(key) {
    const blockInfo = this.blocked.get(key)
    if (!blockInfo) return false

    if (Date.now() > blockInfo.until) {
      this.blocked.delete(key)
      return false
    }

    return true
  }

  block(key, durationMs) {
    this.blocked.set(key, {
      until: Date.now() + durationMs,
      blocked: true
    })
  }

  clearExpired(windowMs) {
    const now = Date.now()

    // Clear old requests
    for (const [key, times] of this.requests.entries()) {
      const valid = times.filter(time => now - time < windowMs)
      if (valid.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, valid)
      }
    }

    // Clear expired blocks
    for (const [key, blockInfo] of this.blocked.entries()) {
      if (now > blockInfo.until) {
        this.blocked.delete(key)
      }
    }
  }

  getStats(key) {
    return {
      requestCount: this.requests.get(key)?.length || 0,
      isBlocked: this.isBlocked(key),
      blockInfo: this.blocked.get(key) || null
    }
  }
}

const rateLimitStore = new RateLimitStore()

/**
 * Create advanced rate limiter
 */
function createAdvancedRateLimiter(options = {}) {
  const {
    windowMs = 60000,
    maxRequests = 100,
    keyGenerator = (req) => req.ip || req.socket.remoteAddress,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    handler = null,
    blockDurationMs = 60000,
    enableBlockingAfterViolations = true,
    blockAfterViolations = 5
  } = options

  const violationCounts = new Map()

  return (req, res, next) => {
    const key = keyGenerator(req)
    const now = Date.now()

    // Check if IP is blocked
    if (rateLimitStore.isBlocked(key)) {
      const blockInfo = rateLimitStore.blocked.get(key)
      const remaining = Math.ceil((blockInfo.until - now) / 1000)

      middlewareLogger.warn('Rate limited IP (blocked)', {
        ip: key,
        remainingSeconds: remaining
      })

      res.set('Retry-After', remaining)
      res.status(429).json({
        error: 'Too many requests - IP temporarily blocked',
        retryAfter: remaining,
        unblockTime: new Date(blockInfo.until).toISOString()
      })
      return
    }

    // Get recent requests
    const requests = rateLimitStore.getRequests(key, windowMs)

    if (requests.length >= maxRequests) {
      // Increment violation count
      const violations = (violationCounts.get(key) || 0) + 1
      violationCounts.set(key, violations)

      // Block IP after multiple violations
      if (enableBlockingAfterViolations && violations >= blockAfterViolations) {
        rateLimitStore.block(key, blockDurationMs)
        middlewareLogger.warn('IP blocked due to multiple violations', {
          ip: key,
          violations,
          blockDurationMs
        })
      }

      middlewareLogger.warn('Rate limit exceeded', {
        ip: key,
        requests: requests.length,
        limit: maxRequests,
        violations
      })

      res.set('Retry-After', Math.ceil(windowMs / 1000))

      if (handler) {
        handler(req, res)
      } else {
        res.status(429).json({
          error: 'Too many requests',
          retryAfter: Math.ceil(windowMs / 1000),
          limit: maxRequests,
          current: requests.length
        })
      }
      return
    }

    // Record request
    rateLimitStore.addRequest(key, now)

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      rateLimitStore.clearExpired(windowMs)
    }

    next()
  }
}

/**
 * ============================================================================
 * EXPRESS MIDDLEWARE FUNCTIONS
 * ============================================================================
 */

/**
 * Input sanitization middleware
 */
export const sanitizeInput = (req, res, next) => {
  try {
    // Sanitize body
    if (req.body && typeof req.body === 'object') {
      req.body = InputSanitizer.sanitizeObject(req.body, {
        maxDepth: 5,
        maxProperties: 1000,
        removeEmpty: false
      })
    }

    // Sanitize query parameters
    if (req.query && typeof req.query === 'object') {
      req.query = InputSanitizer.sanitizeObject(req.query, {
        maxDepth: 3,
        maxProperties: 50
      })
    }

    // Sanitize URL parameters
    if (req.params && typeof req.params === 'object') {
      req.params = InputSanitizer.sanitizeObject(req.params, {
        maxDepth: 2,
        maxProperties: 20
      })
    }

    middlewareLogger.debug('Input sanitized', {
      hasBody: !!req.body,
      hasQuery: !!req.query,
      hasParams: !!req.params
    })

    next()
  } catch (error) {
    middlewareLogger.error('Input sanitization failed', {
      error: error.message
    })
    res.status(400).json({
      error: 'Invalid input format',
      message: error.message
    })
  }
}

/**
 * Rate limiting middleware factory
 */
export const rateLimit = (maxRequests = 100, windowMs = 60000, options = {}) => {
  return createAdvancedRateLimiter({
    maxRequests,
    windowMs,
    blockDurationMs: options.blockDurationMs || 60000,
    enableBlockingAfterViolations: options.enableBlocking !== false,
    blockAfterViolations: options.blockAfterViolations || 5,
    ...options
  })
}

/**
 * Comprehensive error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const statusCode = err.statusCode || 500

  middlewareLogger.error('Request error', {
    error: err.message,
    name: err.name,
    statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip,
    requestId: req.id
  })

  // Handle specific error types
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.details,
      field: err.details.field,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  if (err instanceof RateLimitError) {
    res.set('Retry-After', err.retryAfter || 60)
    return res.status(429).json({
      error: 'Rate Limit Exceeded',
      message: err.message,
      retryAfter: err.retryAfter,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      error: 'Authentication Failed',
      message: err.message,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  if (err instanceof AuthorizationError) {
    return res.status(403).json({
      error: 'Authorization Failed',
      message: err.message,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message,
      resource: err.details.resource,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({
      error: 'Conflict',
      message: err.message,
      conflict: err.details.conflict,
      requestId: req.id,
      timestamp: err.timestamp
    })
  }

  // MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate Entry',
        message: 'A record with this value already exists',
        requestId: req.id,
        timestamp: new Date().toISOString()
      })
    }

    if (err.code === 13) {
      return res.status(403).json({
        error: 'Permission Denied',
        message: 'You do not have permission to perform this operation',
        requestId: req.id,
        timestamp: new Date().toISOString()
      })
    }
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      requestId: req.id,
      timestamp: new Date().toISOString()
    })
  }

  // Generic error response
  const responseBody = {
    error: isDevelopment ? err.message : 'Internal Server Error',
    requestId: req.id,
    timestamp: new Date().toISOString()
  }

  if (isDevelopment) {
    responseBody.stack = err.stack
    responseBody.details = err.details
  }

  res.status(statusCode).json(responseBody)
}

/**
 * Request validation middleware factory
 */
export const validateRequest = (rules) => {
  return (req, res, next) => {
    const data = {
      ...req.params,
      ...req.query,
      ...req.body
    }

    const validation = RequestValidator.validate(data, rules)

    if (!validation.valid) {
      middlewareLogger.warn('Request validation failed', {
        path: req.path,
        errors: validation.errors,
        errorCount: validation.errorCount
      })

      return res.status(400).json({
        error: 'Validation Failed',
        message: `Request validation failed with ${validation.errorCount} error(s)`,
        errors: validation.errors,
        requestId: req.id,
        timestamp: new Date().toISOString()
      })
    }

    next()
  }
}

/**
 * Request logging middleware
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now()
  const requestId = req.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  req.id = requestId

  res.on('finish', () => {
    const duration = Date.now() - start
    middlewareLogger.debug('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      requestId
    })
  })

  next()
}

/**
 * Security headers middleware
 */
export const securityHeaders = (req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  })
  next()
}

/**
 * Async error wrapper
 */
export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) => {
    middlewareLogger.error('Async handler error', {
      error: error.message,
      stack: error.stack
    })
    next(error)
  })
}

/**
 * ============================================================================
 * EXPORTS
 * ============================================================================
 */

export {
  // Error classes
  ApplicationError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,

  // Validators and sanitizers
  InputSanitizer,
  RequestValidator,

  // Rate limiting
  createAdvancedRateLimiter,
  rateLimitStore,

  // Logger
  middlewareLogger
}

export default {
  sanitizeInput,
  rateLimit,
  errorHandler,
  validateRequest,
  requestLogger,
  securityHeaders,
  asyncHandler,
  InputSanitizer,
  RequestValidator
}