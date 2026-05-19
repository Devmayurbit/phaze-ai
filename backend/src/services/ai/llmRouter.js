/**
 * ══════════════════════════════════════════════════
 * LLM ROUTER — Free-Tier AI Engine
 * Primary: Gemini Flash (FREE 1M tokens/day)
 * Fallback: HuggingFace (FREE)
 * Emergency: OpenAI (paid, use sparingly)
 * ══════════════════════════════════════════════════
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { HfInference } from '@huggingface/inference'
import OpenAI from 'openai'
import logger from '../../utils/logger.js'

class LLMRouter {
  constructor() {
    // Primary: Gemini Flash (FREE)
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      this.geminiModel = this.gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
      logger.info('🤖 Gemini Flash loaded (FREE tier)')
    }

    // Fallback: HuggingFace (FREE)
    if (process.env.HUGGINGFACE_API_KEY) {
      this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY)
      logger.info('🤗 HuggingFace loaded (FREE tier)')
    }

    // Emergency: OpenAI (PAID — use sparingly)
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      logger.info('⚡ OpenAI loaded (paid fallback)')
    }

    this.stats = { gemini: 0, hf: 0, openai: 0, errors: 0 }
  }

  /**
   * Generate text using the best available free model
   */
  async generate(prompt, options = {}) {
    const { temperature = 0.7, maxTokens = 2000, systemPrompt = '' } = options
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt

    // Try 1: Gemini Flash (FREE)
    if (this.geminiModel) {
      try {
        const result = await this.geminiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens
          }
        })
        const text = result.response.text()
        this.stats.gemini++
        return { text, model: 'gemini-1.5-flash', cost: 0 }
      } catch (error) {
        logger.warn(`Gemini failed: ${error.message}`)
      }
    }

    // Try 2: HuggingFace (FREE)
    if (this.hf) {
      try {
        const result = await this.hf.textGeneration({
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          inputs: fullPrompt,
          parameters: { max_new_tokens: maxTokens, temperature }
        })
        this.stats.hf++
        return { text: result.generated_text, model: 'mixtral-8x7b', cost: 0 }
      } catch (error) {
        logger.warn(`HuggingFace failed: ${error.message}`)
      }
    }

    // Try 3: OpenAI (PAID — last resort)
    if (this.openai) {
      try {
        const messages = []
        if (systemPrompt) messages.push({ role: 'system', content: systemPrompt })
        messages.push({ role: 'user', content: prompt })

        const result = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          temperature,
          max_tokens: maxTokens
        })
        this.stats.openai++
        return {
          text: result.choices[0].message.content,
          model: 'gpt-3.5-turbo',
          cost: (result.usage?.total_tokens || 0) * 0.000002
        }
      } catch (error) {
        logger.warn(`OpenAI failed: ${error.message}`)
      }
    }

    this.stats.errors++
    throw new Error('All LLM providers failed. Check API keys.')
  }

  /**
   * Generate structured JSON output
   */
  async generateJSON(prompt, options = {}) {
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no code blocks. Just the raw JSON object.`

    const result = await this.generate(jsonPrompt, options)

    try {
      // Try to extract JSON from response
      let text = result.text.trim()

      // Remove markdown code blocks if present
      text = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '')
      text = text.trim()

      const parsed = JSON.parse(text)
      return { data: parsed, model: result.model, cost: result.cost }
    } catch {
      // Try to find JSON in the response
      const jsonMatch = result.text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
      if (jsonMatch) {
        return { data: JSON.parse(jsonMatch[0]), model: result.model, cost: result.cost }
      }
      throw new Error('Failed to parse LLM response as JSON')
    }
  }

  /**
   * Get usage stats
   */
  getStats() {
    return {
      ...this.stats,
      total: this.stats.gemini + this.stats.hf + this.stats.openai,
      providers: {
        gemini: !!this.geminiModel,
        huggingface: !!this.hf,
        openai: !!this.openai
      }
    }
  }
}

// Singleton
export default new LLMRouter()
