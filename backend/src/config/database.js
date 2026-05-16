import mongoose from 'mongoose'

const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phaze-ai'

    console.log('🔌 Connecting to MongoDB...')
    console.log(`   URI: ${mongoUri.substring(0, 50)}...`)

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: false
    })

    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    console.error('   Error code:', error.code)
    console.error('   Continuing without database - using mock data')
    return null
  }
}

export default connectDatabase
