import mongoose from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

/**
 * ============================================================================
 * DATABASE CONFIGURATION AND CONNECTION MODULE
 * ============================================================================
 * Handles MongoDB connection with comprehensive features including:
 * - Connection pooling and retry logic
 * - Connection state monitoring
 * - Graceful disconnect handling
 * - Performance metrics and logging
 * - Health check utilities
 * ============================================================================
 */

/**
 * Advanced Database Logger
 */
class DatabaseLogger {
  constructor() {
    this.startTime = Date.now()
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString()
    const elapsed = Date.now() - this.startTime
    console.log(`[${level}] [DB] ${message}`, { elapsed: `${elapsed}ms`, ...data })
  }

  info(message, data) { this.log('INFO', message, data) }
  warn(message, data) { this.log('WARN', message, data) }
  error(message, data) { this.log('ERROR', message, data) }
  debug(message, data) { this.log('DEBUG', message, data) }
}

const dbLogger = new DatabaseLogger()

/**
 * Connection State Manager
 */
class ConnectionStateManager {
  constructor() {
    this.state = 'disconnected'
    this.lastError = null
    this.connectionTime = null
    this.metrics = {
      connectAttempts: 0,
      successfulConnections: 0,
      failedConnections: 0,
      totalUptime: 0
    }
  }

  setState(newState) {
    const previousState = this.state
    this.state = newState
    dbLogger.info(`Connection state changed: ${previousState} → ${newState}`)
  }

  recordConnectionAttempt(success) {
    this.metrics.connectAttempts++
    if (success) {
      this.metrics.successfulConnections++
      this.connectionTime = new Date()
    } else {
      this.metrics.failedConnections++
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      currentState: this.state,
      connectionTime: this.connectionTime,
      lastError: this.lastError
    }
  }
}

const stateManager = new ConnectionStateManager()

/**
 * Advanced MongoDB Connection Configuration
 */
const getConnectionConfig = () => {
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: parseInt(process.env.DB_SELECTION_TIMEOUT || 5000),
    socketTimeoutMS: parseInt(process.env.DB_SOCKET_TIMEOUT || 45000),
    connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT || 10000),
    retryWrites: false,
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || 10),
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || 2),
    maxIdleTimeMS: parseInt(process.env.DB_MAX_IDLE_TIME || 30000),
    serverMonitoringMode: 'stream',
    appName: 'PhazeAI-Backend',
    compressors: ['snappy', 'zlib'],
    zlibCompressionLevel: parseInt(process.env.DB_ZLIB_LEVEL || 5)
  }

  return config
}

/**
 * Connection Pool Manager
 */
class ConnectionPoolManager {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.poolStats = {}
  }

  getPoolStats() {
    if (!this.mongoose.connection) {
      return { status: 'no_connection' }
    }

    const client = this.mongoose.connection.getClient()
    if (!client) {
      return { status: 'no_client' }
    }

    return {
      poolSize: client.topology?.connectionPool?.totalConnectionCount || 0,
      availableConnections: client.topology?.connectionPool?.availableConnectionCount || 0,
      waitingRequestCount: client.topology?.connectionPool?.waitQueueSize || 0,
      connectionCheckouts: client.topology?.connectionPool?.connectionCheckouts || 0
    }
  }

  logPoolStats() {
    const stats = this.getPoolStats()
    dbLogger.debug('Connection pool statistics', stats)
    return stats
  }
}

const poolManager = new ConnectionPoolManager(mongoose)

/**
 * Retry Strategy Implementation
 */
class RetryStrategy {
  constructor(maxRetries = 3, initialDelay = 1000) {
    this.maxRetries = maxRetries
    this.initialDelay = initialDelay
    this.retries = 0
  }

  async executeWithRetry(fn, context = '') {
    let lastError
    
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        dbLogger.debug(`Retry attempt ${i + 1}/${this.maxRetries} for ${context}`)
        const result = await fn()
        this.retries = 0
        return result
      } catch (error) {
        lastError = error
        const delay = this.initialDelay * Math.pow(2, i) + Math.random() * 1000
        dbLogger.warn(`Attempt ${i + 1} failed, retrying in ${delay}ms`, { error: error.message })
        
        if (i < this.maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    throw new Error(`Failed after ${this.maxRetries} retries: ${lastError?.message}`)
  }
}

/**
 * Database Connection Manager
 */
class DatabaseConnectionManager {
  constructor() {
    this.connection = null
    this.retryStrategy = new RetryStrategy(3, 1000)
    this.poolManager = poolManager
  }

  /**
   * Connect to MongoDB with advanced error handling
   */
  async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phaze-ai'
      
      dbLogger.info('🔌 Initiating database connection', {
        uri: mongoUri.substring(0, 50) + '...'
      })

