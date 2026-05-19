/**
 * ============================================================================
 * ADVANCED AI CONTENT CONTROLLER
 * ============================================================================
 * Comprehensive controller for AI-powered content generation including:
 * - Dynamic content generation with multiple AI strategies
 * - Advanced caching and optimization
 * - Request queuing and processing
 * - Performance monitoring and analytics
 * - Error recovery and fallback mechanisms
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid'
import aiContentGenerator from '../services/aiContentGenerator.js'
import dynamicPromptBuilder from '../services/dynamicPromptBuilder.js'
import instagramAnalyzer from '../services/instagramAnalyzer.js'
import trendAnalyzer from '../services/trendAnalyzer.js'
import GeneratedScript from '../models/GeneratedScript.js'
import Analytics from '../models/Analytics.js'

/**
 * Advanced Logging System
 */
class AIControllerLogger {
  constructor() {
    this.requestLog = []
    this.performanceMetrics = new Map()
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      ...data
    }
    console.log(`[${level}] [AI Controller] ${message}`, data)
    return logEntry
  }

  info(message, data) { return this.log('INFO', message, data) }
  warn(message, data) { return this.log('WARN', message, data) }
  error(message, data) { return this.log('ERROR', message, data) }
  debug(message, data) { return this.log('DEBUG', message, data) }

  recordPerformance(operation, duration, success) {
    if (!this.performanceMetrics.has(operation)) {
      this.performanceMetrics.set(operation, {
        total: 0,
        successful: 0,
        failed: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0
      })
    }

    const metrics = this.performanceMetrics.get(operation)
    metrics.total++
    if (success) metrics.successful++
    else metrics.failed++
    metrics.totalDuration += duration
    metrics.avgDuration = metrics.totalDuration / metrics.total
    metrics.minDuration = Math.min(metrics.minDuration, duration)
    metrics.maxDuration = Math.max(metrics.maxDuration, duration)
  }

  getMetrics(operation) {
    return this.performanceMetrics.get(operation) || null
  }
}

const logger = new AIControllerLogger()

/**
 * Content Cache Manager
 */
class ContentCacheManager {
  constructor(maxSize = 1000, ttl = 3600000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl // 1 hour
    this.hits = 0
    this.misses = 0
  }

  generateKey(...params) {
    return params.map(p => {
      if (typeof p === 'object') return JSON.stringify(p)
      return String(p)
    }).join(':')
  }

  set(key, value) {
    // Evict oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      accessCount: 0
    })
  }

  get(key) {
    const entry = this.cache.get(key)
    if (!entry) {
      this.misses++
      return null
    }

    // Check if expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      this.misses++
      return null
    }

    entry.accessCount++
    this.hits++
    return entry.value
  }

  has(key) {
    return this.cache.has(key) && (Date.now() - this.cache.get(key).timestamp <= this.ttl)
  }

  clear() {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.hits / (this.hits + this.misses) || 0,
      hits: this.hits,
      misses: this.misses,
      items: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        accessCount: entry.accessCount,
        age: `${Math.round((Date.now() - entry.timestamp) / 1000)}s`
      }))
    }
  }
}

const contentCache = new ContentCacheManager(1000, 3600000)

/**
 * Request Queue Manager
 */
class RequestQueueManager {
  constructor(maxConcurrent = 5) {
    this.queue = []
    this.processing = new Map()
    this.maxConcurrent = maxConcurrent
    this.completed = []
  }

  async enqueue(requestId, fn, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        id: requestId,
        fn,
        priority,
        resolve,
        reject,
        enqueuedAt: Date.now()
      })

      this.queue.sort((a, b) => b.priority - a.priority)
      this.processQueue()
    })
  }

  async processQueue() {
    if (this.processing.size >= this.maxConcurrent) {
      return
    }

    const job = this.queue.shift()
    if (!job) return

    this.processing.set(job.id, {
      startTime: Date.now(),
      priority: job.priority
    })

    try {
      const result = await job.fn()
      this.completed.push({
        id: job.id,
        status: 'completed',
        duration: Date.now() - this.processing.get(job.id).startTime
      })
      job.resolve(result)
    } catch (error) {
      this.completed.push({
        id: job.id,
        status: 'failed',
        error: error.message,
        duration: Date.now() - this.processing.get(job.id).startTime
      })
      job.reject(error)
    } finally {
      this.processing.delete(job.id)
      this.processQueue()
    }
  }

  getStatus(requestId) {
    if (this.processing.has(requestId)) {
      const proc = this.processing.get(requestId)
      return {
        status: 'processing',
        duration: Date.now() - proc.startTime,
        priority: proc.priority
      }
    }

    const completed = this.completed.find(c => c.id === requestId)
    if (completed) return completed

    return { status: 'unknown' }
  }

  getMetrics() {
    return {
      queueLength: this.queue.length,
      processing: this.processing.size,
      maxConcurrent: this.maxConcurrent,
      completed: this.completed.length,
      completedRecent: this.completed.slice(-100)
    }
  }
}

