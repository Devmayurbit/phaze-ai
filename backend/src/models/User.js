import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },

  // Instagram connection (scraped, not OAuth)
  instagram: {
    username: String,
    profileUrl: String,
    connectedAt: Date
  },

  // Subscription (free tier for now)
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },

  // Usage tracking
  usage: {
    aiGenerationsToday: { type: Number, default: 0 },
    aiGenerationsTotal: { type: Number, default: 0 },
    lastGenerationAt: Date,
    lastResetAt: { type: Date, default: Date.now }
  },

  // Preferences
  preferences: {
    niche: { type: String, default: '' },
    contentStyle: { type: String, default: 'educational' },
    defaultTone: { type: String, default: 'casual' }
  },

  isActive: { type: Boolean, default: true },
  lastLoginAt: Date
}, {
  timestamps: true
})

// ─── Hash password before save ──────────────────
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// ─── Compare password ───────────────────────────
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// ─── Generate JWT ───────────────────────────────
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ─── Generate refresh token ─────────────────────
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  )
}

// ─── Check daily usage limit ────────────────────
userSchema.methods.checkUsageLimit = function() {
  const limits = { free: 15, pro: 100, enterprise: 1000 }
  const limit = limits[this.plan] || 15

  // Reset counter if new day
  const now = new Date()
  const lastReset = new Date(this.usage.lastResetAt)
  if (now.toDateString() !== lastReset.toDateString()) {
    this.usage.aiGenerationsToday = 0
    this.usage.lastResetAt = now
  }

  return {
    used: this.usage.aiGenerationsToday,
    limit,
    remaining: Math.max(0, limit - this.usage.aiGenerationsToday),
    canGenerate: this.usage.aiGenerationsToday < limit
  }
}

// ─── Increment usage ────────────────────────────
userSchema.methods.incrementUsage = async function() {
  this.usage.aiGenerationsToday += 1
  this.usage.aiGenerationsTotal += 1
  this.usage.lastGenerationAt = new Date()
  await this.save()
}

// ─── Remove password from JSON ──────────────────
userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('User', userSchema)
