/**
 * ══════════════════════════════════════════════════
 * PHAZE AI — Production Server v3.0
 * Instagram Growth System — Zero Budget Edition
 * ══════════════════════════════════════════════════
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'

import { connectDatabase } from './config/database.js'
import { validateEnv } from './config/env.js'
import authRoutes from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import instagramRoutes from './routes/instagramRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import logger from './utils/logger.js'

dotenv.config()
validateEnv()

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT || 5000

// ─── Security Middleware ─────────────────────────
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))

// ─── Request Processing ─────────────────────────
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ─── Rate Limiting ──────────────────────────────
app.use('/api', apiLimiter)

// ─── Health Check ───────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '3.0.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  })
})

// ─── API Routes ─────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/instagram', instagramRoutes)

// ─── Error Handling ─────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── Start Server ───────────────────────────────
async function startServer() {
  try {
    await connectDatabase()
    logger.info('✅ MongoDB connected')

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Phaze AI v3.0 running on port ${PORT}`)
      logger.info(`📊 Health: http://localhost:${PORT}/api/health`)
      logger.info(`🤖 AI Engine: Google Gemini Flash (FREE)`)
    })
  } catch (error) {
    logger.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

// ─── Graceful Shutdown ──────────────────────────
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down...')
  httpServer.close(() => process.exit(0))
})

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err.message)
})

startServer()

export default app
