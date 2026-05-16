import mongoose from 'mongoose'

const generatedScriptSchema = new mongoose.Schema({
  influencerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hooks: [String],
  captions: [String],
  scripts: [
    {
      title: String,
      content: String,
      duration: String,
    },
  ],
  hashtags: [String],
  trendScore: Number,
  engagementScore: Number,
  platform: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  agentStages: {
    scraper: { completed: Boolean, timestamp: Date },
    validator: { completed: Boolean, timestamp: Date },
    writer: { completed: Boolean, timestamp: Date },
    hookGenerator: { completed: Boolean, timestamp: Date },
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

export default mongoose.model('GeneratedScript', generatedScriptSchema)
