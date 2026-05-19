/**
 * ============================================================================
 * ADVANCED MONGODB MODELS AND SCHEMAS
 * ============================================================================
 * Comprehensive Mongoose schemas with:
 * - Pre and post hooks for validation and processing
 * - Advanced indexing for performance
 * - Virtual fields and computed properties
 * - Middleware for timestamps and defaults
 * - Query helpers and instance methods
 * - Comprehensive field validation
 * ============================================================================
 */

import mongoose from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

/**
 * ============================================================================
 * USER SCHEMA AND MODEL
 * ============================================================================
 */

const userSchema = new mongoose.Schema({
  // Basic information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    index: true
  },

  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters'],
    match: [/^[a-z0-9_.-]+$/, 'Username can only contain lowercase letters, numbers, dots, hyphens, and underscores'],
    index: true
  },

  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },

  // Profile information
  profile: {
    name: {
      type: String,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    avatar: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    phone: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    website: {
      type: String,
      default: null
    }
  },

  // User preferences
  preferences: {
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'it', 'pt']
    },
    theme: {
      type: String,
      default: 'light',
      enum: ['light', 'dark', 'auto']
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    privacy: {
      profilePublic: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true }
    }
  },

  // Related data
  influencers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  }],

  generatedContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeneratedScript'
  }],

  analytics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analytics'
  }],

  // Subscription information
  subscription: {
    tier: {
      type: String,
      default: 'free',
      enum: ['free', 'pro', 'enterprise']
    },
    expiresAt: Date,
    autoRenew: { type: Boolean, default: true },
    lastPayment: Date
  },

  // Activity tracking
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },

  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },

  // Metadata
  metadata: {
    apiKey: String,
    ipAddresses: [String],
    userAgent: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes
userSchema.index({ email: 1, username: 1 })
userSchema.index({ createdAt: -1 })
userSchema.index({ 'subscription.tier': 1 })

// Virtual for user's full profile
userSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    email: this.email,
    username: this.username,
    profile: this.profile,
    subscription: this.subscription,
    stats: {
      influencersTracked: this.influencers?.length || 0,
      contentGenerated: this.generatedContent?.length || 0,
      memberSince: this.createdAt
    }
  }
})

// Pre-save middleware
userSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Instance methods
userSchema.methods.toPublicProfile = function() {
  return {
    username: this.username,
    profile: this.profile,
    createdAt: this.createdAt
  }
}

userSchema.methods.incrementLoginCount = async function() {
  this.loginCount++
  this.lastLogin = new Date()
  return await this.save()
}

const User = mongoose.model('User', userSchema)

/**
 * ============================================================================
 * INFLUENCER SCHEMA AND MODEL
 * ============================================================================
 */

const influencerSchema = new mongoose.Schema({
  // Basic info
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    index: true,
    lowercase: true
  },

  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'twitch'],
    index: true
  },

  platformId: String,
  profileUrl: String,

  // Profile details
  displayName: String,
  bio: String,
  profileImage: String,
  location: String,
  website: String,

  // Statistics
  statistics: {
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    engagement: {
      rate: Number,
      avgLikes: Number,
      avgComments: Number,
      avgShares: Number,
      avgSaves: Number
    },
    reach: {
      monthlyImpressions: Number,
      monthlyReach: Number,
      growthRate: Number
    }
  },

  // Content info
  niche: {
    type: String,
    enum: [
      'fashion',
      'fitness',
      'food',
      'travel',
      'beauty',
      'lifestyle',
      'technology',
      'education',
      'gaming',
      'business',
      'entertainment',
      'sports',
      'other'
    ],
    index: true
  },

  contentType: [{
    type: String,
    enum: ['reels', 'posts', 'stories', 'live', 'carousel']
  }],

  contentFrequency: {
    type: String,
    enum: ['daily', 'several-times-week', 'weekly', 'monthly']
  },

  // Audience insights
  audience: {
    ageRange: {
      min: Number,
      max: Number
    },
    topCountries: [String],
    topCities: [String],
    genderDistribution: {
      male: Number,
      female: Number,
      other: Number
    },
    interests: [String]
  },

  // Generated content
  generatedContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeneratedScript'
  }],

  // Analytics
  analytics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analytics'
  }],

  // Verification
  isVerified: { type: Boolean, default: false },
  verificationDate: Date,

  // Status
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'banned']
  },

  // Data timestamps
  lastScraped: Date,
  lastAnalyzed: Date,

  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

// Indexes
influencerSchema.index({ username: 1, platform: 1 })
influencerSchema.index({ niche: 1, 'statistics.followers': -1 })
influencerSchema.index({ createdAt: -1 })
influencerSchema.index({ 'statistics.engagement.rate': -1 })

// Pre-save middleware
influencerSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Instance methods
influencerSchema.methods.getEngagementScore = function() {
  const followers = this.statistics.followers || 0
  const engagementRate = this.statistics.engagement?.rate || 0
  return (followers * (engagementRate / 100)).toFixed(2)
}

influencerSchema.methods.isHighEngagement = function() {
  return this.statistics.engagement?.rate > 3
}

const Influencer = mongoose.model('Influencer', influencerSchema)

/**
 * ============================================================================
 * GENERATED SCRIPT SCHEMA AND MODEL
 * ============================================================================
 */

