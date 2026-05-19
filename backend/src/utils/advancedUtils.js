/**
 * ============================================================================
 * ADVANCED DATA UTILITIES AND ANALYTICS ENGINE
 * ============================================================================
 * Comprehensive utilities for:
 * - Data processing and transformation
 * - Statistical analysis and calculations
 * - Performance monitoring and profiling
 * - Cache management and optimization
 * - Batch processing and queuing
 * ============================================================================
 */

/**
 * ============================================================================
 * DATA PROCESSING UTILITIES
 * ============================================================================
 */

export class DataProcessor {
  /**
   * Normalize data values to 0-1 range
   */
  static normalize(value, min, max) {
    if (max === min) return 0
    return (value - min) / (max - min)
  }

  /**
   * Denormalize data from 0-1 range back to original
   */
  static denormalize(normalized, min, max) {
    return normalized * (max - min) + min
  }

  /**
   * Calculate percentile
   */
  static percentile(arr, p) {
    if (arr.length === 0) return 0
    const sorted = [...arr].sort((a, b) => a - b)
    const index = Math.ceil((sorted.length * p) / 100) - 1
    return sorted[Math.max(0, index)]
  }

  /**
   * Calculate quartiles
   */
  static quartiles(arr) {
    return {
      q1: this.percentile(arr, 25),
      q2: this.percentile(arr, 50),
      q3: this.percentile(arr, 75)
    }
  }

  /**
   * Detect outliers using IQR method
   */
  static detectOutliers(arr) {
    const q = this.quartiles(arr)
    const iqr = q.q3 - q.q1
    const lowerBound = q.q1 - 1.5 * iqr
    const upperBound = q.q3 + 1.5 * iqr

    return {
      outliers: arr.filter(x => x < lowerBound || x > upperBound),
      bounds: { lower: lowerBound, upper: upperBound }
    }
  }

  /**
   * Group array by key
   */
  static groupBy(arr, keyFn) {
    return arr.reduce((groups, item) => {
      const key = keyFn(item)
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
      return groups
    }, {})
  }

  /**
   * Flatten nested array
   */
  static flatten(arr, depth = Infinity) {
    if (depth === 0) return arr
    return arr.reduce((flat, item) => {
      return flat.concat(Array.isArray(item) ? this.flatten(item, depth - 1) : item)
    }, [])
  }

  /**
   * Remove duplicates from array
   */
  static unique(arr, keyFn = x => x) {
    const seen = new Set()
    return arr.filter(item => {
      const key = keyFn(item)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  /**
   * Chunk array into smaller arrays
   */
  static chunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  /**
   * Merge multiple arrays while removing duplicates
   */
  static merge(...arrays) {
    const merged = arrays.flat()
    return this.unique(merged)
  }

  /**
   * Transform object keys
   */
  static transformKeys(obj, transformer) {
    const transformed = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = transformer(key)
      transformed[newKey] = typeof value === 'object' && value !== null
        ? this.transformKeys(value, transformer)
        : value
    }
    return transformed
  }

  /**
   * Filter object properties
   */
  static filterObject(obj, predicate) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => predicate(key, value))
    )
  }

  /**
   * Deep merge objects
   */
  static deepMerge(...objects) {
    return objects.reduce((result, obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            result[key] = result[key] ? this.deepMerge(result[key], obj[key]) : obj[key]
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    }, {})
  }
}

/**
 * ============================================================================
 * STATISTICAL ANALYSIS
 * ============================================================================
 */

export class StatisticalAnalyzer {
  /**
   * Calculate mean (average)
   */
  static mean(arr) {
    return arr.reduce((sum, x) => sum + x, 0) / arr.length
  }

  /**
   * Calculate median
   */
  static median(arr) {
    const sorted = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  }

  /**
   * Calculate mode (most frequent value)
   */
  static mode(arr) {
    const frequencies = {}
    let maxFreq = 0
    let mode = null

    for (const value of arr) {
      frequencies[value] = (frequencies[value] || 0) + 1
      if (frequencies[value] > maxFreq) {
        maxFreq = frequencies[value]
        mode = value
      }
    }

    return mode
  }

  /**
   * Calculate standard deviation
   */
  static standardDeviation(arr) {
    const mean = this.mean(arr)
    const variance = arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / arr.length
    return Math.sqrt(variance)
  }