      stateManager.setState('connecting')
      stateManager.recordConnectionAttempt(false)

      const config = getConnectionConfig()

      this.connection = await this.retryStrategy.executeWithRetry(
        () => mongoose.connect(mongoUri, config),
        'MongoDB connection'
      )

      stateManager.setState('connected')
      stateManager.recordConnectionAttempt(true)

      dbLogger.info('✅ MongoDB connected successfully', {
        host: this.connection.connection.host,
        database: this.connection.connection.name,
        readyState: this.connection.connection.readyState
      })

      this.setupConnectionEventListeners()
      this.setupPlugins()

      return this.connection
    } catch (error) {
      stateManager.setState('disconnected')
      stateManager.lastError = error.message
      dbLogger.error('❌ Database connection failed', {
        error: error.message,
        code: error.code,
        errorDetails: error
      })
      throw error
    }
  }

  /**
   * Setup event listeners for connection state changes
   */
  setupConnectionEventListeners() {
    const conn = mongoose.connection

    conn.on('connected', () => {
      stateManager.setState('connected')
      dbLogger.info('Mongoose connected event fired')
    })

    conn.on('disconnected', () => {
      stateManager.setState('disconnected')
      dbLogger.warn('Mongoose disconnected event fired')
    })

    conn.on('reconnecting', () => {
      stateManager.setState('reconnecting')
      dbLogger.info('Mongoose reconnecting...')
    })

    conn.on('error', (error) => {
      stateManager.lastError = error.message
      dbLogger.error('Mongoose connection error', { error: error.message })
    })

    conn.on('fullsetup', () => {
      dbLogger.info('Mongoose replica set fully initialized')
    })
  }

  /**
   * Setup global Mongoose plugins
   */
  setupPlugins() {
    // Add lean virtuals plugin for better query performance
    mongoose.plugin(mongooseLeanVirtuals)

    // Global timestamps plugin
    mongoose.plugin((schema) => {
      if (!schema.paths.createdAt) {
        schema.add({ createdAt: { type: Date, default: Date.now } })
      }
      if (!schema.paths.updatedAt) {
        schema.add({ updatedAt: { type: Date, default: Date.now } })
      }
    })

    dbLogger.info('Database plugins initialized')
  }

  /**
   * Disconnect from database gracefully
   */
  async disconnect() {
    try {
      dbLogger.info('Initiating graceful database disconnection')
      stateManager.setState('disconnecting')
      
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect()
        stateManager.setState('disconnected')
        dbLogger.info('✅ Database disconnected successfully')
      }
    } catch (error) {
      dbLogger.error('Error during database disconnection', { error: error.message })
      throw error
    }
  }

  /**
   * Get connection status
   */
  getStatus() {
    const readyStateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }

    return {
      state: stateManager.state,
      readyState: readyStateMap[mongoose.connection.readyState],
      connected: mongoose.connection.readyState === 1,
      metrics: stateManager.getMetrics(),
      poolStats: poolManager.getPoolStats(),
      collections: mongoose.connection.collections ? Object.keys(mongoose.connection.collections).length : 0
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      const admin = mongoose.connection.db.admin()
      const status = await admin.ping()
      return { healthy: status.ok === 1, timestamp: new Date() }
    } catch (error) {
      return { healthy: false, error: error.message, timestamp: new Date() }
    }
  }

  /**
   * Get database statistics
   */
  async getStats() {
    try {
      const stats = await mongoose.connection.db.stats()
      return {
        dataSize: stats.dataSize,
        indexSize: stats.indexSize,
        collections: stats.collections,
        views: stats.views,
        objects: stats.objects
      }
    } catch (error) {
      dbLogger.error('Failed to get database stats', { error: error.message })
      return null
    }
  }

  /**
   * Clear all data (use with caution - development only)
   */
  async clearAllData() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clear data in production environment')
    }

    try {
      dbLogger.warn('🗑️  Clearing all database data')
      const collections = mongoose.connection.collections
      
      for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
        dbLogger.info(`Cleared collection: ${key}`)
      }

      dbLogger.info('✅ All data cleared successfully')
    } catch (error) {
      dbLogger.error('Error clearing data', { error: error.message })
      throw error
    }
  }
}

/**
 * Create and export singleton instance
 */
const dbManager = new DatabaseConnectionManager()

/**
 * Main connection function for backwards compatibility
 */
const connectDatabase = async () => {
  try {
    return await dbManager.connect()
  } catch (error) {
    dbLogger.error('Connection initialization failed', { error: error.message })
    return null
  }
}

/**
 * Export all utilities
 */
export default connectDatabase
export { dbManager, poolManager, stateManager, dbLogger, getConnectionConfig }
