/**
 * ══════════════════════════════════════════════════
 * AI AGENT ORCHESTRATOR
 * Routes tasks to the right agent, manages context
 * ══════════════════════════════════════════════════
 */

import llmRouter from './llmRouter.js'
import ProfileIntelligenceEngine from './agents/profileIntelligence.js'
import HookPsychologyEngine from './agents/hookPsychology.js'
import CaptionCraftEngine from './agents/captionCraft.js'
import HashtagIntelligenceEngine from './agents/hashtagIntelligence.js'
import ScriptContentGenerator from './agents/scriptGenerator.js'
import EngagementOptimizer from './agents/engagementOptimizer.js'
import ViralContentDetector from './agents/viralDetector.js'
import logger from '../../utils/logger.js'

class AgentOrchestrator {
  constructor() {
    this.agents = {
      profileIntelligence: new ProfileIntelligenceEngine(llmRouter),
      viralDetector: new ViralContentDetector(llmRouter),
      hookPsychology: new HookPsychologyEngine(llmRouter),
      captionCraft: new CaptionCraftEngine(llmRouter),
      hashtagIntelligence: new HashtagIntelligenceEngine(llmRouter),
      scriptGenerator: new ScriptContentGenerator(llmRouter),
      engagementOptimizer: new EngagementOptimizer(llmRouter)
    }
  }

  /**
   * Execute a specific agent task
   */
  async execute(agentName, task, context) {
    const agent = this.agents[agentName]
    if (!agent) throw new Error(`Unknown agent: ${agentName}`)

    const startTime = Date.now()
    logger.info(`🤖 Agent [${agentName}] executing: ${task}`)

    try {
      const result = await agent.execute(task, context)
      const duration = Date.now() - startTime

      logger.info(`✅ Agent [${agentName}] completed in ${duration}ms`)

      return {
        ...result,
        agent: agentName,
        executionTimeMs: duration
      }
    } catch (error) {
      logger.error(`❌ Agent [${agentName}] failed: ${error.message}`)
      throw error
    }
  }

  /**
   * Analyze a creator profile (runs multiple agents)
   */
  async analyzeCreatorProfile(profileData, posts) {
    const results = await Promise.allSettled([
      this.execute('profileIntelligence', 'analyzeProfile', { profileData, posts }),
      this.execute('viralDetector', 'analyzePatterns', { posts }),
      this.execute('engagementOptimizer', 'analyzeSchedule', { posts, profileData })
    ])

    return {
      profileAnalysis: results[0].status === 'fulfilled' ? results[0].value : null,
      viralPatterns: results[1].status === 'fulfilled' ? results[1].value : null,
      growthStrategy: results[2].status === 'fulfilled' ? results[2].value : null,
      errors: results.filter(r => r.status === 'rejected').map(r => r.reason.message)
    }
  }

  /**
   * Generate content (hooks, captions, hashtags, scripts)
   */
  async generateContent(type, context) {
    const agentMap = {
      hooks: 'hookPsychology',
      captions: 'captionCraft',
      hashtags: 'hashtagIntelligence',
      script: 'scriptGenerator'
    }

    const agentName = agentMap[type]
    if (!agentName) throw new Error(`Unknown content type: ${type}`)

    return this.execute(agentName, 'generate', context)
  }

  getStats() {
    return llmRouter.getStats()
  }
}

export default new AgentOrchestrator()
