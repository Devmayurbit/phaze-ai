import agentOrchestrator from '../services/ai/agentOrchestrator.js'
import CreatorProfile from '../models/CreatorProfile.js'
import Content from '../models/Content.js'
import User from '../models/User.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'

/**
 * POST /api/ai/generate
 */
export const generateContent = asyncHandler(async (req, res) => {
  const { contentType, topic, niche, count, duration } = req.body
  const userId = req.user.id

  const user = await User.findById(userId)
  const usage = user.checkUsageLimit()
  if (!usage.canGenerate) {
    throw new AppError(`Daily limit reached (${usage.limit}). Resets tomorrow.`, 429)
  }

  const creatorProfile = await CreatorProfile.findOne({ userId })

  const startTime = Date.now()
  const result = await agentOrchestrator.generateContent(contentType, {
    topic,
    niche: niche || creatorProfile?.niche?.primary || 'general',
    count: count || 5,
    duration: duration || 30,
    creatorProfile: creatorProfile?.toObject() || {}
  })

  const content = await Content.create({
    userId,
    type: contentType,
    topic,
    niche: niche || creatorProfile?.niche?.primary,
    content: result,
    model: 'gemini-flash',
    generationTimeMs: Date.now() - startTime
  })

  await user.incrementUsage()

  res.json({
    success: true,
    data: {
      content: result,
      contentId: content._id,
      generationTimeMs: Date.now() - startTime,
      usage: user.checkUsageLimit()
    }
  })
})

/**
 * POST /api/ai/analyze-profile
 */
export const analyzeProfile = asyncHandler(async (req, res) => {
  const { instagramUrl } = req.body
  const userId = req.user.id

  const username = instagramUrl
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, '')
    .replace(/\/$/, '').replace(/^@/, '')
    .split('/')[0].split('?')[0]

  if (!username) throw new AppError('Invalid Instagram URL', 400)

  const user = await User.findById(userId)
  const usage = user.checkUsageLimit()
  if (!usage.canGenerate) throw new AppError('Daily limit reached.', 429)

  const { default: instagramScraper } = await import('../services/instagramScraper.js')
  const profileData = await instagramScraper.scrapeProfile(username)
  const posts = await instagramScraper.getRecentPosts(username, 15)

  const analysis = await agentOrchestrator.analyzeCreatorProfile(
    { ...profileData, username }, posts
  )

  const creatorProfile = await CreatorProfile.findOneAndUpdate(
    { userId },
    {
      userId, instagramUsername: username,
      profileData: {
        fullName: profileData.fullName, biography: profileData.biography,
        followers: profileData.followers, following: profileData.following,
        totalPosts: profileData.posts, avatar: profileData.avatar,
        isVerified: profileData.isVerified, engagementRate: profileData.engagement,
        lastScrapedAt: new Date()
      },
      voiceProfile: analysis.profileAnalysis?.voiceProfile || {},
      niche: analysis.profileAnalysis?.niche || {},
      audience: analysis.profileAnalysis?.audience || {},
      contentStrategy: analysis.profileAnalysis?.contentStrategy || {},
      healthMetrics: analysis.profileAnalysis?.healthMetrics || {},
      lastAnalyzedAt: new Date()
    },
    { upsert: true, new: true }
  )

  user.instagram = { username, profileUrl: instagramUrl, connectedAt: new Date() }
  await user.incrementUsage()

  res.json({
    success: true,
    data: { profile: creatorProfile, analysis, usage: user.checkUsageLimit() }
  })
})

/**
 * GET /api/ai/history
 */
export const getHistory = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 20 } = req.query
  const query = { userId: req.user.id }
  if (type) query.type = type

  const contents = await Content.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))

  const total = await Content.countDocuments(query)

  res.json({
    success: true,
    data: { contents, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } }
  })
})

/**
 * GET /api/ai/stats
 */
export const getAIStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const totalGenerated = await Content.countDocuments({ userId: req.user.id })

  res.json({
    success: true,
    data: {
      totalGenerated,
      usage: user.checkUsageLimit(),
      llmStats: agentOrchestrator.getStats()
    }
  })
})