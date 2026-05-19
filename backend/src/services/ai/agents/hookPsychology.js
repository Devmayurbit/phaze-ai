/**
 * AGENT 3: Hook Psychology Engine
 * 7 psychological hook types with scoring
 */

export default class HookPsychologyEngine {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'generate') return this.generateHooks(context)
    if (task === 'score') return this.scoreHooks(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async generateHooks({ topic, niche, count = 10, creatorProfile = {} }) {
    const voice = creatorProfile?.voiceProfile || {}
    const audience = creatorProfile?.audience || {}

    const result = await this.llm.generateJSON(`
You are a viral content psychologist specializing in Instagram hooks that STOP the scroll.

CONTEXT:
- Topic: ${topic}
- Niche: ${niche || 'general'}
- Creator Voice: ${voice.tone || 'casual'}
- Audience: ${audience.ageRange || '18-35'} year-olds
- Audience Pain Points: ${(audience.painPoints || []).join(', ') || 'unknown'}

Generate exactly ${count} hooks across these 7 psychology types:

1. CURIOSITY (knowledge gap) — "You won't believe...", "The secret to..."
2. PAIN POINT (relatable struggle) — "Tired of...", "Stop doing..."
3. AUTHORITY (credibility) — "After 5 years of...", "As a..."
4. URGENCY (time pressure) — "Before it's too late...", "Only works if..."
5. ASPIRATION (dream state) — "Imagine if...", "What if you could..."
6. STORYTELLING (narrative) — "Last week I...", "Here's what happened..."
7. CONTROVERSY (challenge beliefs) — "Unpopular opinion:", "Everyone's wrong about..."

Return JSON:
{
  "hooks": [
    {
      "text": "hook text here (8-15 words max)",
      "type": "curiosity|pain|authority|urgency|aspiration|storytelling|controversy",
      "score": 0-100,
      "whyItWorks": "brief explanation",
      "bestFor": "reel|carousel|story|post"
    }
  ],
  "topPick": {
    "text": "the single best hook",
    "type": "type",
    "score": 95,
    "whyItWorks": "explanation"
  }
}

Rules:
- Each hook must be 8-15 words MAX
- Sound like a real creator, NOT robotic
- Match the ${voice.tone || 'casual'} tone
- Create genuine curiosity or emotion
- Include at least 1 hook per type`, {
      systemPrompt: 'You are a viral copywriter who has written hooks for creators with 10M+ followers. Your hooks stop the scroll.',
      temperature: 0.8
    })

    return result.data
  }

  async scoreHooks({ hooks, creatorProfile }) {
    const result = await this.llm.generateJSON(`
Score these hooks for viral potential on Instagram.

Creator niche: ${creatorProfile?.niche?.primary || 'general'}
Creator voice: ${creatorProfile?.voiceProfile?.tone || 'casual'}

Hooks to score:
${hooks.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Return JSON:
{
  "scores": [
    {
      "hook": "original hook text",
      "score": 0-100,
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1"],
      "improvedVersion": "better version of the hook"
    }
  ]
}`, { temperature: 0.5 })

    return result.data
  }
}
