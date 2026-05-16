# Phaze AI - Backend Architecture & Structure

## Project Overview

Phaze AI backend is a Node.js/Express application that orchestrates AI agents for Instagram profile analysis and content generation. The system processes user requests asynchronously through a 5-step pipeline with real data integration and ML analysis.

---

## Backend Architecture

### High-Level Flow

```
User Request
    ↓
[Content Controller]
    ↓
Async Pipeline (5 Steps)
├── Step 1: Instagram Scraper Agent → Fetch real profile data
├── Step 2: Trend Analyzer Agent → ML analysis
├── Step 3: Hook Generator Agent → AI-generated hooks (parallel)
├── Step 4: Caption Generator Agent → AI-generated captions (parallel)
└── Step 5: Script Generator Agent → AI video scripts (parallel)
    ↓
Store Results + Return RequestID
    ↓
Frontend Polls for Results
    ↓
Display Generated Content
```

---

## Recommended Folder Structure

### Complete Backend Organization

```
backend/
├── src/
│   ├── config/                    # Configuration files
│   │   ├── environment.js         # Environment variables
│   │   ├── database.js            # MongoDB connection
│   │   └── cache.js               # Cache configuration
│   │
│   ├── models/                    # MongoDB Schemas
│   │   ├── User.js                # User model
│   │   ├── InfluencerProfile.js   # Influencer data
│   │   ├── GeneratedContent.js    # Content results
│   │   ├── ProcessingRequest.js   # Request tracking
│   │   ├── TrendReport.js         # Trend analysis results
│   │   ├── Analytics.js           # Analytics data
│   │   └── Agent.js               # Agent status tracking
│   │
│   ├── controllers/               # Request handlers
│   │   ├── contentController.js   # Main orchestrator
│   │   ├── agentController.js     # Agent management
│   │   ├── analyticsController.js # Analytics endpoints
│   │   ├── profileController.js   # Influencer profiles
│   │   └── healthController.js    # Health check
│   │
│   ├── routes/                    # API routes
│   │   ├── api.js                 # Main API routes
│   │   ├── agents.js              # Agent endpoints
│   │   ├── content.js             # Content generation
│   │   └── health.js              # Health/status routes
│   │
│   ├── services/                  # Business logic
│   │   ├── ai/
│   │   │   ├── contentGenerator.js      # Hook/Caption/Script AI
│   │   │   ├── trendAnalyzer.js        # ML trend analysis
│   │   │   └── embeddingService.js     # Vector embeddings
│   │   ├── instagram/
│   │   │   ├── instagramScraper.js     # Profile/post scraping
│   │   │   └── instagramAuth.js        # OAuth handling
│   │   ├── agents/
│   │   │   ├── AgentPool.js            # Agent orchestration
│   │   │   ├── ScraperAgent.js         # Data collection
│   │   │   ├── AnalyzerAgent.js        # Trend analysis
│   │   │   ├── GeneratorAgent.js       # Content generation
│   │   │   └── OptimizerAgent.js       # Performance optimization
│   │   ├── queue/
│   │   │   ├── JobQueue.js             # Request queue
│   │   │   └── TaskScheduler.js        # Scheduled tasks
│   │   └── cache/
│   │       └── CacheManager.js         # Caching layer
│   │
│   ├── middleware/                # Express middleware
│   │   ├── auth.js                # Authentication
│   │   ├── errorHandler.js        # Error handling
│   │   ├── logger.js              # Request logging
│   │   ├── validation.js          # Input validation
│   │   ├── rateLimit.js           # Rate limiting
│   │   └── cors.js                # CORS configuration
│   │
│   ├── utils/                     # Utility functions
│   │   ├── helpers.js             # General helpers
│   │   ├── validators.js          # Input validators
│   │   ├── transformers.js        # Data transformers
│   │   ├── constants.js           # App constants
│   │   └── logger.js              # Logging utility
│   │
│   ├── jobs/                      # Background jobs
│   │   ├── contentProcessor.js    # Async content processing
│   │   ├── trendUpdater.js        # Periodic trend updates
│   │   ├── cacheRefresh.js        # Cache invalidation
│   │   └── analyticsAggregator.js # Analytics compilation
│   │
│   ├── events/                    # Event emitters
│   │   ├── agentEvents.js         # Agent lifecycle events
│   │   ├── requestEvents.js       # Request processing events
│   │   └── errorEvents.js         # Error tracking
│   │
│   ├── websocket/                 # WebSocket (Optional)
│   │   ├── socket.js              # Socket.IO configuration
│   │   ├── handlers.js            # Event handlers
│   │   └── namespaces/            # Socket namespaces
│   │       ├── agent.js
│   │       └── notifications.js
│   │
│   ├── plugins/                   # External integrations
│   │   ├── huggingface.js         # HF API client
│   │   ├── rapidapi.js            # RapidAPI client
│   │   ├── openai.js              # OpenAI API (optional)
│   │   └── slack.js               # Slack notifications (optional)
│   │
│   └── server.js                  # Entry point
│
├── tests/                         # Test files
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   ├── e2e/                       # End-to-end tests
│   └── fixtures/                  # Test data
│
├── scripts/                       # Utility scripts
│   ├── seed.js                    # Seed database
│   ├── migrate.js                 # Run migrations
│   └── cleanup.js                 # Cleanup tasks
│
├── .env                           # Environment variables
├── .env.example                   # Example env file
├── package.json                   # Dependencies
├── server.js                      # Start server
└── README.md                      # Documentation
```