const requestQueue = new RequestQueueManager(5)

/**
 * ============================================================================
 * CONTROLLER METHODS
 * ============================================================================
 */

/**
 * Generate viral hooks for content creation
 */
export const generateHooks = async (req, res, next) => {
  const startTime = Date.now()
  const requestId = uuidv4()

  try {
    const { profileData, niche = 'general', count = 10, style = 'viral' } = req.body

    // Validation
    if (!profileData || typeof profileData !== 'object') {
      return res.status(400).json({
        error: 'Invalid profile data',
        requestId
      })
    }

    // Check cache
    const cacheKey = contentCache.generateKey('hooks', profileData.username, count, style)
    const cachedHooks = contentCache.get(cacheKey)

    if (cachedHooks) {
      const duration = Date.now() - startTime
      logger.recordPerformance('generateHooks', duration, true)

      return res.json({
        id: requestId,
        status: 'success',
        source: 'cache',
        hooks: cachedHooks,
        count: cachedHooks.length,
        duration: `${duration}ms`,
        cacheHit: true
      })
    }

    // Process with queue
    const hooks = await requestQueue.enqueue(requestId, async () => {
      return await aiContentGenerator.generateHooks(profileData, { niche, count, style })
    }, 1)

    // Cache result
    contentCache.set(cacheKey, hooks)

    const duration = Date.now() - startTime
    logger.recordPerformance('generateHooks', duration, true)

    res.json({
      id: requestId,
      status: 'success',
      source: 'generated',
      hooks,
      count: hooks.length,
      duration: `${duration}ms`,
      cacheHit: false
    })
  } catch (error) {
    logger.error('Error generating hooks', {
      error: error.message,
      requestId
    })
    logger.recordPerformance('generateHooks', Date.now() - startTime, false)

    res.status(500).json({
      error: 'Failed to generate hooks',
      message: error.message,
      requestId
    })
  }
}

/**
 * Generate captions for social media
 */
export const generateCaptions = async (req, res, next) => {
  const startTime = Date.now()
  const requestId = uuidv4()

  try {
    const {
      profileData,
      topic = 'general',
      count = 5,
      tone = 'professional',
      includeEmojis = true,
      includeHashtags = false
    } = req.body

    if (!profileData) {
      return res.status(400).json({
        error: 'Profile data is required',
        requestId
      })
    }

    // Check cache
    const cacheKey = contentCache.generateKey('captions', profileData.username, count, tone)
    const cachedCaptions = contentCache.get(cacheKey)

    if (cachedCaptions) {
      const duration = Date.now() - startTime
      logger.recordPerformance('generateCaptions', duration, true)

      return res.json({
        id: requestId,
        status: 'success',
        source: 'cache',
        captions: cachedCaptions,
        count: cachedCaptions.length,
        duration: `${duration}ms`,
        cacheHit: true
      })
    }

    // Generate captions
    const captions = await requestQueue.enqueue(requestId, async () => {
      return await aiContentGenerator.generateCaptions(
        profileData,
        {
          topic,
          count,
          tone,
          includeEmojis,
          includeHashtags
        }
      )
    }, 1)

    // Cache result
    contentCache.set(cacheKey, captions)

    const duration = Date.now() - startTime
    logger.recordPerformance('generateCaptions', duration, true)

    res.json({
      id: requestId,
      status: 'success',
      source: 'generated',
      captions,
      count: captions.length,
      duration: `${duration}ms`,
      cacheHit: false
    })
  } catch (error) {
    logger.error('Error generating captions', {
      error: error.message,
      requestId
    })
    logger.recordPerformance('generateCaptions', Date.now() - startTime, false)

    res.status(500).json({
      error: 'Failed to generate captions',
      message: error.message,
      requestId
    })
  }
}

/**
 * Generate video scripts
 */
export const generateScripts = async (req, res, next) => {
  const startTime = Date.now()
  const requestId = uuidv4()

  try {
    const {
      profileData,
      topic = 'product showcase',
      duration = '60s',
      style = 'engaging',
      count = 3,
      language = 'en'
    } = req.body

    if (!profileData) {
      return res.status(400).json({
        error: 'Profile data is required',
        requestId
      })
    }

    // Generate scripts
    const scripts = await requestQueue.enqueue(requestId, async () => {
      return await aiContentGenerator.generateScripts(
        profileData,
        {
          topic,
          duration,
          style,
          count,
          language
        }
      )
    }, 2) // Higher priority

    // Save to database
    try {
      for (const script of scripts) {
        await GeneratedScript.create({
          username: profileData.username,
          content: script,
          duration,
          style,
          metadata: {
            requestId,
            generatedAt: new Date()
          }
        })
      }
    } catch (dbError) {
      logger.warn('Failed to save scripts to database', {
        error: dbError.message
      })
    }

    const duration_ms = Date.now() - startTime
    logger.recordPerformance('generateScripts', duration_ms, true)

    res.json({
      id: requestId,
      status: 'success',
      scripts,
      count: scripts.length,
      duration: `${duration_ms}ms`,
      saved: true
    })
  } catch (error) {
    logger.error('Error generating scripts', {
      error: error.message,
      requestId
    })
    logger.recordPerformance('generateScripts', Date.now() - startTime, false)

    res.status(500).json({
      error: 'Failed to generate scripts',
      message: error.message,
      requestId
    })
  }
}

