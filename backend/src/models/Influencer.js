import mongoose from 'mongoose'

const influencerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['instagram', 'youtube', 'twitter', 'tiktok'],
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  niche: {
    type: String,
  },
  followers: Number,
  engagement: Number,
  bio: String,
  avatar: String,
  lastScraped: Date,
  analytics: {
    recentPostCount: Number,
    averageEngagement: Number,
    topicsOfInterest: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Influencer', influencerSchema)
