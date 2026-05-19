/**
 * ============================================================================
 * FRONTEND UTILITY FUNCTIONS
 * ============================================================================
 * Comprehensive collection of utility functions for data processing,
 * formatting, validation, and common operations
 * ============================================================================
 */

/**
 * STRING UTILITIES
 */
export const StringUtils = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  
  camelCase: (str) => str.replace(/[-_\s]+(.)?/g, (_, c) => c?.toUpperCase() || ''),
  
  kebabCase: (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  
  snakeCase: (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase(),
  
  slugify: (str) => str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-'),
  
  truncate: (str, length, suffix = '...') => str.length > length ? str.slice(0, length - suffix.length) + suffix : str,
  
  reverseString: (str) => str.split('').reverse().join(''),
  
  isPalindrome: (str) => {
    const cleaned = str.toLowerCase().replace(/[^\w]/g, '')
    return cleaned === cleaned.split('').reverse().join('')
  },
  
  wordCount: (str) => str.trim().split(/\s+/).length,
  
  extractEmails: (str) => (str.match(/[\w.-]+@[\w.-]+\.\w+/g) || []),
  
  extractURLs: (str) => (str.match(/https?:\/\/[^\s]+/g) || []),
  
  extractHashtags: (str) => (str.match(/#\w+/g) || []),
  
  extractMentions: (str) => (str.match(/@\w+/g) || []),
  
  stripHTML: (str) => str.replace(/<[^>]*>/g, ''),
  
  escapeHTML: (str) => {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  },
  
  htmlToText: (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
}

/**
 * DATE UTILITIES
 */
export const DateUtils = {
  format: (date, format = 'YYYY-MM-DD') => {
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
  },
  
  getRelativeTime: (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + ' years ago'
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + ' months ago'
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + ' days ago'
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + ' hours ago'
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + ' minutes ago'
    return Math.floor(seconds) + ' seconds ago'
  },
  
  daysDifference: (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.round((new Date(date2) - new Date(date1)) / oneDay)
  },
  
  addDays: (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },
  
  isPast: (date) => new Date(date) < new Date(),
  
  isFuture: (date) => new Date(date) > new Date(),
  
  isToday: (date) => {
    const today = new Date()
    const d = new Date(date)
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  },
  
  isYesterday: (date) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const d = new Date(date)
    return d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear()
  }
}

/**
 * VALIDATION UTILITIES
 */
export const ValidationUtils = {
  isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  
  isValidURL: (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  
  isValidPhone: (phone) => /^[\d\s\-\+\(\)]{10,}$/.test(phone),
  
  isValidPassword: (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^\w]/.test(password)
  },
  
  isValidUsername: (username) => /^[a-zA-Z0-9_-]{3,20}$/.test(username),
  
  isValidZipCode: (zip) => /^\d{5}(-\d{4})?$/.test(zip),
  
  isEmpty: (value) => value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0),
  
  isValidUUID: (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid),
  
  getPasswordStrength: (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^\w]/.test(password)) strength++
    return strength
  }
}

/**
 * ARRAY UTILITIES
 */
export const ArrayUtils = {
  unique: (arr) => [...new Set(arr)],
  
  chunk: (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  },
  
  flatten: (arr) => arr.reduce((flat, item) => flat.concat(Array.isArray(item) ? ArrayUtils.flatten(item) : item), []),
  
  groupBy: (arr, key) => arr.reduce((result, item) => ({
    ...result,
    [key instanceof Function ? key(item) : item[key]]: [...(result[key instanceof Function ? key(item) : item[key]] || []), item]
  }), {}),
  
  sortBy: (arr, key, order = 'asc') => {
    const sorted = [...arr].sort((a, b) => {
      const aVal = key instanceof Function ? key(a) : a[key]
      const bVal = key instanceof Function ? key(b) : b[key]
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    })
    return order === 'desc' ? sorted.reverse() : sorted
  },
  
  shuffle: (arr) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },
  
  intersection: (arr1, arr2) => arr1.filter(item => arr2.includes(item)),
  
  difference: (arr1, arr2) => arr1.filter(item => !arr2.includes(item))
}