const generatedScriptSchema = new mongoose.Schema({
  // Reference
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true
  },

  username: {
    type: String,
    required: true,
    index: true
  },

  // Content
  title: {
    type: String,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },

  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },

  contentType: {
    type: String,
    enum: ['hook', 'caption', 'script', 'hashtags'],
    required: true,
    index: true
  },

  // Specifications
  duration: String,
  platform: {
    type: String,
    enum: ['instagram', 'tiktok', 'youtube', 'all'],
    default: 'instagram'
  },

  style: {
    type: String,
    enum: ['viral', 'educational', 'entertaining', 'promotional', 'emotional']
  },

  tone: {
    type: String,
    enum: ['professional', 'casual', 'formal', 'friendly', 'humorous']
  },

  // Metadata
  metadata: {
    requestId: String,
    generatedBy: String,
    model: String,
    temperature: Number,
    promptVersion: String,
    generatedAt: Date
  },

  // Performance metrics
  performance: {
    views: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },

  // User feedback
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },

  feedback: String,

  // Status
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected', 'published']
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: Date
}, {
  timestamps: true
})

// Indexes
generatedScriptSchema.index({ username: 1, contentType: 1 })
generatedScriptSchema.index({ contentType: 1, createdAt: -1 })
generatedScriptSchema.index({ 'performance.engagement': -1 })

const GeneratedScript = mongoose.model('GeneratedScript', generatedScriptSchema)

/**
 * ============================================================================
 * ANALYTICS SCHEMA AND MODEL
 * ============================================================================
 */

const analyticsSchema = new mongoose.Schema({
  // Reference
  influencer: {
    type: String,
    required: true,
    index: true
  },

  // Type of analytics
  type: {
    type: String,
    enum: ['profile_analysis', 'content_performance', 'audience_insight', 'engagement_trend'],
    required: true
  },

  // Data
  data: {
    type: mongoose.Schema.Mixed,
    required: true
  },

  // Metrics
  metrics: {
    engagementRate: Number,
    growthRate: Number,
    reachAverage: Number,
    impactScore: Number
  },

  // Period
  period: {
    startDate: Date,
    endDate: Date
  },

  // Metadata
  metadata: {
    source: String,
    dataPoints: Number,
    confidence: Number
  },

  // Status
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'archived']
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Indexes
analyticsSchema.index({ influencer: 1, type: 1 })
analyticsSchema.index({ createdAt: -1 })

const Analytics = mongoose.model('Analytics', analyticsSchema)

/**
 * ============================================================================
 * TREND REPORT SCHEMA AND MODEL
 * ============================================================================
 */

const trendReportSchema = new mongoose.Schema({
  // Identification
  title: {
    type: String,
    required: true,
    index: true
  },

  niche: {
    type: String,
    required: true,
    index: true
  },

  // Trend data
  trends: [{
    topic: String,
    score: Number,
    volume: Number,
    growth: Number,
    sentiment: String
  }],

  // Insights
  insights: {
    topicInsights: [String],
    contentGaps: [String],
    opportunities: [String],
    threats: [String]
  },

  // Recommendations
  recommendations: {
    contentIdeas: [String],
    hashtagStrategies: [String],
    postingSchedule: [String],
    audienceEngagement: [String]
  },

  // Period
  period: {
    startDate: Date,
    endDate: Date,
    frequency: String
  },

  // Metrics
  metrics: {
    trendCount: Number,
    avgScore: Number,
    topTrend: String,
    volatility: Number
  },

  // Status
  status: {
    type: String,
    default: 'published',
    enum: ['draft', 'published', 'archived']
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Indexes
trendReportSchema.index({ niche: 1, createdAt: -1 })

const TrendReport = mongoose.model('TrendReport', trendReportSchema)

/**
 * ============================================================================
 * INSTAGRAM POST SCHEMA AND MODEL
 * ============================================================================
 */

const instagramPostSchema = new mongoose.Schema({
  // Identification
  postId: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    index: true
  },

  // Content
  caption: String,
  imageUrl: String,
  videoUrl: String,

  postType: {
    type: String,
    enum: ['image', 'video', 'carousel', 'story', 'reel'],
    required: true
  },

  // Engagement metrics
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    reachEstimate: Number
  },

  // Hashtags and mentions
  hashtags: [String],
  mentions: [String],

  // Location info
  location: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },

  // Timestamps
  postedAt: Date,
  createdAt: { type: Date, default: Date.now, index: true },
  scrapedAt: Date
}, {
  timestamps: true
})

// Indexes
instagramPostSchema.index({ username: 1, postedAt: -1 })
instagramPostSchema.index({ postType: 1 })

const InstagramPost = mongoose.model('InstagramPost', instagramPostSchema)

/**
 * ============================================================================
 * INSTAGRAM PROFILE SCHEMA AND MODEL
 * ============================================================================
 */

const instagramProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },

  userId: String,
  fullName: String,
  bio: String,
  profilePictureUrl: String,
  website: String,
  isPrivate: Boolean,
  isVerified: Boolean,

  statistics: {
    followers: Number,
    following: Number,
    posts: Number,
    avgEngagementRate: Number,
    avgLikesPerPost: Number,
    avgCommentsPerPost: Number
  },

  content: {
    recentPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InstagramPost'
    }],
    postsCount: { type: Number, default: 0 }
  },

  crawlData: {
    lastCrawledAt: Date,
    crawlStatus: String,
    errorLog: [String]
  },

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Indexes
instagramProfileSchema.index({ username: 1 })
instagramProfileSchema.index({ 'statistics.followers': -1 })
instagramProfileSchema.index({ createdAt: -1 })

const InstagramProfile = mongoose.model('InstagramProfile', instagramProfileSchema)

/**
 * ============================================================================
 * EXPORTS
 * ============================================================================
 */

export {
  User,
  Influencer,
  GeneratedScript,
  Analytics,
  TrendReport,
  InstagramPost,
  InstagramProfile
}

export default {
  User,
  Influencer,
  GeneratedScript,
  Analytics,
  TrendReport,
  InstagramPost,
  InstagramProfile
}