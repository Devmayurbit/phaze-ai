import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import apiRoutes from './routes/api.js'
import { errorHandler, sanitizeInput, rateLimit } from './middleware/errorHandler.js'
import connectDatabase from './config/database.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sanitizeInput)
app.use(rateLimit(100, 60000)) // 100 requests per minute

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// API Routes
app.use('/api', apiRoutes)

app.get('/api/status', (req, res) => {
  res.json({ status: 'Phaze AI Backend Running' })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server with database connection
const startServer = async () => {
  try {
    // Initialize database connection
    await connectDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Phaze AI Backend running on http://localhost:${PORT}`)
      console.log(`📡 API available at http://localhost:${PORT}/api`)
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

export default app