/**
 * Generate trending hashtags
 */
export const generateHashtags = async (req, res, next) => {
  const startTime = Date.now()
  const requestId = uuidv4()

  try {
    const {
      profileData,
      topic = 'general',
      count = 20,
      trendingOnly = false
    } = req.body

    if (!profileData) {
      return res.status(400).json({
        error: 'Profile data is required',
        requestId
      })
    }

    const hashtags = await requestQueue.enqueue(requestId, async () => {
      return await aiContentGenerator.generateHashtags(
        profileData,
        {
          topic,
          count,
          trendingOnly
        }
      )
    }, 0)

    const duration = Date.now() - startTime
    logger.recordPerformance('generateHashtags', duration, true)

    res.json({
      id: requestId,
      status: 'success',
      hashtags,
      count: hashtags.length,
      duration: `${duration}ms`
    })
  } catch (error) {
    logger.error('Error generating hashtags', {
      error: error.message,
      requestId
    })
    logger.recordPerformance('generateHashtags', Date.now() - startTime, false)

    res.status(500).json({
      error: 'Failed to generate hashtags',
      message: error.message,
      requestId
    })
  }
}

/**
 * Analyze influencer profile
 */
export const analyzeInfluencer = async (req, res, next) => {
  const startTime = Date.now()
  const requestId = uuidv4()

  try {
    const { profileData, recentPosts = [] } = req.body

    if (!profileData) {
      return res.status(400).json({
        error: 'Profile data is required',
        requestId
      })
    }

    // Check cache
    const cacheKey = contentCache.generateKey('analysis', profileData.username)
    const cachedAnalysis = contentCache.get(cacheKey)

    if (cachedAnalysis) {
      const duration = Date.now() - startTime
      logger.recordPerformance('analyzeInfluencer', duration, true)

      return res.json({
        id: requestId,
        status: 'success',
        source: 'cache',
        analysis: cachedAnalysis,
        duration: `${duration}ms`,
        cacheHit: true
      })
    }

    // Analyze
    const analysis = await requestQueue.enqueue(requestId, async () => {
      return await instagramAnalyzer.analyzeInfluencer(profileData, recentPosts)
    }, 2)

    // Cache result
    contentCache.set(cacheKey, analysis)

    // Save analytics
    try {
      await Analytics.create({
        influencer: profileData.username,
        type: 'profile_analysis',
        data: analysis,
        metadata: { requestId }
      })
    } catch (dbError) {
      logger.warn('Failed to save analytics', { error: dbError.message })
    }

    const duration = Date.now() - startTime
    logger.recordPerformance('analyzeInfluencer', duration, true)

    res.json({
      id: requestId,
      status: 'success',
      source: 'generated',
      analysis,
      duration: `${duration}ms`,
      cacheHit: false
    })
  } catch (error) {
    logger.error('Error analyzing influencer', {
      error: error.message,
      requestId
    })
    logger.recordPerformance('analyzeInfluencer', Date.now() - startTime, false)

    res.status(500).json({
      error: 'Failed to analyze influencer',
      message: error.message,
      requestId
    })
  }
}

/**
 * Get content generation status
 */
export const getGenerationStatus = (req, res) => {
  const { requestId } = req.params

  if (!requestId) {
    return res.status(400).json({
      error: 'Request ID is required'
    })
  }

  const status = requestQueue.getStatus(requestId)

  res.json({
    requestId,
    ...status,
    queueStats: requestQueue.getMetrics()
  })
}

/**
 * Get controller metrics and statistics
 */
export const getMetrics = (req, res) => {
  res.json({
    cache: contentCache.getStats(),
    queue: requestQueue.getMetrics(),
    performance: {
      hooks: logger.getMetrics('generateHooks'),
      captions: logger.getMetrics('generateCaptions'),
      scripts: logger.getMetrics('generateScripts'),
      hashtags: logger.getMetrics('generateHashtags'),
      analysis: logger.getMetrics('analyzeInfluencer')
    },
    timestamp: new Date().toISOString()
  })
}

/**
 * Clear cache
 */
export const clearCache = (req, res) => {
  contentCache.clear()

  res.json({
    status: 'success',
    message: 'Cache cleared',
    cacheStats: contentCache.getStats()
  })
}

export default {
  generateHooks,
  generateCaptions,
  generateScripts,
  generateHashtags,
  analyzeInfluencer,
  getGenerationStatus,
  getMetrics,
  clearCache
}