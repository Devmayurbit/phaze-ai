import mongoose from 'mongoose'

const creatorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  instagramUsername: {
    type: String,
    required: true,
    index: true
  },

  // ─── Scraped Profile Data ─────────────────────
  profileData: {
    fullName: String,
    biography: String,
    followers: Number,
    following: Number,
    totalPosts: Number,
    avatar: String,
    isVerified: Boolean,
    engagementRate: Number,
    lastScrapedAt: Date
  },

  // ─── AI-Analyzed Voice Profile ────────────────
  voiceProfile: {
    tone: { type: String, default: 'casual' },
    vocabulary: {
      uniqueTerms: [String],
      commonPhrases: [String],
      slangUsage: { type: Number, default: 0 }
    },
    emotionalEnergy: { type: Number, default: 50 },
    storytellingStyle: String,
    ctaPatterns: [String],
    authenticityScore: { type: Number, default: 0 }
  },

  // ─── Niche Analysis ───────────────────────────
  niche: {
    primary: String,
    secondary: [String],
    keywords: [String],
    expertiseLevel: { type: String, default: 'intermediate' }
  },

  // ─── Audience Insights ────────────────────────
  audience: {
    ageRange: { type: String, default: '18-35' },
    interests: [String],
    painPoints: [String],
    engagementProfile: {
      avgEngagementRate: Number,
      mostResponsiveTo: [String],
      peakActivityTimes: [String]
    }
  },

  // ─── Content Strategy ─────────────────────────
  contentStrategy: {
    postingFrequency: Number,
    bestPerformingTypes: [String],
    optimalHashtagCount: Number,
    bestPostingTimes: [String]
  },

  // ─── Profile Health Score ─────────────────────
  healthMetrics: {
    overallScore: { type: Number, default: 0 },
    nicheClarity: { type: Number, default: 0 },
    audienceEngagement: { type: Number, default: 0 },
    contentConsistency: { type: Number, default: 0 },
    growthVelocity: { type: Number, default: 0 }
  },

  // ─── Creator Embedding (for vector search) ────
  embedding: {
    type: [Number],
    default: []
  },

  // ─── Analysis History ─────────────────────────
  analysisHistory: [{
    date: { type: Date, default: Date.now },
    scores: Object,
    insights: [String]
  }],

  lastAnalyzedAt: Date,
  nextAnalysisAt: Date
}, {
  timestamps: true
})

export default mongoose.model('CreatorProfile', creatorProfileSchema)