---

## MongoDB Schemas

### 1. User Model

```javascript
// backend/src/models/User.js
const userSchema = {
  _id: ObjectId,
  email: String,
  username: String,
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
  },
  subscription: {
    tier: String, // free | pro | enterprise
    createdAt: Date,
    expiresAt: Date,
  },
  apiKeys: [{
    key: String,
    name: String,
    createdAt: Date,
    lastUsed: Date,
  }],
  settings: {
    notifications: Boolean,
    darkMode: Boolean,
    language: String,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date (soft delete),
};
```

### 2. Processing Request Model

```javascript
// backend/src/models/ProcessingRequest.js
const processingRequestSchema = {
  _id: ObjectId,
  requestId: String (UUID),
  userId: ObjectId,
  
  input: {
    instagramUrl: String,
    platform: String, // instagram | youtube | twitter
    niche: String,
    targetAudience: String,
  },
  
  status: String, // pending | scraping | analyzing | generating | completed | failed
  progress: Number, // 0-100
  
  agents: [{
    name: String, // scraper | analyzer | hook-gen | caption-gen | script-gen
    status: String, // idle | running | completed | error
    startedAt: Date,
    completedAt: Date,
    duration: Number (milliseconds),
    error: String (if failed),
  }],
  
  results: {
    profileData: ObjectId (ref to InfluencerProfile),
    trends: ObjectId (ref to TrendReport),
    content: ObjectId (ref to GeneratedContent),
  },
  
  metrics: {
    totalTime: Number,
    apiCallsUsed: Number,
    tokensUsed: Number,
  },
  
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date (30 days for cleanup),
};
```

### 3. Influencer Profile Model

```javascript
// backend/src/models/InfluencerProfile.js
const profileSchema = {
  _id: ObjectId,
  
  instagram: {
    username: String (unique),
    userId: String,
    url: String,
    followers: Number,
    following: Number,
    posts: Number,
  },
  
  engagement: {
    avgLikes: Number,
    avgComments: Number,
    engagementRate: Number,
    reachPerPost: Number,
  },
  
  profile: {
    name: String,
    bio: String,
    avatar: String,
    category: String,
    businessCategory: String,
  },
  
  niche: {
    primary: String,
    secondary: [String],
    keywords: [String],
    audience: {
      age: [Number],
      interests: [String],
      countries: [String],
    },
  },
  
  posts: [{
    id: String,
    caption: String,
    imageUrl: String,
    videoUrl: String,
    timestamp: Date,
    likes: Number,
    comments: Number,
    hashtags: [String],
    mentions: [String],
  }],
  
  stats: {
    growthRate: Number,
    viralityScore: Number,
    authenticity: Number,
  },
  
  lastScraped: Date,
  nextScrapeScheduled: Date,
};
```

### 4. Generated Content Model

```javascript
// backend/src/models/GeneratedContent.js
const generatedContentSchema = {
  _id: ObjectId,
  requestId: ObjectId (ref to ProcessingRequest),
  
  hooks: [{
    text: String,
    score: Number,
    model: String,
    tokens: Number,
  }],
  
  captions: [{
    text: String,
    niche: String,
    tone: String,
    cta: String,
    hashtags: [String],
    score: Number,
  }],
  
  scripts: [{
    title: String,
    duration: Number,
    structure: {
      hook: String,
      body: [String],
      cta: String,
    },
    score: Number,
    aiModel: String,
  }],
  
  hashtags: {
    trending: [String],
    niche: [String],
    relevant: [String],
  },
  
  metadata: {
    generatedAt: Date,
    aiModelsUsed: [String],
    totalTokens: Number,
    cost: Number,
  },
};
```

### 5. Trend Report Model

