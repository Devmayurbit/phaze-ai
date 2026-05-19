/**
 * AGENT 1: Profile Intelligence Engine
 * Analyzes creator voice, niche, audience, content strategy
 */

export default class ProfileIntelligenceEngine {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'analyzeProfile') return this.analyzeProfile(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async analyzeProfile({ profileData, posts }) {
    const { username, biography, followers, engagementRate } = profileData
    const captions = (posts || []).slice(0, 15).map(p => p.caption || '').filter(Boolean)
    const captionSample = captions.slice(0, 5).join('\n---\n')

    const result = await this.llm.generateJSON(`
You are an expert Instagram profile analyst. Analyze this creator deeply.

PROFILE:
- Username: @${username}
- Bio: "${biography || 'No bio'}"
- Followers: ${followers || 'Unknown'}
- Engagement Rate: ${engagementRate || 'Unknown'}%

RECENT CAPTIONS (sample):
${captionSample || 'No captions available'}

Analyze and return JSON:
{
  "voiceProfile": {
    "tone": "casual/professional/playful/authoritative/motivational",
    "emotionalEnergy": 0-100,
    "storytellingStyle": "description",
    "commonPhrases": ["phrase1", "phrase2", "phrase3"],
    "ctaPatterns": ["cta1", "cta2"],
    "authenticityScore": 0-100
  },
  "niche": {
    "primary": "main niche",
    "secondary": ["sub1", "sub2"],
    "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
    "expertiseLevel": "beginner/intermediate/expert"
  },
  "audience": {
    "ageRange": "18-25/25-35/etc",
    "interests": ["interest1", "interest2", "interest3"],
    "painPoints": ["pain1", "pain2", "pain3"],
    "peakActivityTimes": ["9:00 AM", "6:00 PM"]
  },
  "contentStrategy": {
    "bestPerformingTypes": ["reels", "carousels"],
    "optimalHashtagCount": 15,
    "bestPostingTimes": ["9 AM", "12 PM", "6 PM"],
    "postingFrequencyRecommendation": "3-5 per week"
  },
  "healthMetrics": {
    "overallScore": 0-100,
    "nicheClarity": 0-100,
    "audienceEngagement": 0-100,
    "contentConsistency": 0-100,
    "growthVelocity": 0-100
  },
  "recommendations": ["rec1", "rec2", "rec3", "rec4", "rec5"]
}`, {
      systemPrompt: 'You are an Instagram growth strategist with 10 years of experience. Be specific, data-driven, and actionable.',
      temperature: 0.6
    })

    return result.data
  }
}