  /**
   * Calculate variance
   */
  static variance(arr) {
    const mean = this.mean(arr)
    return arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / arr.length
  }

  /**
   * Calculate correlation coefficient
   */
  static correlation(arr1, arr2) {
    if (arr1.length !== arr2.length) throw new Error('Arrays must have same length')

    const mean1 = this.mean(arr1)
    const mean2 = this.mean(arr2)

    const numerator = arr1.reduce((sum, x, i) => {
      return sum + (x - mean1) * (arr2[i] - mean2)
    }, 0)

    const denominator = Math.sqrt(
      arr1.reduce((sum, x) => sum + Math.pow(x - mean1, 2), 0) *
      arr2.reduce((sum, x) => sum + Math.pow(x - mean2, 2), 0)
    )

    return denominator === 0 ? 0 : numerator / denominator
  }

  /**
   * Generate summary statistics
   */
  static summary(arr) {
    return {
      count: arr.length,
      min: Math.min(...arr),
      max: Math.max(...arr),
      range: Math.max(...arr) - Math.min(...arr),
      mean: this.mean(arr),
      median: this.median(arr),
      mode: this.mode(arr),
      variance: this.variance(arr),
      stdDev: this.standardDeviation(arr),
      sum: arr.reduce((a, b) => a + b, 0)
    }
  }

  /**
   * Detect trend in time series
   */
  static detectTrend(values) {
    if (values.length < 2) return 'neutral'

    const diffs = []
    for (let i = 1; i < values.length; i++) {
      diffs.push(values[i] - values[i - 1])
    }

    const avgDiff = this.mean(diffs)
    const threshold = this.standardDeviation(values) * 0.1

    if (avgDiff > threshold) return 'uptrend'
    if (avgDiff < -threshold) return 'downtrend'
    return 'neutral'
  }

  /**
   * Calculate growth rate
   */
  static growthRate(previous, current) {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }
}

/**
 * ============================================================================
 * PERFORMANCE MONITORING
 * ============================================================================
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map()
    this.startTime = Date.now()
  }

  /**
   * Start measuring operation
   */
  startMeasure(label) {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, [])
    }
    return {
      label,
      startTime: performance.now()
    }
  }

  /**
   * End measurement and record
   */
  endMeasure(measurement) {
    const duration = performance.now() - measurement.startTime
    this.metrics.get(measurement.label).push(duration)
    return duration
  }

  /**
   * Get metrics for operation
   */
  getMetrics(label) {
    const durations = this.metrics.get(label) || []
    if (durations.length === 0) return null

    return {
      count: durations.length,
      total: durations.reduce((a, b) => a + b, 0),
      average: StatisticalAnalyzer.mean(durations),
      median: StatisticalAnalyzer.median(durations),
      min: Math.min(...durations),
      max: Math.max(...durations),
      stdDev: StatisticalAnalyzer.standardDeviation(durations)
    }
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    const all = {}
    for (const [label] of this.metrics) {
      all[label] = this.getMetrics(label)
    }
    return all
  }

  /**
   * Clear metrics
   */
  clear(label = null) {
    if (label) {
      this.metrics.delete(label)
    } else {
      this.metrics.clear()
    }
  }

  /**
   * Get uptime
   */
  getUptime() {
    return Math.floor((Date.now() - this.startTime) / 1000)
  }
}

/**
 * ============================================================================
 * CACHE UTILITY
 * ============================================================================
 */

export class CacheUtil {
  constructor(maxSize = 1000, ttl = 3600000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
    this.hits = 0
    this.misses = 0
  }

  /**
   * Set cache value
   */
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  /**
   * Get cache value
   */
  get(key) {
    const entry = this.cache.get(key)
    if (!entry) {
      this.misses++
      return null
    }

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      this.misses++
      return null
    }

    this.hits++
    return entry.value
  }

  /**
   * Check if key exists and is valid
   */
  has(key) {
    const entry = this.cache.get(key)
    if (!entry) return false
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return false
    }
    return true
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits / (this.hits + this.misses) || 0
    }
  }

  /**
   * Clear cache
   */
  clear() {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
  }
}

/**
 * ============================================================================
 * BATCH PROCESSOR
 * ============================================================================
 */