/**
 * OBJECT UTILITIES
 */
export const ObjectUtils = {
  isEmpty: (obj) => Object.keys(obj).length === 0,
  
  keys: (obj) => Object.keys(obj),
  
  values: (obj) => Object.values(obj),
  
  entries: (obj) => Object.entries(obj),
  
  merge: (...objs) => Object.assign({}, ...objs),
  
  deepMerge: (target, source) => {
    const result = { ...target }
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = ObjectUtils.deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
    return result
  },
  
  pick: (obj, keys) => {
    const result = {}
    keys.forEach(key => {
      if (key in obj) result[key] = obj[key]
    })
    return result
  },
  
  omit: (obj, keys) => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  },
  
  invert: (obj) => {
    const result = {}
    for (const key in obj) {
      result[obj[key]] = key
    }
    return result
  }
}

/**
 * NUMBER UTILITIES
 */
export const NumberUtils = {
  isEven: (n) => n % 2 === 0,
  
  isOdd: (n) => n % 2 !== 0,
  
  isPrime: (n) => {
    if (n < 2) return false
    for (let i = 2; i < n; i++) {
      if (n % i === 0) return false
    }
    return true
  },
  
  factorial: (n) => n <= 1 ? 1 : n * NumberUtils.factorial(n - 1),
  
  fibonacci: (n) => n <= 1 ? n : NumberUtils.fibonacci(n - 1) + NumberUtils.fibonacci(n - 2),
  
  round: (n, decimals = 0) => Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals),
  
  clamp: (n, min, max) => Math.max(min, Math.min(max, n)),
  
  range: (start, end, step = 1) => {
    const arr = []
    for (let i = start; i < end; i += step) {
      arr.push(i)
    }
    return arr
  },
  
  formatCurrency: (amount, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount),
  
  formatNumber: (n, decimals = 0) => n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
  
  percentage: (part, total) => ((part / total) * 100).toFixed(2) + '%'
}

/**
 * COLOR UTILITIES
 */
export const ColorUtils = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },
  
  rgbToHex: (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join(''),
  
  generateRandomColor: () => '#' + Math.floor(Math.random() * 16777215).toString(16),
  
  lighten: (hex, percent) => {
    const usePound = hex[0] === '#'
    hex = hex.replace('#', '')
    const num = parseInt(hex, 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = (num >> 8 & 0x00FF) + amt
    const B = (num & 0x0000FF) + amt
    return (usePound ? '#' : '') + (
      0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1)
  }
}

/**
 * LOCAL STORAGE UTILITIES
 */
export const StorageUtils = {
  set: (key, value, expiry = null) => {
    const item = { value, timestamp: Date.now() }
    if (expiry) item.expiry = Date.now() + expiry
    try {
      localStorage.setItem(key, JSON.stringify(item))
    } catch (e) {
      console.warn('Storage quota exceeded:', e)
    }
  },
  
  get: (key) => {
    const item = localStorage.getItem(key)
    if (!item) return null
    const parsed = JSON.parse(item)
    if (parsed.expiry && parsed.expiry < Date.now()) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.value
  },
  
  remove: (key) => localStorage.removeItem(key),
  
  clear: () => localStorage.clear(),
  
  getAllKeys: () => Object.keys(localStorage),
  
  getAllItems: () => {
    const items = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      items[key] = StorageUtils.get(key)
    }
    return items
  }
}

/**
 * DEBOUNCE & THROTTLE
 */
export function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * EXPORT ALL UTILITIES
 */
export default {
  StringUtils,
  DateUtils,
  ValidationUtils,
  ArrayUtils,
  ObjectUtils,
  NumberUtils,
  ColorUtils,
  StorageUtils,
  debounce,
  throttle
}