import { OpenAI } from 'openai'
import dynamicPromptBuilder from './dynamicPromptBuilder.js'

class AIContentGenerator {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.warn('⚠️  WARNING: OPENAI_API_KEY not set in .env. Set it to enable OpenAI GPT-4 content generation.')
    }
    this.client = apiKey ? new OpenAI({ apiKey }) : null
    this.model = 'gpt-4-turbo'
    this.maxTokens = 2000
  }

  /**
   * Generate viral hooks using OpenAI with dynamic prompts
   */
  async generateHooks(profileData, analysis, count = 10) {
    try {
      if (!this.client) {
        return this.getFallbackHooks(analysis?.niche || 'general', count)
      }

      // Use dynamic prompt builder
      const prompt = dynamicPromptBuilder.buildHookPrompt(analysis, count)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return this.parseHooks(content, count)
    } catch (error) {
      console.error('[OpenAI Hook Generator Error]', error.message)
      return this.getFallbackHooks(analysis?.niche || 'general', count)
    }
  }

  /**
   * Generate captions using OpenAI with dynamic prompts
   */
  async generateCaptions(profileData, analysis, count = 5) {
    try {
      if (!this.client) {
        return this.getFallbackCaptions(analysis?.niche || 'general', count)
      }

      const prompt = dynamicPromptBuilder.buildCaptionPrompt(analysis, count)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.85,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return this.parseCaptions(content, count)
    } catch (error) {
      console.error('[OpenAI Caption Generator Error]', error.message)
      return this.getFallbackCaptions(analysis?.niche || 'general', count)
    }
  }

  /**
   * Generate video scripts using OpenAI
   */
  async generateScripts(profileData, analysis, duration = '60s', count = 3) {
    try {
      if (!this.client) {
        return this.getFallbackScripts(analysis?.niche || 'general', duration, count)
      }

      const prompt = dynamicPromptBuilder.buildScriptPrompt(analysis, duration, count)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2500,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return this.parseScripts(content, count)
    } catch (error) {
      console.error('[OpenAI Script Generator Error]', error.message)
      return this.getFallbackScripts(analysis?.niche || 'general', duration, count)
    }
  }

  /**
   * Generate hashtags using OpenAI
   */
  async generateHashtags(profileData, analysis, count = 20) {
    try {
      if (!this.client) {
        return this.getFallbackHashtags(analysis?.niche || 'general', count)
      }

      const prompt = dynamicPromptBuilder.buildHashtagPrompt(analysis, count)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return this.parseHashtags(content, count)
    } catch (error) {
      console.error('[OpenAI Hashtag Generator Error]', error.message)
      return this.getFallbackHashtags(analysis?.niche || 'general', count)
    }
  }

  /**
   * Generate trend analysis using OpenAI
   */
  async generateTrendAnalysis(profileData, analysis) {
    try {
      if (!this.client) {
        return this.getFallbackTrendAnalysis()
      }

      const prompt = dynamicPromptBuilder.buildTrendPrompt(analysis)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0].message.content
      return this.parseTrendAnalysis(content)
    } catch (error) {
      console.error('[OpenAI Trend Analysis Error]', error.message)
      return this.getFallbackTrendAnalysis()
    }
  }

  // ===================== Parsing Methods =====================

  parseHooks(jsonText, count) {
    try {
      const parsed = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText
      const hooks = parsed.hooks || parsed.hook || []
      return hooks.slice(0, count)
        .filter(h => h && h.length > 10)
        .map(h => typeof h === 'string' ? h : String(h))
    } catch (e) {
      return this.getFallbackHooks('general', count)
    }
  }

  parseCaptions(jsonText, count) {
    try {
      const parsed = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText
      const captions = parsed.captions || parsed.caption || []
      return captions.slice(0, count)
        .filter(c => c && c.length > 50)
        .map(c => typeof c === 'string' ? c : String(c))
    } catch (e) {
      return this.getFallbackCaptions('general', count)
    }
  }

  parseScripts(jsonText, count) {
    try {
      const parsed = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText
      const scripts = parsed.scripts || parsed.script || []
      return scripts.slice(0, count)
        .map(s => typeof s === 'string' ? s : String(s))
    } catch (e) {
      return this.getFallbackScripts('general', '60s', count)
    }
  }

  parseHashtags(jsonText, count) {
    try {
      const parsed = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText
      const hashtags = parsed.hashtags || parsed.hashtag || parsed.tags || []
      return hashtags.slice(0, count)
        .filter(h => h)
        .map(h => {
          const tag = String(h).trim()
          return tag.startsWith('#') ? tag : `#${tag}`
        })
    } catch (e) {
      return this.getFallbackHashtags('general', count)
    }
  }

  parseTrendAnalysis(jsonText) {
    try {
      const parsed = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText
      return {
        trending: parsed.trending || [],
        contentGaps: parsed.gaps || [],
        viralPatterns: parsed.patterns || [],
        opportunities: parsed.opportunities || [],
        recommendations: parsed.recommendations || []
      }
    } catch (e) {
      return this.getFallbackTrendAnalysis()
    }
  }

  // ===================== Fallback Methods =====================

  getFallbackHooks(niche = 'general', count = 10) {
    const templates = {
      'Fitness & Gym': [
        '🔥 Most people are doing abs wrong (here\'s why)',
        'This one workout changed my life 💪',
        'Stop wasting time at the gym 🚫',
        'The secret nobody tells you about gains',
        'Your gym routine is OLD TECH 💻',
      ],
      'Cooking & Food': [
        'This recipe will blow your mind 🤯',
        'Chefs HATE this one simple trick',
        'Restaurant owners don\'t want you to know this',
        'Tastes better than any 5-star restaurant',
        'I made this in under 10 minutes 🔥',
      ],
      'Fashion & Style': [
        '✨ Your outfit is stopping you from success',
        'This styling hack changes everything',
        'Designer brands DON\'T want you to know this',
        'Wear this and get compliments immediately',
        'I got 100% more attention after this',
      ],
      'Travel & Adventure': [
        '🌍 This destination is INSANE',
        'Travel hack airlines don\'t want you to see',
        'Save $1000 on your next trip with this',
        'Most expensive mistake I made traveling',
        'Hidden gem nobody knows about 🗺️',
      ],
    }

    const fallback = templates[niche] || templates['general']
    const result = []
    for (let i = 0; i < count; i++) {
      result.push(fallback[i % fallback.length])
    }
    return result
  }

  getFallbackCaptions(niche = 'general', count = 5) {
    return Array(count).fill(0).map((_, i) =>
      `📌 Content for ${niche}\n\nHere's what I learned today that changed everything. The key is consistency and showing up even when it's hard. 💯\n\nWhat's your biggest challenge? Drop it in the comments! 👇\n\n#${niche.toLowerCase().replace(/\s/g, '')} #content`
    )
  }

  getFallbackScripts(niche = 'general', duration = '60s', count = 2) {
    return Array(count).fill(0).map((_, i) =>
      `SCRIPT ${i + 1}: ${niche} Tip\nHOOK: "You're doing this wrong and losing out"\nBODY: \n- Here's what works\n- This is the secret\n- Trust me on this\nCTA: Follow for more tips!`
    )
  }

  getFallbackHashtags(niche = 'general', count = 20) {
    const baseHashtags = [
      '#content', '#instagrams', '#viral', '#trending', '#creator',
      '#socialmedia', '#reels', '#shorts', '#growth', '#engagement',
      '#tiktokviral', '#instadaily', '#explorepage', '#foryou', '#viral',
      '#instagood', '#photooftheday', '#picoftheday', '#instadaily', '#instagram'
    ]
    return baseHashtags.slice(0, count)
  }

  getFallbackTrendAnalysis() {
    return {
      trending: ['Trending Topic 1', 'Trending Topic 2', 'Trending Topic 3'],
      contentGaps: ['Gap 1', 'Gap 2'],
      viralPatterns: ['Pattern 1', 'Pattern 2'],
      opportunities: ['Opportunity 1', 'Opportunity 2'],
      recommendations: ['Recommendation 1', 'Recommendation 2', 'Recommendation 3']
    }
  }
}

export default new AIContentGenerator()
