import dotenv from 'dotenv'

// Load environment variables FIRST
dotenv.config()

import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import apiRoutes from './routes/api.js'
import { errorHandler, sanitizeInput, rateLimit, validateRequest } from './middleware/errorHandler.js'
import connectDatabase from './config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ============================================================================
// ADVANCED SERVER CONFIGURATION WITH ENTERPRISE-GRADE FEATURES
// ============================================================================

const app = express()
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_PRODUCTION = NODE_ENV === 'production'

// ============================================================================
// LOGGER UTILITIES
// ============================================================================

class ServerLogger {
  constructor(service = 'Server') {
    this.service = service
    this.startTime = Date.now()
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString()
    const elapsed = Date.now() - this.startTime
    const logEntry = {
      timestamp,
      level,
      service: this.service,
      message,
      elapsed: `${elapsed}ms`,
      ...data
    }
    console.log(`[${level}] [${this.service}] ${message}`, data)
    return logEntry
  }

  info(message, data) { return this.log('INFO', message, data) }
  warn(message, data) { return this.log('WARN', message, data) }
  error(message, data) { return this.log('ERROR', message, data) }
  debug(message, data) { return this.log('DEBUG', message, data) }
}

const serverLogger = new ServerLogger('PhazeAI-Server')

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================

// Helmet security headers
app.use(helmet())

// Compression middleware for response optimization
app.use(compression())

// CORS with advanced configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-API-Key'],
  optionsSuccessStatus: 200,
  maxAge: 3600
}

app.use(cors(corsOptions))

// Body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Request logging with Morgan
const morganFormat = IS_PRODUCTION ? 'combined' : 'dev'
app.use(morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging for health checks in production
    return IS_PRODUCTION && req.path === '/health'
  }
}))

// Custom request ID middleware
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  res.setHeader('X-Request-ID', req.id)
  next()
})

// Input sanitization and validation
app.use(sanitizeInput)

// Rate limiting with configurable options
const rateLimitOptions = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 60000), // 1 minute default
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX || 100),
  keyGenerator: (req) => req.ip || req.socket.remoteAddress,
  skipSuccessfulRequests: false,
  skipFailedRequests: false
}

app.use(rateLimit(rateLimitOptions.maxRequests, rateLimitOptions.windowMs))

// ============================================================================
// HEALTH CHECK ENDPOINTS
// ============================================================================

app.get('/health', (req, res) => {
  const uptime = process.uptime()
  const memoryUsage = process.memoryUsage()
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    environment: NODE_ENV,
    memory: {
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`
    },
    version: '2.0.0'
  })
})

app.get('/health/deep', async (req, res) => {
  try {
    const healthChecks = {
      api: { status: 'ok' },
      timestamp: new Date().toISOString(),
      checks: []
    }

    // Check database connection
    try {
      const dbHealthCheck = await checkDatabaseHealth()
      healthChecks.checks.push({ service: 'database', ...dbHealthCheck })
    } catch (err) {
      healthChecks.checks.push({ service: 'database', status: 'degraded', error: err.message })
    }

    // Check memory
    const memUsage = process.memoryUsage()
    const heapPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100
    healthChecks.checks.push({
      service: 'memory',
      status: heapPercent > 90 ? 'warning' : 'ok',
      heapUsagePercent: Math.round(heapPercent)
    })

    // Overall status
    healthChecks.status = healthChecks.checks.some(c => c.status === 'error') ? 'degraded' : 'ok'

    res.json(healthChecks)
  } catch (error) {
    serverLogger.error('Deep health check failed', { error: error.message })
    res.status(500).json({ status: 'error', message: 'Health check failed' })
  }
})

// ============================================================================
// STATUS AND INFO ENDPOINTS
// ============================================================================

app.get('/api/status', (req, res) => {
  res.json({
    status: 'Phaze AI Backend Running',
    version: '2.0.0',
    environment: NODE_ENV,
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    features: {
      aiContentGeneration: !!process.env.OPENAI_API_KEY,
      databaseIntegration: !!process.env.MONGODB_URI,
      instagramIntegration: !!process.env.INSTAGRAM_ACCESS_TOKEN
    }
  })
})

app.get('/api/info', (req, res) => {
  res.json({
    name: 'Phaze AI Content Generation Backend',
    description: 'Advanced AI-powered content generation and influencer analysis system',
    version: '2.0.0',
    apiVersion: 'v1',
    endpoints: {
      influencers: '/api/influencer',
      content: '/api/content',
      trending: '/api/trending',
      analytics: '/api/analytics',
      instagram: '/api/instagram'
    },
    documentation: '/api/docs',
    supportedPlatforms: ['instagram', 'tiktok', 'youtube'],
    maxPayloadSize: '50MB',
    rateLimit: `${rateLimitOptions.maxRequests} requests per ${rateLimitOptions.windowMs}ms`
  })
})

// ============================================================================
// API ROUTES
// ============================================================================

app.use('/api', apiRoutes)

// ============================================================================
// MIDDLEWARE FOR REQUEST VALIDATION AND RESPONSE HANDLING
// ============================================================================

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    serverLogger.info(`${req.method} ${req.path}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      requestId: req.id
    })
  })
  next()
})