```javascript
// backend/src/models/TrendReport.js
const trendReportSchema = {
  _id: ObjectId,
  profileId: ObjectId,
  
  trends: [{
    topic: String,
    momentum: Number, // 0-10
    trajectory: String, // rising | stable | declining
    confidence: Number,
    mentionCount: Number,
  }],
  
  topicClustering: {
    topics: [String],
    clusters: [{
      name: String,
      terms: [String],
      score: Number,
    }],
  },
  
  recommendations: [{
    title: String,
    description: String,
    expectedImpact: Number,
    difficulty: String, // easy | medium | hard
    priority: Number, // 1-5
  }],
  
  insights: {
    bestPostingTimes: [String],
    topPerformingContent: [String],
    audienceBehavior: String,
    growthOpportunities: [String],
  },
  
  competitorAnalysis: {
    topCompetitors: [String],
    competitorTrends: [String],
    marketGap: String,
  },
  
  createdAt: Date,
  updatedAt: Date,
};
```

### 6. Analytics Model

```javascript
// backend/src/models/Analytics.js
const analyticsSchema = {
  _id: ObjectId,
  
  daily: {
    date: Date,
    totalRequests: Number,
    successfulRequests: Number,
    failedRequests: Number,
    avgProcessingTime: Number,
    totalTokensUsed: Number,
    totalCost: Number,
  },
  
  userActivity: {
    activeUsers: Number,
    newUsers: Number,
    returningUsers: Number,
    averageSessionDuration: Number,
  },
  
  apiMetrics: {
    huggingfaceApiCalls: Number,
    instagramScraperCalls: Number,
    successRate: Number,
    avgResponseTime: Number,
  },
  
  errors: {
    totalErrors: Number,
    byType: {
      apiError: Number,
      validationError: Number,
      timeoutError: Number,
      otherError: Number,
    },
  },
};
```

---

## Express API Routes

### Route Structure

```javascript
// backend/src/routes/api.js
const express = require('express');
const router = express.Router();

// Auth routes (public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);

// Content Generation (protected)
router.post('/content/generate', authenticate, validateInput, contentController.submitInfluencer);
router.get('/content/:requestId', authenticate, contentController.getGeneratedContent);
router.get('/content/status/:requestId', contentController.getProcessingStatus);
router.get('/dashboard/stats', authenticate, contentController.getDashboardStats);

// Agent Management
router.get('/agents/status', authenticate, agentController.getAgentStatus);
router.get('/agents/pipeline', authenticate, agentController.getPipelineStatus);
router.post('/agents/cancel/:requestId', authenticate, agentController.cancelRequest);

// Profiles
router.get('/profiles', authenticate, profileController.getUserProfiles);
router.post('/profiles', authenticate, profileController.createProfile);
router.get('/profiles/:id', authenticate, profileController.getProfile);
router.delete('/profiles/:id', authenticate, profileController.deleteProfile);

// Analytics
router.get('/analytics/dashboard', authenticate, analyticsController.getDashboard);
router.get('/analytics/trends', authenticate, analyticsController.getTrends);

// Health Check
router.get('/health', healthController.check);

module.exports = router;
```

---

## Agent Architecture

### Agent Communication Flow

```javascript
// backend/src/services/agents/AgentPool.js

class AgentPool {
  constructor(maxAgents = 10) {
    this.agents = [];
    this.queue = [];
    this.maxAgents = maxAgents;
  }

  async executeJob(job) {
    // 1. Get available agent
    const agent = await this.getAvailableAgent();
    
    // 2. Start job
    agent.start(job);
    
    // 3. Emit event
    this.emit('agent:started', { agentId: agent.id, jobId: job.id });
    
    // 4. Wait for completion
    const result = await agent.waitForCompletion();
    
    // 5. Emit completion event
    this.emit('agent:completed', { agentId: agent.id, result });
    
    // 6. Release agent
    agent.reset();
    
    return result;
  }

  async executeParallel(jobs) {
    return Promise.all(jobs.map(job => this.executeJob(job)));
  }
}
```

### Agent Types

#### 1. Scraper Agent
```javascript
// backend/src/services/agents/ScraperAgent.js
class ScraperAgent {
  async execute(username) {
    // 1. Fetch real Instagram data via RapidAPI
    // 2. Parse profile information
    // 3. Extract engagement metrics
    // 4. Return structured profile data
  }
}
```

#### 2. Analyzer Agent
```javascript
// backend/src/services/agents/AnalyzerAgent.js
class AnalyzerAgent {
  async execute(profileData, recentPosts) {
    // 1. Extract topics from captions (NLP)
    // 2. Calculate trend momentum
    // 3. Generate growth recommendations
    // 4. Return trend report
  }
}
```

#### 3. Generator Agent
```javascript
// backend/src/services/agents/GeneratorAgent.js
class GeneratorAgent {
  async generateHooks(profileData, niche) {
    // Use Hugging Face LLaMA to generate hooks
  }

  async generateCaptions(topic, niche, engagement) {
    // Generate context-aware captions
  }

  async generateScripts(topic, duration, niche) {
    // Generate structured video scripts
  }
}
```

