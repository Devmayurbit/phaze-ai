import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  influencerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
  },
  instagramProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstagramProfile',
  },
  username: String,
  scriptGenerated: Number,
  hooksGenerated: Number,
  captionsGenerated: Number,
  hashtagsGenerated: Number,
  totalRequests: Number,
  successRate: Number,
  averageProcessingTime: Number,
  apiUsage: {
    scraper: Number,
    validator: Number,
    writer: Number,
    hookGenerator: Number,
  },
  averageEngagementRate: Number,
  mostUsedHashtags: [
    {
      hashtag: String,
      frequency: Number,
    },
  ],
  bestPostingTime: String,
  captionStyleAnalysis: {
    averageLength: Number,
    useEmojis: Boolean,
    callToActionPercentage: Number,
  },
  topPerformingContentType: String,
  totalPosts: Number,
  totalEngagement: Number,
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
  },
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Analytics', analyticsSchema);
