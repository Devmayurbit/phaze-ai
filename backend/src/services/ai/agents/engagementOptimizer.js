/**
 * AGENT 7: Engagement Optimizer & Growth Strategist
 * Posting schedule, content mix, growth recommendations
 */

export default class EngagementOptimizer {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'generate') return this.getGrowthRecommendations(context)
    if (task === 'analyzeSchedule') return this.analyzePostingSchedule(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async getGrowthRecommendations({ topic, niche, creatorProfile = {} }) {
    const profile = creatorProfile?.profileData || {}

    const result = await this.llm.generateJSON(`
You are an Instagram growth strategist.

CREATOR PROFILE:
- Niche: ${niche || creatorProfile?.niche?.primary || 'general'}
- Followers: ${profile.followers || 'unknown'}
- Engagement rate: ${profile.engagementRate || 'unknown'}%
- Topic focus: ${topic}

Generate a comprehensive growth strategy. Return JSON:
{
  "postingSchedule": {
    "optimalTimes": ["9:00 AM", "12:00 PM", "6:00 PM"],
    "bestDays": ["Tuesday", "Wednesday", "Friday"],
    "frequencyPerWeek": 4,
    "reasoning": "why these times"
  },
  "contentMix": {
    "reels": "50-60%",
    "carousels": "25-30%",
    "staticPosts": "10-15%",
    "stories": "daily",
    "reasoning": "why this mix"
  },
  "growthOpportunities": [
    {
      "opportunity": "description",
      "expectedImpact": "high|medium|low",
      "effort": "easy|moderate|hard",
      "timeframe": "1 week|1 month|3 months"
    }
  ],
  "weeklyActionPlan": [
    { "day": "Monday", "action": "what to do", "contentType": "type" },
    { "day": "Tuesday", "action": "what to do", "contentType": "type" },
    { "day": "Wednesday", "action": "what to do", "contentType": "type" },
    { "day": "Thursday", "action": "what to do", "contentType": "type" },
    { "day": "Friday", "action": "what to do", "contentType": "type" },
    { "day": "Saturday", "action": "what to do", "contentType": "type" },
    { "day": "Sunday", "action": "what to do", "contentType": "type" }
  ],
  "forecast": {
    "thirtyDays": { "followerGrowth": "range", "engagementChange": "percentage" },
    "ninetyDays": { "followerGrowth": "range", "engagementChange": "percentage" }
  },
  "topRecommendations": ["rec1", "rec2", "rec3", "rec4", "rec5"]
}`, {
      systemPrompt: 'You are a data-driven Instagram growth consultant. Be specific and actionable.',
      temperature: 0.6
    })

    return result.data
  }

  async analyzePostingSchedule({ posts, profileData }) {
    const postTimes = (posts || []).slice(0, 20).map(p => ({
      dayOfWeek: new Date(p.timestamp || Date.now()).toLocaleDateString('en-US', { weekday: 'long' }),
      hour: new Date(p.timestamp || Date.now()).getHours(),
      engagement: p.engagement || p.likes || 0
    }))

    const result = await this.llm.generateJSON(`
Analyze this posting schedule data and find optimal times.

POST TIMING DATA:
${JSON.stringify(postTimes)}

Followers: ${profileData?.followers || 'unknown'}

Return JSON:
{
  "analysis": {
    "currentFrequency": "X posts per week",
    "currentBestTime": "time with highest engagement",
    "currentWorstTime": "time with lowest engagement"
  },
  "optimizedSchedule": {
    "peakHours": [{ "hour": "9:00 AM", "avgEngagement": 0, "day": "Tuesday" }],
    "bestDays": ["day1", "day2", "day3"],
    "recommendedFrequency": "X per week",
    "avoidTimes": ["time1", "time2"]
  },
  "insights": ["insight1", "insight2", "insight3"]
}`, { temperature: 0.4 })

    return result.data
  }
}
