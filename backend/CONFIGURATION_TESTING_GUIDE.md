# Backend Configuration & Testing Guide

## 📋 Table of Contents
1. [Environment Configuration](#environment-configuration)
2. [Module Import Guide](#module-import-guide)
3. [Testing Guide](#testing-guide)
4. [Performance Optimization](#performance-optimization)
5. [Troubleshooting](#troubleshooting)

---

## Environment Configuration

### .env File Template
```env
# ============================================================================
# SERVER CONFIGURATION
# ============================================================================

# Server port
PORT=5000

# Environment (development, staging, production)
NODE_ENV=development

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================

# MongoDB connection URI
MONGODB_URI=mongodb://localhost:27017/phaze-ai

# Database connection timeouts (milliseconds)
DB_SELECTION_TIMEOUT=5000
DB_SOCKET_TIMEOUT=45000
DB_CONNECT_TIMEOUT=10000

# Connection pool configuration
DB_MAX_POOL_SIZE=10
DB_MIN_POOL_SIZE=2
DB_MAX_IDLE_TIME=30000
DB_ZLIB_LEVEL=5

# ============================================================================
# AI CONFIGURATION
# ============================================================================

# OpenAI API Key
OPENAI_API_KEY=sk_test_your_api_key_here

# AI Model to use
AI_MODEL=gpt-4-turbo

# Maximum tokens for AI responses
AI_MAX_TOKENS=2000

# Temperature for AI responses (0-1)
AI_TEMPERATURE=0.8

# Retry configuration
AI_RETRY_ATTEMPTS=3
AI_RETRY_DELAY=1000

# ============================================================================
# RATE LIMITING CONFIGURATION
# ============================================================================

# Rate limit window (milliseconds)
RATE_LIMIT_WINDOW=60000

# Maximum requests per window
RATE_LIMIT_MAX=100

# Redis URL for distributed rate limiting (optional)
REDIS_URL=redis://localhost:6379

# ============================================================================
# CORS CONFIGURATION
# ============================================================================

# Allowed origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8000

# ============================================================================
# LOGGING CONFIGURATION
# ============================================================================

# Log level (info, warn, error, debug)
LOG_LEVEL=debug

# Enable request logging
LOG_REQUESTS=true

# Enable error logging
LOG_ERRORS=true

# ============================================================================
# CACHE CONFIGURATION
# ============================================================================

# Cache size limit
CACHE_MAX_SIZE=1000

# Cache TTL in milliseconds
CACHE_TTL=3600000

# Enable caching
CACHE_ENABLED=true

# ============================================================================
# SECURITY CONFIGURATION
# ============================================================================

# JWT Secret (if implementing JWT)
JWT_SECRET=your_secret_key_here

# Password salt rounds for bcrypt
PASSWORD_SALT_ROUNDS=10

# API Key prefix
API_KEY_PREFIX=sk_

# ============================================================================
# INSTAGRAM CONFIGURATION
# ============================================================================

# Instagram Access Token (if scraping)
INSTAGRAM_ACCESS_TOKEN=your_token_here

# Instagram Business Account ID
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id_here

# ============================================================================
# EMAIL CONFIGURATION (OPTIONAL)
# ============================================================================

# Email service provider
EMAIL_SERVICE=gmail

# Email sender address
EMAIL_FROM=noreply@phaze-ai.com

# SMTP configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# ============================================================================
# STRIPE CONFIGURATION (OPTIONAL - for payments)
# ============================================================================

# Stripe API Keys
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# ============================================================================
# ANALYTICS CONFIGURATION (OPTIONAL)
# ============================================================================

# Google Analytics ID
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# Sentry DSN for error tracking
SENTRY_DSN=https://your_sentry_dsn

# ============================================================================
# FEATURE FLAGS
# ============================================================================

# Enable specific features
FEATURE_AI_GENERATION=true
FEATURE_BATCH_PROCESSING=true
FEATURE_ANALYTICS=true
FEATURE_INSTAGRAM_SCRAPING=true
FEATURE_CACHING=true

# ============================================================================
# DEVELOPMENT CONFIGURATION
# ============================================================================

# Debug mode
DEBUG=false

# Verbose logging
VERBOSE=false

# Test data initialization
INIT_TEST_DATA=false

# Mock API responses
MOCK_API_RESPONSES=false
```

---

## Module Import Guide

### Complete Module Import Example
```javascript
import {
  // Database
  connectDatabase,
  dbManager,
  
  // Middleware
  sanitizeInput,
  rateLimit,
  errorHandler,
  validateRequest,
  asyncHandler,
  InputSanitizer,
  RequestValidator,
  
  // Controllers
  ContentGenerationServices,
  
  // Services
  AnalysisServices,
  ContentGenerationServices,
  
  // Models
  DatabaseModels,
  
  // Utilities
  DataUtilities,
  StringUtil,
  DateUtil,
  ValidationUtil,
  
  // Helper functions
  initializeBackend,
  getBackendStats,
  getAvailableEndpoints
} from './src/index.js'

// Usage example
async function setupApplication() {
  // Initialize all modules
  const backend = await initializeBackend()
  
  // Get statistics
  const stats = getBackendStats()
  console.log('Backend Stats:', stats)
  
  // Use utilities
  const formatted = DateUtil.format(new Date(), 'YYYY-MM-DD')
  const validated = ValidationUtil.isValidEmail('user@example.com')
  
  // Use services
  const hooks = await ContentGenerationServices.advanced.generateHooks({
    username: 'example_user',
    niche: 'fashion'
  })
}
```

### Selective Module Import
```javascript
// Import specific utilities
import { DataProcessor, StatisticalAnalyzer } from './src/utils/advancedUtils.js'

// Import specific middleware
import { sanitizeInput, validateRequest } from './src/middleware/errorHandler.js'

// Import specific models
import { User, Influencer } from './src/models/advancedModels.js'

// Usage
const users = await User.find({ isActive: true })
const stats = DataProcessor.groupBy(users, u => u.subscription.tier)
```

---

## Testing Guide

### 1. Unit Testing

```javascript
// Test DataProcessor
import { DataProcessor } from './src/utils/advancedUtils.js'

describe('DataProcessor', () => {
  test('normalize should scale values to 0-1', () => {
    const result = DataProcessor.normalize(50, 0, 100)
    expect(result).toBe(0.5)
  })

  test('groupBy should group items by key function', () => {
    const items = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' }
    ]
    const grouped = DataProcessor.groupBy(items, i => i.category)
    expect(Object.keys(grouped)).toHaveLength(2)
    expect(grouped.A).toHaveLength(2)
  })

  test('unique should remove duplicates', () => {
    const arr = [1, 2, 2, 3, 3, 3]
    const result = DataProcessor.unique(arr)
    expect(result).toEqual([1, 2, 3])
  })
})
```

### 2. Integration Testing

```javascript
// Test input sanitization and validation
import { InputSanitizer, RequestValidator } from './src/middleware/errorHandler.js'

describe('Input Security', () => {
  test('sanitizeString should remove XSS attempts', () => {
    const dirty = '<script>alert("xss")</script>Hello'
    const clean = InputSanitizer.sanitizeString(dirty)
    expect(clean).not.toContain('<script>')
  })

  test('validateRequired should identify missing fields', () => {
    const data = { name: 'John' }
    const validation = RequestValidator.validateRequired(data, ['name', 'email'])
    expect(validation.valid).toBe(false)
    expect(validation.missing).toContain('email')
  })

  test('validateEmails should verify email format', () => {
    const data = { email: 'invalid-email' }
    const validation = RequestValidator.validateEmails(data, ['email'])
    expect(validation.valid).toBe(false)
  })
})
```

### 3. Performance Testing

```javascript
import { PerformanceMonitor } from './src/utils/advancedUtils.js'

describe('Performance Monitoring', () => {
  test('should track operation duration', () => {
    const monitor = new PerformanceMonitor()
    
    const measurement = monitor.startMeasure('test-operation')
    
    // Simulate work
    for (let i = 0; i < 1000000; i++) {}
    
    monitor.endMeasure(measurement)
    
    const metrics = monitor.getMetrics('test-operation')
    expect(metrics.count).toBe(1)
    expect(metrics.average).toBeGreaterThan(0)
  })
})
```

### 4. API Testing

```javascript
// Test API endpoints
import request from 'supertest'
import app from './src/server.js'

describe('API Endpoints', () => {
  test('GET /health should return healthy status', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })

  test('GET /api/status should return API status', async () => {
    const res = await request(app).get('/api/status')
    expect(res.status).toBe(200)
    expect(res.body.status).toBeDefined()
  })

  test('POST /api/generate/hooks should generate hooks', async () => {
    const res = await request(app)
      .post('/api/generate/hooks')
      .send({
        profileData: { username: 'test_user', niche: 'fashion' },
        count: 5
      })
    
    expect(res.status).toBe(200)
    expect(res.body.hooks).toBeDefined()
    expect(res.body.hooks.length).toBeLessThanOrEqual(5)
  })
})
```

### 5. Load Testing

```javascript
// Load test using autocannon
import autocannon from 'autocannon'

async function loadTest() {
  const result = await autocannon({
    url: 'http://localhost:5000',
    connections: 10,
    pipelining: 1,
    duration: 30,
    requests: [
      {
        path: '/health',
        method: 'GET'
      },
      {
        path: '/api/status',
        method: 'GET'
      },
      {
        path: '/api/generate/hooks',
        method: 'POST',
        body: JSON.stringify({
          profileData: { username: 'test', niche: 'fashion' },
          count: 5
        })
      }
    ]
  })

  console.log('Load Test Results:', result)
}
```

---

## Performance Optimization

### 1. Database Optimization
```javascript
// Enable query indexing
import { Influencer } from './src/models/advancedModels.js'

// Create indexes
await Influencer.collection.createIndex({ niche: 1, 'statistics.followers': -1 })
await Influencer.collection.createIndex({ username: 1, platform: 1 })

// Use lean() for read-only queries
const influencers = await Influencer.find({ niche: 'fashion' }).lean()
```

### 2. Caching Strategy
```javascript
import { CacheUtil } from './src/utils/advancedUtils.js'

// Create cache with 1 hour TTL
const cache = new CacheUtil(1000, 3600000)

// Cache frequently accessed data
function getCachedInfluencers(niche) {
  const cacheKey = `influencers:${niche}`
  
  let data = cache.get(cacheKey)
  if (!data) {
    data = Influencer.find({ niche })
    cache.set(cacheKey, data)
  }
  
  return data
}
```

### 3. Query Optimization
```javascript
// Use projection to reduce data transfer
const data = await Influencer.find(
  { niche: 'fashion' },
  'username profileImage statistics.followers'
).limit(100)

// Use aggregation pipeline for complex queries
const pipeline = [
  { $match: { niche: 'fashion' } },
  { $group: {
      _id: '$niche',
      avgFollowers: { $avg: '$statistics.followers' },
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
]

const results = await Influencer.aggregate(pipeline)
```

### 4. Rate Limiting Optimization
```javascript
// Configure rate limiting per endpoint
import { rateLimit } from './src/middleware/errorHandler.js'

// Strict limit for expensive operations
app.post('/api/batch/generate', 
  rateLimit(5, 60000, { blockAfterViolations: 2 }),
  handler
)

// Relaxed limit for read operations
app.get('/api/analytics',
  rateLimit(100, 60000, { blockAfterViolations: 10 }),
  handler
)
```

---

## Troubleshooting

### Issue: Database Connection Fails

**Symptoms:** `MongoDB connection error` in logs

**Solutions:**
```javascript
// Check connection status
console.log(dbManager.getStatus())

// Verify MongoDB is running
// For local: mongod --dbpath /path/to/data

// Check connection string in .env
// Format: mongodb://[username:password@]host:port/database

// Verify firewall/network access
// Test with mongo shell: mongo "mongodb://localhost:27017"
```

### Issue: Rate Limiting Too Strict

**Symptoms:** Too many 429 (Too Many Requests) responses

**Solutions:**
```javascript
// Adjust rate limit configuration
rateLimit(
  200,      // Increase max requests
  60000,    // Or increase window duration
  { blockAfterViolations: 10 }  // Increase before blocking
)

// For development, use higher limits
if (process.env.NODE_ENV === 'development') {
  rateLimit(1000, 60000, { blockAfterViolations: 50 })
}
```

### Issue: Memory Leak in Cache

**Symptoms:** Memory usage continuously grows

**Solutions:**
```javascript
// Clear cache periodically
setInterval(() => {
  cache.clear()
}, 3600000) // Clear every hour

// Monitor cache size
console.log(cache.getStats())

// Use smaller TTL
const cache = new CacheUtil(500, 600000) // 10 minutes instead of 1 hour
```

### Issue: AI Generation Timeouts

**Symptoms:** `Gateway Timeout` or `Service Unavailable`

**Solutions:**
```javascript
// Increase timeout
AI_RETRY_ATTEMPTS=5
AI_RETRY_DELAY=2000

// Check API key
console.log(process.env.OPENAI_API_KEY ? 'Key set' : 'Key missing')

// Use fallback generator
const result = await aiContentGenerator.generateHooks({
  username: 'test',
  niche: 'fashion'
})
// Will use fallback if API fails

// Monitor API quota
// https://platform.openai.com/account/usage/overview
```

### Issue: Input Validation Errors

**Symptoms:** 400 Bad Request with validation errors

**Solutions:**
```javascript
// Verify request format
// POST body should be JSON
Content-Type: application/json

// Check required fields
// Example: POST /api/generate/hooks requires 'profileData'
const body = {
  profileData: { username: 'user', niche: 'fashion' },
  count: 5
}

// Validate email format
RequestValidator.validateEmails(
  { email: 'user@example.com' },
  ['email']
)

// Sanitize input before sending
const clean = InputSanitizer.sanitizeObject(userInput)
```

---

## Performance Benchmarks

### Expected Performance

| Operation | Time | Notes |
|-----------|------|-------|
| Health Check | < 10ms | Cached |
| Generate Hooks | 1-3s | Depends on AI API |
| Database Query | 10-100ms | With indexes |
| Cache Hit | < 1ms | In-memory |
| Input Sanitization | < 5ms | Depth-limited |

### Monitoring Commands

```bash
# Monitor memory usage
node --max-old-space-size=4096 src/server.js

# Monitor with New Relic (optional)
NEW_RELIC_APP_NAME=phaze-ai npm start

# Monitor with PM2
pm2 start src/server.js --name "phaze-ai"
pm2 monit
```

---

**Version:** 2.0.0  
**Last Updated:** 2024  
**Status:** Production Ready ✅