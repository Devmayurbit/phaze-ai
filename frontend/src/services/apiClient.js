/**
 * ============================================================================
 * API CLIENT SERVICE
 * ============================================================================
 * Comprehensive HTTP client with request/response interceptors,
 * retry logic, caching, error handling, and request queuing
 * ============================================================================
 */

/**
 * Request Queue Manager
 */
class RequestQueueManager {
  constructor(maxConcurrent = 5) {
    this.queue = []
    this.active = 0
    this.maxConcurrent = maxConcurrent
    this.metrics = {
      total: 0,
      completed: 0,
      failed: 0,
      retried: 0
    }
  }

  async add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
      this.process()
    })
  }

  async process() {
    while (this.active < this.maxConcurrent && this.queue.length > 0) {
      this.active++
      const { fn, resolve, reject } = this.queue.shift()

      try {
        const result = await fn()
        resolve(result)
        this.metrics.completed++
      } catch (error) {
        reject(error)
        this.metrics.failed++
      } finally {
        this.active--
        this.process()
      }
    }
  }

  getMetrics() {
    return { ...this.metrics, queued: this.queue.length, active: this.active }
  }
}

/**
 * Request Cache Manager
 */
class CacheManager {
  constructor(maxSize = 100, ttl = 300000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
    this.metrics = { hits: 0, misses: 0, stores: 0 }
  }

  generateKey(method, url, params) {
    return `${method}:${url}:${JSON.stringify(params || {})}`
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: this.ttl
    })
    this.metrics.stores++
  }

  get(key) {
    const entry = this.cache.get(key)
    if (!entry) {
      this.metrics.misses++
      return null
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      this.metrics.misses++
      return null
    }

    this.metrics.hits++
    return entry.value
  }

  clear() {
    this.cache.clear()
  }

  getMetrics() {
    return {
      ...this.metrics,
      size: this.cache.size,
      hitRate: this.metrics.stores > 0
        ? ((this.metrics.hits / (this.metrics.hits + this.metrics.misses)) * 100).toFixed(2) + '%'
        : 'N/A'
    }
  }
}

/**
 * Retry Strategy
 */
class RetryStrategy {
  constructor(maxAttempts = 3, baseDelay = 1000) {
    this.maxAttempts = maxAttempts
    this.baseDelay = baseDelay
  }

  async execute(fn) {
    let lastError
    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        if (attempt < this.maxAttempts) {
          const delay = this.baseDelay * Math.pow(2, attempt - 1)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    throw lastError
  }
}

/**
 * Request Interceptor
 */
class RequestInterceptor {
  constructor() {
    this.interceptors = []
  }

  use(handler) {
    this.interceptors.push(handler)
  }

  async execute(config) {
    let current = config
    for (const interceptor of this.interceptors) {
      current = await interceptor(current)
    }
    return current
  }
}

/**
 * Response Interceptor
 */
class ResponseInterceptor {
  constructor() {
    this.interceptors = []
  }

  use(handler) {
    this.interceptors.push(handler)
  }

  async execute(response) {
    let current = response
    for (const interceptor of this.interceptors) {
      current = await interceptor(current)
    }
    return current
  }
}

/**
 * Main API Client
 */
export class APIClient {
  constructor(baseURL = '/api', options = {}) {
    this.baseURL = baseURL
    this.defaultOptions = {
      timeout: 30000,
      retries: 3,
      cache: true,
      cacheTTL: 300000,
      ...options
    }

    this.queue = new RequestQueueManager(options.maxConcurrentRequests || 5)
    this.cache = new CacheManager(options.cacheSize || 100, options.cacheTTL || 300000)
    this.retry = new RetryStrategy(options.retries || 3, options.retryDelay || 1000)
    this.requestInterceptor = new RequestInterceptor()
    this.responseInterceptor = new ResponseInterceptor()
    this.metrics = { requests: 0, errors: 0, cachedRequests: 0 }

    this.setupDefaultInterceptors()
  }

  setupDefaultInterceptors() {
    // Request interceptor - add headers, auth, etc
    this.requestInterceptor.use(async (config) => {
      config.headers = config.headers || {}
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
      
      // Add auth token if available
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      // Add request ID for tracking
      config.headers['X-Request-ID'] = this.generateRequestId()

      return config
    })

    // Response interceptor - handle status codes
    this.responseInterceptor.use(async (response) => {
      if (response.status === 401) {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }
      return response
    })
  }

  generateRequestId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  async request(method, endpoint, data = null, options = {}) {
    const config = { ...this.defaultOptions, ...options }
    const url = `${this.baseURL}${endpoint}`

    // Check cache for GET requests
    if (method === 'GET' && config.cache) {
      const cacheKey = this.cache.generateKey(method, url, data)
      const cached = this.cache.get(cacheKey)
      if (cached) {
        this.metrics.cachedRequests++
        return cached
      }
    }

    // Queue the request
    return this.queue.add(() => this.executeRequest(method, url, data, config))
  }

