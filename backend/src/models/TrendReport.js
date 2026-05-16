import mongoose from 'mongoose'

const trendReportSchema = new mongoose.Schema({
  influencerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  trends: [
    {
      topic: String,
      score: Number,
      momentum: String,
    },
  ],
  growthRecommendations: [String],
  bestPostingTimes: [
    {
      day: String,
      time: String,
      engagement: Number,
    },
  ],
  topPerformingCategories: [
    {
      category: String,
      engagement: Number,
      count: Number,
    },
  ],
  audienceInsights: {
    demographics: {
      ageRange: [String],
      locations: [String],
    },
    interests: [String],
  },
  viralTopicSuggestions: [String],
  platform: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('TrendReport', trendReportSchema)