#### 4. Optimizer Agent
```javascript
// backend/src/services/agents/OptimizerAgent.js
class OptimizerAgent {
  async scoreContent(content) {
    // Score virality potential
    // Optimize for engagement
    // Suggest improvements
  }
}
```

---

## Request Processing Pipeline

### Complete 5-Step Flow

```javascript
// backend/src/controllers/contentController.js

async function processInfluencer(requestId, username, platform, niche) {
  try {
    // Step 1: SCRAPE PROFILE
    console.log('Step 1: Scraping Instagram profile...');
    const profileData = await instagramScraper.scrapeProfile(username);
    const recentPosts = await instagramScraper.getRecentPosts(username, 20);
    
    updateRequest(requestId, { status: 'scraping', progress: 20 });

    // Step 2: ANALYZE TRENDS
    console.log('Step 2: Analyzing trends...');
    const trends = await trendAnalyzer.analyzeTrends(profileData, recentPosts);
    
    updateRequest(requestId, { status: 'analyzing', progress: 40 });

    // Step 3-5: PARALLEL GENERATION
    console.log('Step 3-5: Generating AI content (parallel)...');
    const [hooks, captions, scripts, hashtags] = await Promise.all([
      aiGenerator.generateHooks(profileData, niche, 5),
      aiGenerator.generateCaptions(trends.topicClusters[0], niche, profileData.engagement),
      aiGenerator.generateScripts(trends.topicClusters[0], 60, niche, profileData),
      aiGenerator.generateHashtags(trends.topicClusters, niche, 15),
    ]);

    updateRequest(requestId, { status: 'generating', progress: 75 });

    // STORE RESULTS
    const results = {
      profileData,
      trends,
      content: { hooks, captions, scripts, hashtags },
      scores: calculateScores(trends, content),
    };

    updateRequest(requestId, {
      status: 'completed',
      progress: 100,
      results,
    });

  } catch (error) {
    updateRequest(requestId, {
      status: 'failed',
      error: error.message,
    });
  }
}
```

---

## Environment Configuration

### .env File

```env
# Server
PORT=5000
NODE_ENV=development
LOG_LEVEL=info

# Database
MONGODB_URI=mongodb://localhost:27017/phaze-ai
MONGODB_USER=admin
MONGODB_PASSWORD=secure_password

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=refresh_secret_key

# AI/ML APIs
HUGGINGFACE_API_KEY=hf_your_api_key_here
HUGGINGFACE_MODEL_HOOKS=meta-llama/Llama-2-7b-chat-hf
HUGGINGFACE_MODEL_CAPTIONS=facebook/bart-large-cnn

# Instagram
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=instagram-data1.p.rapidapi.com

# Cache
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# Frontend
VITE_API_URL=http://localhost:5000/api

# Logging
LOG_FILE=./logs/app.log
LOG_MAX_SIZE=10M

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring
SENTRY_DSN=optional_sentry_key
```

---

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "results": {
      "hooks": [...],
      "captions": [...],
      "scripts": [...]
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Instagram URL is invalid",
    "details": "Expected format: https://instagram.com/username"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Middleware Stack

```javascript
// Express middleware order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(logger); // Request logging
app.use(rateLimit); // Rate limiting
app.use(authenticate); // Auth verification
app.use(validateInput); // Input validation
app.use(errorHandler); // Error handling
```

---

## Scalability Recommendations

### Horizontal Scaling

1. **Database**: Use MongoDB Atlas with replica sets
2. **Cache**: Redis cluster for distributed caching
3. **Queue**: Bull or RabbitMQ for job queuing
4. **Load Balancer**: Nginx or AWS ELB
5. **Containerization**: Docker + Kubernetes

### Performance Optimization

1. **Database Indexing**: Index frequently queried fields
2. **Query Optimization**: Use lean() for read-only queries
3. **Connection Pooling**: Configure MongoDB connection pool
4. **API Caching**: Cache trending data (1-hour TTL)
5. **Compression**: Enable gzip compression

---

## Deployment Guide

### Development

```bash
npm install
npm run dev
```

### Production

```bash
npm install --production
npm run build
npm start
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## Monitoring & Logging

### Key Metrics to Track

- Request latency (p50, p95, p99)
- API call success rates
- Agent processing times
- Error rates by type
- Cache hit/miss ratios
- Database query performance

### Logging Strategy

```javascript
// Use structured logging
logger.info('Agent started', { 
  agentId, 
  jobId, 
  timestamp 
});

logger.error('Processing failed', { 
  requestId, 
  error: error.message, 
  stack: error.stack 
});
```

---

**Backend Version:** 2.0
**Last Updated:** 2024
**Tech Stack:** Node.js + Express + MongoDB + Hugging Face + RapidAPI