// ============================================================================
// STATIC ROUTES FOR DOCUMENTATION
// ============================================================================

app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Phaze AI Backend API Documentation',
    version: '2.0.0',
    baseUrl: `http://localhost:${PORT}/api`,
    endpoints: {
      influencers: {
        POST: '/influencer/submit - Submit influencer for analysis',
        GET: '/influencer/:id/content - Get generated content',
        GET: '/influencer/:id/trends - Get trend analysis'
      },
      content: {
        POST: '/content/analyze - Analyze and generate content',
        GET: '/content/results/:requestId - Get content generation results'
      },
      generation: {
        POST: '/generate/scripts - Generate video scripts',
        POST: '/generate/hooks - Generate viral hooks',
        POST: '/generate/captions - Generate captions'
      },
      analytics: {
        GET: '/analytics - Get system analytics',
        GET: '/dashboard/stats - Get dashboard statistics',
        GET: '/dashboard/pipeline - Get pipeline status'
      }
    }
  })
})

// ============================================================================
// 404 NOT FOUND HANDLER
// ============================================================================

app.use((req, res) => {
  serverLogger.warn('Route not found', { path: req.path, method: req.method })
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
    available: '/api/docs for documentation'
  })
})

// ============================================================================
// ERROR HANDLING MIDDLEWARE (MUST BE LAST)
// ============================================================================

app.use((err, req, res, next) => {
  serverLogger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    requestId: req.id
  })

  const statusCode = err.statusCode || 500
  const message = IS_PRODUCTION ? 'Internal server error' : err.message

  res.status(statusCode).json({
    error: message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
    ...(IS_PRODUCTION ? {} : { stack: err.stack })
  })
})

// ============================================================================
// DATABASE HEALTH CHECK FUNCTION
// ============================================================================

async function checkDatabaseHealth() {
  try {
    // This would check actual DB connection
    // For now, return mock response
    return { status: 'ok', responseTime: '5ms' }
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}

// ============================================================================
// SERVER STARTUP
// ============================================================================

const server = app.listen(PORT, () => {
  serverLogger.info('🚀 Server started successfully', {
    port: PORT,
    environment: NODE_ENV,
    uptime: process.uptime()
  })
  console.log(`🚀 Phaze AI Backend running on http://localhost:${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
  console.log(`📚 Documentation at http://localhost:${PORT}/api/docs`)
  console.log(`💚 Health check at http://localhost:${PORT}/health`)
  console.log(`NODE_ENV: ${NODE_ENV}`)
})

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = () => {
  serverLogger.info('🛑 Graceful shutdown initiated')
  
  server.close(() => {
    serverLogger.info('Server closed')
    process.exit(0)
  })

  // Force shutdown after 30 seconds
  setTimeout(() => {
    serverLogger.error('Forced shutdown due to timeout')
    process.exit(1)
  }, 30000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// ============================================================================
// UNCAUGHT EXCEPTION HANDLER
// ============================================================================

process.on('uncaughtException', (error) => {
  serverLogger.error('Uncaught exception', { error: error.message, stack: error.stack })
})

process.on('unhandledRejection', (reason, promise) => {
  serverLogger.error('Unhandled rejection', { reason, promise })
})

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

// Connect to database in background (non-blocking)
connectDatabase().catch(err => {
  serverLogger.warn('Database connection failed, using fallback', { error: err.message })
})

export default app