export class BatchProcessor {
  constructor(batchSize = 100, timeout = 5000) {
    this.batchSize = batchSize
    this.timeout = timeout
    this.queue = []
    this.processing = false
    this.results = []
  }

  /**
   * Add item to batch
   */
  async add(item) {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject })
      if (this.queue.length >= this.batchSize) {
        this.processBatch()
      } else if (!this.processing) {
        setTimeout(() => this.processBatch(), this.timeout)
      }
    })
  }

  /**
   * Process current batch
   */
  async processBatch() {
    if (this.processing || this.queue.length === 0) return

    this.processing = true
    const batch = this.queue.splice(0, this.batchSize)

    try {
      const items = batch.map(b => b.item)
      const processed = await this.process(items)

      batch.forEach((b, index) => {
        b.resolve(processed[index])
      })
    } catch (error) {
      batch.forEach(b => b.reject(error))
    } finally {
      this.processing = false
      if (this.queue.length > 0) {
        this.processBatch()
      }
    }
  }

  /**
   * Override this method to implement batch processing logic
   */
  async process(items) {
    return items
  }
}

/**
 * ============================================================================
 * STRING UTILITIES
 * ============================================================================
 */

export class StringUtil {
  /**
   * Slugify string
   */
  static slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  /**
   * Capitalize string
   */
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  /**
   * Camel case string
   */
  static camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
  }

  /**
   * Snake case string
   */
  static snakeCase(str) {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
  }

  /**
   * Truncate string
   */
  static truncate(str, length, suffix = '...') {
    if (str.length <= length) return str
    return str.slice(0, length - suffix.length) + suffix
  }

  /**
   * Count words
   */
  static wordCount(str) {
    return str.trim().split(/\s+/).length
  }

  /**
   * Extract hashtags
   */
  static extractHashtags(str) {
    const matches = str.match(/#\w+/g) || []
    return matches.map(tag => tag.replace('#', ''))
  }

  /**
   * Extract mentions
   */
  static extractMentions(str) {
    const matches = str.match(/@\w+/g) || []
    return matches.map(mention => mention.replace('@', ''))
  }

  /**
   * Extract URLs
   */
  static extractURLs(str) {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return str.match(urlRegex) || []
  }

  /**
   * Extract emails
   */
  static extractEmails(str) {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g
    return str.match(emailRegex) || []
  }
}

/**
 * ============================================================================
 * DATE UTILITIES
 * ============================================================================
 */

export class DateUtil {
  /**
   * Format date
   */
  static format(date, format = 'YYYY-MM-DD') {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  }

  /**
   * Get days difference
   */
  static daysDifference(date1, date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Is date in past
   */
  static isPast(date) {
    return new Date(date) < new Date()
  }

  /**
   * Is date in future
   */
  static isFuture(date) {
    return new Date(date) > new Date()
  }

  /**
   * Get relative time string
   */
  static getRelativeTime(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`

    return new Date(date).toLocaleDateString()
  }

  /**
   * Add days to date
   */
  static addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
}

/**
 * ============================================================================
 * VALIDATION UTILITIES
 * ============================================================================
 */

export class ValidationUtil {
  /**
   * Validate email
   */
  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  /**
   * Validate URL
   */
  static isValidURL(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  /**
   * Validate phone
   */
  static isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''))
  }

  /**
   * Validate credit card
   */
  static isValidCreditCard(cc) {
    return /^\d{13,19}$/.test(cc.replace(/\s/g, ''))
  }

  /**
   * Validate username
   */
  static isValidUsername(username) {
    return /^[a-z0-9_.-]{3,32}$/i.test(username)
  }

  /**
   * Validate password strength
   */
  static getPasswordStrength(password) {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    return ['weak', 'fair', 'good', 'strong', 'very strong'][strength] || 'very weak'
  }

  /**
   * Is empty
   */
  static isEmpty(value) {
    return value === null || value === undefined || value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
  }

  /**
   * Is valid UUID
   */
  static isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)
  }
}

/**
 * ============================================================================
 * EXPORTS
 * ============================================================================
 */

export default {
  DataProcessor,
  StatisticalAnalyzer,
  PerformanceMonitor,
  CacheUtil,
  BatchProcessor,
  StringUtil,
  DateUtil,
  ValidationUtil
}