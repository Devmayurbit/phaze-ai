/**
 * AGENT 4: Caption Craft Engine
 * Engagement-optimized captions with strategic CTAs
 */

export default class CaptionCraftEngine {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'generate') return this.generateCaptions(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async generateCaptions({ topic, niche, count = 5, creatorProfile = {} }) {
    const voice = creatorProfile?.voiceProfile || {}

    const result = await this.llm.generateJSON(`
You are a premium Instagram caption writer.

CONTEXT:
- Topic: ${topic}
- Niche: ${niche || 'general'}
- Voice: ${voice.tone || 'casual'}
- Common phrases: ${(voice.commonPhrases || []).join(', ') || 'none specified'}

Generate ${count} Instagram captions. Each must:
1. Open with a strong hook (first line = scroll stopper)
2. Deliver value or tell a story in the body
3. End with a strategic CTA (question, challenge, or ask)
4. Use emojis strategically (3-5 max, not spammy)
5. Be 80-150 words
6. Sound like a REAL human, not AI

Return JSON:
{
  "captions": [
    {
      "text": "Full caption text here with\\nemojis and line breaks",
      "hook": "The opening line",
      "cta": "The call-to-action used",
      "ctaType": "question|challenge|save|share|comment",
      "score": 0-100,
      "bestFor": "reel|carousel|static|story",
      "estimatedEngagementLift": "percentage"
    }
  ],
  "topPick": 0
}`, {
      systemPrompt: 'You are an Instagram caption expert. Your captions get 3x more comments than average.',
      temperature: 0.8
    })

    return result.data
  }
}
