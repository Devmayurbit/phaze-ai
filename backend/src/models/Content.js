import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // ─── Content Type ─────────────────────────────
  type: {
    type: String,
    enum: ['hooks', 'captions', 'hashtags', 'script', 'trend_analysis'],
    required: true
  },

  // ─── Generation Context ───────────────────────
  topic: { type: String, required: true },
  niche: String,
  platform: { type: String, default: 'instagram' },

  // ─── Generated Content ────────────────────────
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
    // For hooks: [{ text, type, score }]
    // For captions: [{ text, score, cta }]
    // For hashtags: { highVolume, mediumVolume, niche, trending }
    // For script: { hook, body, cta, visuals, timing }
  },

  // ─── Quality Metrics ──────────────────────────
  quality: {
    overallScore: { type: Number, default: 0 },
    viralPotential: { type: Number, default: 0 },
    authenticityScore: { type: Number, default: 0 },
    engagementPotential: { type: Number, default: 0 }
  },

  // ─── Generation Metadata ──────────────────────
  model: { type: String, default: 'gemini-flash' },
  tokensUsed: { type: Number, default: 0 },
  generationTimeMs: Number,

  // ─── Usage Tracking ───────────────────────────
  isFavorited: { type: Boolean, default: false },
  isUsed: { type: Boolean, default: false },
  usedAt: Date,

  tags: [String]
}, {
  timestamps: true
})

contentSchema.index({ userId: 1, type: 1, createdAt: -1 })

export default mongoose.model('Content', contentSchema)
