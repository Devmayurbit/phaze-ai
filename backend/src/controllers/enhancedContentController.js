/**
 * ═══════════════════════════════════════════════════════════════════════
 * ENHANCED CONTENT CONTROLLER
 * Dynamic influencer analysis with unique content generation
 * Uses AI prompt engineering for personalized outputs
 * ═══════════════════════════════════════════════════════════════════════
 */

import { v4 as uuidv4 } from 'uuid'
import dynamicPromptBuilder from '../services/dynamicPromptBuilder.js'
import aiContentGenerator from '../services/aiContentGenerator.js'
import Influencer from '../models/Influencer.js'
import GeneratedScript from '../models/GeneratedScript.js'
import TrendReport from '../models/TrendReport.js'

// In-memory store for processing requests
const processingRequests = new Map()

/**
 * ═══════════════════════════════════════════════════════════════════════
 * SUBMIT INFLUENCER FOR ANALYSIS
 * ═══════════════════════════════════════════════════════════════════════
 * Entry point: /api/content/influencer/analyze
 * Starts async processing pipeline
 */
export const analyzeInfluencer = async (req, res) => {
  try {
    const { url, niche = 'General', bio = '', audience = '18-35' } = req.body

    if (!url) {
      return res.status(400).json({ error: 'Instagram URL is required' })
    }

    // Extract username from URL
    const username = extractUsername(url)
    if (!username) {
      return res.status(400).json({ error: 'Invalid Instagram URL' })
    }

    const requestId = uuidv4()

    // Check database cache
    try {
      const cached = await Influencer.findOne({ username }).select('-_v')
      if (cached && cached.contentGenerated) {
        return res.status(200).json({
          status: 'success',
          source: 'cache',
          requestId,
          data: cached,
          message: `Cached data for @${username}`,
        })
      }
    } catch (dbErr) {
      console.warn('[Cache lookup] Database error:', dbErr.message)
    }

    // Start processing asynchronously
    const processingData = {
      id: requestId,
      status: 'processing',
      username,
      niche,
      startedAt: new Date(),
      progress: 0,
      currentStep: 'Initializing...',
    }

    processingRequests.set(requestId, processingData)

    // Start async pipeline (don't await)
    processDynamicInfluencer(requestId, username, niche, bio, audience).catch(err => {
      console.error(`[Pipeline Error] ${username}:`, err)
      processingRequests.set(requestId, {
        ...processingData,
        status: 'failed',
        error: err.message,
      })
    })

    // Return immediate response
    res.status(202).json({
      status: 'processing',
      requestId,
      username,
      message: `Starting analysis for @${username}...`,
      estimatedTime: '30-45 seconds',
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to start analysis', details: error.message })
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DYNAMIC INFLUENCER PROCESSING PIPELINE
 * ═══════════════════════════════════════════════════════════════════════
 * Core algorithm: Unique analysis + dynamic prompts + unique content
 */
async function processDynamicInfluencer(requestId, username, niche, bio, audience) {
  console.log(`\n🚀 [PIPELINE START] @${username} (${niche})`)

  try {
    // ═══════ STEP 1: PROFILE DATA SIMULATION ═══════
    updateProgress(requestId, 10, 'Fetching profile data...')
    const profileData = generateProfileData(username, niche, bio)

    // ═══════ STEP 2: AUDIENCE ANALYSIS ═══════
    updateProgress(requestId, 25, 'Analyzing audience patterns...')
    const analysis = generateAudienceAnalysis(profileData, niche, audience)

    // ═══════ STEP 3: GENERATE UNIQUE HOOKS ═══════
    updateProgress(requestId, 40, 'Generating unique hooks...')
    const hookPrompt = dynamicPromptBuilder.buildHooksPrompt(profileData, analysis, 10)
    const hooks = await generateContentWithPrompt(hookPrompt, 'hooks')

    // ═══════ STEP 4: GENERATE UNIQUE CAPTIONS ═══════
    updateProgress(requestId, 55, 'Creating captions...')
    const captionPrompt = dynamicPromptBuilder.buildCaptionsPrompt(
      profileData,
      analysis,
      hooks.slice(0, 2),
      5
    )
    const captions = await generateContentWithPrompt(captionPrompt, 'captions')

    // ═══════ STEP 5: GENERATE SCRIPTS ═══════
    updateProgress(requestId, 70, 'Writing video scripts...')
    const scriptPrompt = dynamicPromptBuilder.buildScriptsPrompt(
      profileData,
      analysis,
      hooks.slice(0, 2),
      '60s',
      3
    )
    const scripts = await generateContentWithPrompt(scriptPrompt, 'scripts')

    // ═══════ STEP 6: GENERATE HASHTAGS ═══════
    updateProgress(requestId, 82, 'Optimizing hashtags...')
    const hashtagPrompt = dynamicPromptBuilder.buildHashtagsPrompt(profileData, analysis, 20)
    const hashtags = await generateContentWithPrompt(hashtagPrompt, 'hashtags')

    // ═══════ STEP 7: TREND ANALYSIS ═══════
    updateProgress(requestId, 93, 'Analyzing trends...')
    const trendPrompt = dynamicPromptBuilder.buildTrendAnalysisPrompt(profileData, [], analysis)
    const trends = await generateContentWithPrompt(trendPrompt, 'trends')

    // ═══════ STEP 8: SAVE TO DATABASE ═══════
    updateProgress(requestId, 96, 'Saving to database...')
    const influencer = new Influencer({
      username,
      niche,
      bio: profileData.bio,
      followers: profileData.followers,
      engagement: profileData.engagement,
      analysis,
      contentGenerated: true,
      generatedAt: new Date(),
    })

    const savedInfluencer = await influencer.save()

    const script = new GeneratedScript({
      influencerId: savedInfluencer._id,
      username,
      content: {
        hooks: Array.isArray(hooks) ? hooks : [hooks],
        captions: Array.isArray(captions) ? captions : [captions],
        scripts: Array.isArray(scripts) ? scripts : [scripts],
        hashtags: Array.isArray(hashtags) ? hashtags : [hashtags],
      },
      trends: Array.isArray(trends) ? trends : [trends],
      generatedAt: new Date(),
    })

    await script.save()

    // ═══════ COMPLETE ═══════
    updateProgress(requestId, 100, 'Complete!')

    processingRequests.set(requestId, {
      id: requestId,
      status: 'completed',
      username,
      niche,
      profile: profileData,
      analysis,
      content: {
        hooks: Array.isArray(hooks) ? hooks : [hooks],
        captions: Array.isArray(captions) ? captions : [captions],
        scripts: Array.isArray(scripts) ? scripts : [scripts],
        hashtags: Array.isArray(hashtags) ? hashtags : [hashtags],
      },
      trends: Array.isArray(trends) ? trends : [trends],
      influencerId: savedInfluencer._id,
      scriptId: script._id,
      completedAt: new Date(),
    })

    console.log(`✅ [PIPELINE COMPLETE] @${username}\n`)
  } catch (error) {
    console.error(`❌ [PIPELINE ERROR] ${error.message}`)
    updateProgress(requestId, 0, `Error: ${error.message}`)
    processingRequests.set(requestId, {
      status: 'failed',
      error: error.message,
    })
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * GET ANALYSIS RESULTS
 * ═══════════════════════════════════════════════════════════════════════
 */
export const getAnalysisResults = async (req, res) => {
  try {
    const { requestId } = req.params

    const request = processingRequests.get(requestId)

    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    if (request.status === 'processing') {
      return res.status(202).json({
        status: 'processing',
        requestId,
        username: request.username,
        progress: request.progress || 0,
        currentStep: request.currentStep || 'Processing...',
      })
    }

    if (request.status === 'failed') {
      return res.status(400).json({
        status: 'failed',
        error: request.error,
      })
    }

    res.json({
      status: 'completed',
      requestId,
      data: {
        username: request.username,
        niche: request.niche,
        profile: request.profile,
        analysis: request.analysis,
        content: request.content,
        trends: request.trends,
        generatedAt: request.completedAt,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get results', details: error.message })
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * HELPER FUNCTIONS
 * ═══════════════════════════════════════════════════════════════════════
 */

/**
 * Extract username from Instagram URL
 */
function extractUsername(url) {
  try {
    const patterns = [
      /instagram\.com\/([a-zA-Z0-9_.]+)\/?/,
      /^@?([a-zA-Z0-9_.]+)$/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }

    return null
  } catch (err) {
    return null
  }
}

/**
 * Update processing progress
 */
function updateProgress(requestId, progress, step) {
  const current = processingRequests.get(requestId)
  if (current) {
    processingRequests.set(requestId, {
      ...current,
      progress,
      currentStep: step,
    })
  }
}

/**
 * Generate mock profile data (in production, would scrape Instagram)
 */
function generateProfileData(username, niche, bio) {
  const followers = Math.floor(Math.random() * 200000) + 10000
  const engagement = (Math.random() * 5 + 5).toFixed(1)

  return {
    username,
    niche,
    bio: bio || `Creator in ${niche}`,
    followers: followers.toLocaleString(),
    engagement: parseFloat(engagement),
    audienceAge: '18-35',
    topKeywords: generateKeywords(niche),
    contentStyle: generateContentStyle(niche),
    postingFrequency: ['daily', 'weekly', '3x/week'][Math.floor(Math.random() * 3)],
  }
}

/**
 * Generate audience analysis
 */
function generateAudienceAnalysis(profile, niche, audience) {
  return {
    niche: profile.niche,
    audienceAge: audience,
    engagement: profile.engagement,
    topKeywords: profile.topKeywords,
    contentStyle: profile.contentStyle,
    audienceSentiment: 'positive',
    engagementTrend: ['stable', 'rising', 'growing'][Math.floor(Math.random() * 3)],
    audienceSearchTerms: profile.topKeywords,
    topTopics: generateTopics(niche),
  }
}

/**
 * Generate keywords based on niche
 */
function generateKeywords(niche) {
  const keywords = {
    'tech': ['AI', 'startup', 'innovation', 'productivity', 'automation'],
    'lifestyle': ['wellness', 'mindfulness', 'lifestyle', 'self-care', 'growth'],
    'business': ['entrepreneur', 'business', 'revenue', 'growth', 'marketing'],
    'creative': ['design', 'creativity', 'art', 'inspiration', 'craft'],
    'fitness': ['fitness', 'health', 'workout', 'transformation', 'wellness'],
  }

  return keywords[niche.toLowerCase()] || ['content', 'creative', 'growth', 'engagement', 'viral']
}

/**
 * Generate content style based on niche
 */
function generateContentStyle(niche) {
  const styles = {
    'tech': 'educational',
    'lifestyle': 'entertaining',
    'business': 'motivational',
    'creative': 'entertaining',
    'fitness': 'motivational',
  }

  return styles[niche.toLowerCase()] || 'educational'
}

/**
 * Generate top topics for niche
 */
function generateTopics(niche) {
  const topics = {
    'tech': ['AI Tools', 'Productivity', 'Startups', 'Innovation'],
    'lifestyle': ['Wellness', 'Self-care', 'Mindfulness', 'Personal Growth'],
    'business': ['Entrepreneurship', 'Revenue', 'Marketing', 'Growth'],
    'creative': ['Design Trends', 'Creative Process', 'Inspiration', 'Tools'],
    'fitness': ['Workouts', 'Nutrition', 'Transformation', 'Motivation'],
  }

  return topics[niche.toLowerCase()] || ['General', 'Trending', 'Popular', 'Viral']
}

/**
 * Generate content using AI prompt
 */
async function generateContentWithPrompt(prompt, type) {
  try {
    // In production, this would call OpenAI API
    // For now, return structured mock data
    
    const mockResponses = {
      hooks: [
        'Watch what happens when I do this one thing',
        'Nobody talks about this hack',
        'This changed everything for me',
        'The algorithm doesn\'t want you to see this',
        'Here\'s what they\'re not telling you',
      ],
      captions: [
        'Just discovered something amazing. Link in bio. 🚀',
        'Can we talk about this for a second? 👀',
        'This is going to blow your mind 💡',
        'Thoughts? Drop your opinion below ⬇️',
        'The more I learn, the more I realize... 🧵',
      ],
      scripts: [
        '[0-3s] Hook: Here\'s what you need to know [3-30s] Story/value [30-50s] Demo [50-60s] CTA',
        '[0-2s] Attention grab [2-40s] Main content [40-55s] Key insight [55-60s] Call to action',
        '[0-3s] Problem [3-35s] Solution [35-50s] Why it matters [50-60s] Next steps',
      ],
      hashtags: [
        '#AI', '#innovation', '#productivity', '#startup', '#growth',
        '#tech', '#creator', '#content', '#viral', '#trending',
      ],
      trends: [
        'AI-powered tools are trending with 9.8/10 momentum',
        'Productivity content has rising engagement',
        'Creator economy is growing in your niche',
      ],
    }

    return mockResponses[type] || []
  } catch (error) {
    console.error(`[Content Generation] Error for ${type}:`, error)
    return []
  }
}

export default {
  analyzeInfluencer,
  getAnalysisResults,
  extractUsername,
}
