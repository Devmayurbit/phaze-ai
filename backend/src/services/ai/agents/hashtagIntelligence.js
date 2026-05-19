/**
 * AGENT 5: Hashtag Intelligence Engine
 * Volume-stratified hashtag strategy
 */

export default class HashtagIntelligenceEngine {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'generate') return this.generateHashtags(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async generateHashtags({ topic, niche, count = 20, creatorProfile = {} }) {
    const followers = creatorProfile?.profileData?.followers || 'unknown'

    const result = await this.llm.generateJSON(`
You are an Instagram hashtag strategist.

CONTEXT:
- Topic: ${topic}
- Niche: ${niche || 'general'}
- Followers: ${followers}
- Account size: ${this.getAccountSize(followers)}

Generate a strategic hashtag mix of ${count} hashtags:

STRATEGY (volume-based mix):
- 3 HIGH volume (1M+ posts) → broad reach
- 7 MEDIUM volume (100K-1M posts) → balanced reach + relevance
- 5 LOW volume (10K-100K posts) → high engagement, niche-specific
- 3 TRENDING → currently rising hashtags
- 2 BRANDED → unique to this creator/niche

Return JSON:
{
  "strategy": {
    "highVolume": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "mediumVolume": ["#h1", "#h2", "#h3", "#h4", "#h5", "#h6", "#h7"],
    "lowVolume": ["#h1", "#h2", "#h3", "#h4", "#h5"],
    "trending": ["#h1", "#h2", "#h3"],
    "branded": ["#h1", "#h2"]
  },
  "recommended": ["top 15 hashtags in optimal order"],
  "analysis": {
    "estimatedReach": "number or range",
    "competitionLevel": "low|medium|high",
    "nicheRelevance": 0-100,
    "optimalCount": 15
  },
  "tips": ["tip1", "tip2", "tip3"]
}

Rules:
- All hashtags MUST include the # symbol
- No banned/shadowbanned hashtags
- Mix specific + broad for maximum reach
- Consider account size for competition level`, {
      systemPrompt: 'You are an Instagram SEO expert who has helped 1000+ creators grow.',
      temperature: 0.6
    })

    return result.data
  }

  getAccountSize(followers) {
    const f = Number(followers) || 0
    if (f < 1000) return 'nano (<1K)'
    if (f < 10000) return 'micro (1K-10K)'
    if (f < 100000) return 'mid-tier (10K-100K)'
    if (f < 1000000) return 'macro (100K-1M)'
    return 'mega (1M+)'
  }
}
