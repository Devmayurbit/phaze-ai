/**
 * AGENT 2: Viral Content Detector
 * Analyzes viral mechanics and patterns
 */

export default class ViralContentDetector {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'analyzePatterns') return this.analyzeViralPatterns(context)
    if (task === 'predictViral') return this.predictViralScore(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async analyzeViralPatterns({ posts, niche }) {
    const postSamples = (posts || []).slice(0, 10).map(p => ({
      caption: (p.caption || '').substring(0, 200),
      likes: p.likes || 0,
      comments: p.comments || 0,
      engagement: p.engagement || 0
    }))

    const result = await this.llm.generateJSON(`
Analyze these Instagram posts for viral patterns.

NICHE: ${niche || 'general'}

POSTS DATA:
${JSON.stringify(postSamples, null, 2)}

Identify viral mechanics and return JSON:
{
  "viralPatterns": {
    "hookTypes": [
      { "type": "curiosity|pain|authority|etc", "frequency": 0-100, "effectiveness": 0-100 }
    ],
    "contentFormats": [
      { "format": "format type", "avgEngagement": 0, "recommendation": "tip" }
    ],
    "emotionalTriggers": ["trigger1", "trigger2", "trigger3"],
    "captionPatterns": {
      "optimalLength": "word count range",
      "emojiUsage": "description",
      "ctaEffectiveness": "analysis"
    }
  },
  "topPerformingContent": {
    "characteristics": ["char1", "char2", "char3"],
    "commonElements": ["element1", "element2"]
  },
  "opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "recommendations": ["rec1", "rec2", "rec3"]
}`, { temperature: 0.5 })

    return result.data
  }

  async predictViralScore({ content, hook, caption, creatorProfile }) {
    const result = await this.llm.generateJSON(`
Predict the viral potential of this Instagram content.

CONTENT:
- Hook: "${hook || 'Not provided'}"
- Caption: "${(caption || '').substring(0, 300)}"
- Creator niche: ${creatorProfile?.niche?.primary || 'general'}
- Followers: ${creatorProfile?.profileData?.followers || 'unknown'}

Score this content and return JSON:
{
  "viralScore": 0-100,
  "confidence": 0-100,
  "estimatedEngagement": {
    "likes": "range",
    "comments": "range",
    "shares": "range",
    "saves": "range"
  },
  "strengths": ["s1", "s2"],
  "weaknesses": ["w1", "w2"],
  "improvements": ["imp1", "imp2", "imp3"]
}`, { temperature: 0.4 })

    return result.data
  }
}