  async executeRequest(method, url, data, config) {
    try {
      this.metrics.requests++

      const requestConfig = {
        method,
        headers: config.headers || {},
        timeout: config.timeout
      }

      // Apply request interceptors
      const finalConfig = await this.requestInterceptor.execute(requestConfig)

      // Add body for non-GET requests
      if (data && method !== 'GET') {
        finalConfig.body = typeof data === 'string' ? data : JSON.stringify(data)
      }

      // Execute with retry
      const response = await this.retry.execute(() => this.fetchWithTimeout(url, finalConfig, config.timeout))

      // Apply response interceptors
      const finalResponse = await this.responseInterceptor.execute(response)

      if (!finalResponse.ok) {
        throw new APIError(
          `HTTP ${finalResponse.status}`,
          finalResponse.status,
          await finalResponse.text()
        )
      }

      let result = await finalResponse.json()

      // Cache successful GET requests
      if (method === 'GET' && config.cache) {
        const cacheKey = this.cache.generateKey(method, url, data)
        this.cache.set(cacheKey, result)
      }

      return result
    } catch (error) {
      this.metrics.errors++
      throw error
    }
  }

  async fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      return await fetch(url, { ...options, signal: controller.signal })
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async get(endpoint, params = null, options = {}) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request('GET', endpoint + query, null, options)
  }

  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options)
  }

  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options)
  }

  async patch(endpoint, data, options = {}) {
    return this.request('PATCH', endpoint, data, options)
  }

  async delete(endpoint, data = null, options = {}) {
    return this.request('DELETE', endpoint, data, options)
  }

  clearCache() {
    this.cache.clear()
  }

  getMetrics() {
    return {
      ...this.metrics,
      queue: this.queue.getMetrics(),
      cache: this.cache.getMetrics()
    }
  }

  addRequestInterceptor(handler) {
    this.requestInterceptor.use(handler)
  }

  addResponseInterceptor(handler) {
    this.responseInterceptor.use(handler)
  }
}

/**
 * API Error Class
 */
export class APIError extends Error {
  constructor(message, status, response) {
    super(message)
    this.status = status
    this.response = response
    this.name = 'APIError'
  }
}

/**
 * Specialized API Services
 */

export class ContentGenerationService {
  constructor(apiClient) {
    this.api = apiClient
  }

  async generateHooks(profileData, options = {}) {
    return this.api.post('/generate/hooks', {
      profileData,
      count: options.count || 5
    })
  }

  async generateCaptions(profileData, options = {}) {
    return this.api.post('/generate/captions', {
      profileData,
      tone: options.tone || 'professional',
      count: options.count || 5
    })
  }

  async generateScripts(profileData, options = {}) {
    return this.api.post('/generate/scripts', {
      profileData,
      duration: options.duration || '30s',
      style: options.style || 'educational',
      count: options.count || 3
    })
  }

  async generateHashtags(profileData, options = {}) {
    return this.api.post('/generate/hashtags', {
      profileData,
      count: options.count || 10,
      trending: options.trending !== false
    })
  }

  async generateContentStrategy(profileData) {
    return this.api.post('/generate/strategy', profileData)
  }

  async batchGenerate(profiles, options = {}) {
    return this.api.post('/batch/generate', {
      profiles,
      options
    })
  }
}

export class AnalyticsService {
  constructor(apiClient) {
    this.api = apiClient
  }

  async getMetrics() {
    return this.api.get('/analytics/metrics', null, { cache: false })
  }

  async getInfluencerAnalytics(influencerId) {
    return this.api.get(`/analytics/influencer/${influencerId}`)
  }

  async getTrendAnalysis(niche) {
    return this.api.get('/analytics/trends', { niche })
  }

  async getDashboardStats() {
    return this.api.get('/dashboard/stats')
  }

  async getPipelineStatus() {
    return this.api.get('/dashboard/pipeline')
  }
}

export class InfluencerService {
  constructor(apiClient) {
    this.api = apiClient
  }

  async submitInfluencer(url, niche) {
    return this.api.post('/influencer/submit', { url, niche })
  }

  async getInfluencer(id) {
    return this.api.get(`/influencer/${id}`)
  }

  async getInfluencerContent(id) {
    return this.api.get(`/influencer/${id}/content`)
  }

  async getInfluencerTrends(id) {
    return this.api.get(`/influencer/${id}/trends`)
  }

  async analyzeProfile(username) {
    return this.api.post('/influencer/analyze', { username })
  }

  async searchInfluencers(query, options = {}) {
    return this.api.get('/influencer/search', {
      q: query,
      niche: options.niche,
      minFollowers: options.minFollowers,
      maxFollowers: options.maxFollowers
    })
  }
}

export class HealthService {
  constructor(apiClient) {
    this.api = apiClient
  }

  async checkHealth() {
    return this.api.get('/health')
  }

  async getStatus() {
    return this.api.get('/status', null, { cache: false })
  }

  async getSystemMetrics() {
    return this.api.get('/system/metrics', null, { cache: false })
  }

  async getCacheStatus() {
    return this.api.get('/cache/status')
  }

  async clearCache() {
    return this.api.post('/cache/clear', {})
  }
}

/**
 * Default API Client Instance
 */
export const apiClient = new APIClient('/api', {
  maxConcurrentRequests: 5,
  cacheSize: 100,
  cacheTTL: 300000,
  retries: 3,
  retryDelay: 1000,
  timeout: 30000
})

export const contentGenerationService = new ContentGenerationService(apiClient)
export const analyticsService = new AnalyticsService(apiClient)
export const influencerService = new InfluencerService(apiClient)
export const healthService = new HealthService(apiClient)

export default apiClient