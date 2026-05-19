/**
 * MongoDB connection — simplified, production-ready
 */

import mongoose from 'mongoose'
import logger from '../utils/logger.js'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI

  mongoose.connection.on('connected', () => logger.info('MongoDB connected'))
  mongoose.connection.on('error', (err) => logger.error('MongoDB error:', err.message))
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))

  await mongoose.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
}

export default mongoose
