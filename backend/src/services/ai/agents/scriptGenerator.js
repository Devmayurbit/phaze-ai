/**
 * AGENT 6: Script & Content Generator
 * Timed reel scripts with visual directions
 */

export default class ScriptContentGenerator {
  constructor(llm) { this.llm = llm }

  async execute(task, context) {
    if (task === 'generate') return this.generateScript(context)
    throw new Error(`Unknown task: ${task}`)
  }

  async generateScript({ topic, niche, duration = 30, count = 3, creatorProfile = {} }) {
    const voice = creatorProfile?.voiceProfile || {}
    const wordCount = this.getWordCount(duration)

    const result = await this.llm.generateJSON(`
You are a viral reel scriptwriter for Instagram.

CONTEXT:
- Topic: ${topic}
- Niche: ${niche || 'general'}
- Duration: ${duration} seconds
- Word count target: ~${wordCount} words
- Creator voice: ${voice.tone || 'casual'}

Generate ${count} complete reel scripts.

SCRIPT STRUCTURE:
- [00:00-00:02] HOOK (grab attention in first 2 seconds)
- [00:02-00:${String(duration - 3).padStart(2, '0')}] MAIN CONTENT (value/entertainment)
- [00:${String(duration - 3).padStart(2, '0')}-00:${String(duration).padStart(2, '0')}] CTA (drive action)

Return JSON:
{
  "scripts": [
    {
      "title": "Script title",
      "duration": ${duration},
      "sections": [
        {
          "timing": "00:00-00:02",
          "label": "HOOK",
          "voiceover": "What you say",
          "visual": "What the viewer sees",
          "pacing": "fast|normal|slow"
        },
        {
          "timing": "00:02-00:${String(duration - 3).padStart(2, '0')}",
          "label": "MAIN",
          "voiceover": "Main content narration",
          "visual": "Visual directions",
          "pacing": "normal"
        },
        {
          "timing": "00:${String(duration - 3).padStart(2, '0')}-00:${String(duration).padStart(2, '0')}",
          "label": "CTA",
          "voiceover": "Call to action",
          "visual": "Visual direction",
          "pacing": "conversational"
        }
      ],
      "productionNotes": {
        "setting": "where to film",
        "props": ["prop1"],
        "lighting": "description",
        "suggestedAudio": "trending sound or type"
      },
      "score": 0-100,
      "estimatedViews": "range"
    }
  ],
  "topPick": 0
}

Rules:
- Sound NATURAL, like a real person talking
- Include pattern interrupts every 5-8 seconds
- Make the hook impossible to scroll past
- End with a clear, specific CTA`, {
      systemPrompt: 'You are a reel scriptwriter whose scripts have generated 100M+ views.',
      temperature: 0.8
    })

    return result.data
  }

  getWordCount(duration) {
    // Average speaking rate: ~2.5 words/second for reels
    return Math.round(duration * 2.5)
  }
}
