# Phaze AI — Architecture Documentation

## System Overview

Phaze AI is a modern AI SaaS platform for autonomous content generation, built with a scalable frontend-backend architecture designed to integrate AI agents and automation workflows.

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vite + React)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Landing     │  │  Dashboard   │  │  Agent       │      │
│  │  Page        │  │  Page        │  │  Visualization      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓             │
│  ┌──────────────────────────────────────────────┐          │
│  │     Framer Motion Animations & Transitions    │          │
│  │     Tailwind CSS Styling & Responsiveness     │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                           ↕
                    (Axios HTTP Client)
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│  ┌──────────────────────────────────────────────┐           │
│  │          API Routes & Controllers             │           │
│  │  ┌──────────────────────────────────────┐    │           │
│  │  │  • Influencer Management             │    │           │
│  │  │  • Content Generation                │    │           │
│  │  │  • Trend Analysis                    │    │           │
│  │  │  • Agent Pipeline Status             │    │           │
│  │  │  • Analytics                         │    │           │
│  │  └──────────────────────────────────────┘    │           │
│  └──────────────────────────────────────────────┘           │
│         ↓                                                    │
│  ┌──────────────────────────────────────────────┐           │
│  │    Services & Business Logic                 │           │
│  │    (Future: Agent Orchestration)             │           │
│  └──────────────────────────────────────────────┘           │
│         ↓                                                    │
│  ┌──────────────────────────────────────────────┐           │
│  │    Data Models & Schemas (MongoDB)           │           │
│  │  ┌──────────────────────────────────────┐    │           │
│  │  │  • User                              │    │           │
│  │  │  • Influencer                        │    │           │
│  │  │  • GeneratedScript                   │    │           │
│  │  │  • TrendReport                       │    │           │
│  │  │  • Analytics                         │    │           │
│  │  └──────────────────────────────────────┘    │           │
│  └──────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│              EXTERNAL INTEGRATIONS (Future)                  │
│  ┌──────────────────────────────────────────────┐           │
│  │  • OpenRouter API (Claude, GPT models)       │           │
│  │  • n8n Workflows                            │           │
│  │  • Social Media APIs                        │           │
│  │  • Scraping Services                        │           │
│  │  • Analytics Platforms                      │           │
│  └──────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────────────────────────────────────────┐           │
│  │          MongoDB Database                     │           │
│  │  ┌──────────────────────────────────────┐    │           │
│  │  │  Collections:                        │    │           │
│  │  │  • users                             │    │           │
│  │  │  • influencers                       │    │           │
│  │  │  • generatedScripts                  │    │           │
│  │  │  • trendReports                      │    │           │
│  │  │  • analytics                         │    │           │
│  │  └──────────────────────────────────────┘    │           │
│  └──────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Tech Stack
- **Vite**: Lightning-fast build tool with HMR
- **React 18**: UI framework with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Component Structure

```
src/
├── pages/
│   ├── Landing.jsx          # Landing page entry
│   └── Dashboard.jsx        # Dashboard entry
├── components/
│   ├── landing/
│   │   ├── Hero.jsx         # Hero section with CTA
│   │   ├── Features.jsx     # 6-feature showcase
│   │   ├── PipelineShowcase.jsx  # 4-agent pipeline
│   │   ├── Testimonials.jsx # Social proof
│   │   ├── Pricing.jsx      # Pricing tiers
│   │   └── Footer.jsx       # Footer links
│   └── dashboard/
│       ├── Sidebar.jsx      # Navigation sidebar
│       ├── DashboardContent.jsx  # Main content area
│       ├── StatsCards.jsx   # KPI cards
│       ├── GeneratorSection.jsx  # URL input form
│       ├── ActivityFeed.jsx # Recent activity
│       └── AgentPipeline.jsx    # Agent status visualization
├── services/
│   └── api.js               # Axios instance & methods
├── mock/
│   └── data.js              # Mock data for dev
└── styles/
    └── globals.css          # Global styles & animations
```

### Key Design Patterns

1. **Component Composition**: Small, reusable components
2. **Motion Animations**: Framer Motion for smooth transitions
3. **Responsive Design**: Mobile-first Tailwind CSS
4. **API Integration**: Centralized Axios client
5. **Mock Data Layer**: Easy switching to real APIs

---

## Backend Architecture

### Tech Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Document database (schema-ready)
- **Mongoose**: ODM for MongoDB (future)
- **CORS**: Cross-origin resource sharing

### Request/Response Flow

```
Client Request
    ↓
CORS Middleware
    ↓
Route Handler (routes/api.js)
    ↓
Controller Function (contentController.js)
    ↓
Service/Business Logic
    ↓
Mock Data / Database Query
    ↓
JSON Response
```

### API Route Organization

```
/api
├── /influencer
│   ├── POST /submit        → submitInfluencer()
│   ├── GET /:id/content    → getGeneratedContent()
│   ├── GET /:id/trends     → getTrendAnalysis()
│   └── POST /scrape        → scrapeProfile()
├── /generate
│   ├── POST /scripts       → generateScripts()
│   └── POST /hooks         → generateHooks()
├── /dashboard
│   ├── GET /stats          → getDashboardStats()
│   └── GET /pipeline       → getAgentPipelineStatus()
└── /analytics
    └── GET /               → getAnalytics()
```

### Data Models

#### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  username: String,
  password: String,
  profile: {
    name: String,
    avatar: String,
    bio: String
  },
  influencers: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

#### Influencer
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  username: String,
  platform: String (enum),
  profileUrl: String,
  niche: String,
  followers: Number,
  engagement: Number,
  analytics: {
    recentPostCount: Number,
    averageEngagement: Number,
    topicsOfInterest: [String]
  },
  createdAt: Date
}
```

#### GeneratedScript
```javascript
{
  _id: ObjectId,
  influencerId: ObjectId,
  userId: ObjectId,
  hooks: [String],
  captions: [String],
  scripts: [{ title, content, duration }],
  hashtags: [String],
  trendScore: Number,
  engagementScore: Number,
  status: String (enum),
  agentStages: {
    scraper: { completed, timestamp },
    validator: { completed, timestamp },
    writer: { completed, timestamp },
    hookGenerator: { completed, timestamp }
  },
  createdAt: Date
}
```

---

## Agent Pipeline Architecture

### Current Status: Visualization Only

The 4-agent pipeline is currently visualized on the frontend with mock data:

1. **Scraper Agent** 🕷️
   - Collects top-performing content
   - Analyzes audience data
   - Tracks trends

2. **Validator Agent** ✓
   - Scores content ideas
   - Validates against engagement metrics
   - Filters low-potential topics

3. **Writer Agent** ✏️
   - Generates tailored scripts
   - Adapts to platform requirements
   - Maintains creator voice

4. **Hook Generator** ✨
   - Creates viral hooks
   - Generates captions
   - Produces hashtag recommendations

### Future Integration

```
┌─────────────────┐
│  User Input     │
│  (URL, Platform)│
└────────┬────────┘
         ↓
    [n8n Workflow]
         ↓
    ┌────────────────────────────────────┐
    │     Agent Orchestration Layer       │
    └────────────────────────────────────┘
         ↓
    ┌────────────┬────────────┬────────────┬────────────┐
    ↓            ↓            ↓            ↓            ↓
  Scraper    Validator    Writer      Hook Gen    Output Gen
    ↓            ↓            ↓            ↓            ↓
    └────────────┴────────────┴────────────┴────────────┘
                         ↓
                 [OpenRouter API]
                  (Claude/GPT)
                         ↓
                    [Results]
```

---

## Data Flow

### Content Generation Flow

```
1. User submits influencer URL
   POST /api/influencer/submit
   
2. Backend processes request
   - Generate request ID
   - Queue for processing
   - Return 202 Accepted
   
3. Agent Pipeline Processes (simulated)
   - Scraper: fetches profile data
   - Validator: scores trends
   - Writer: generates scripts
   - Hook Gen: creates hooks
   
4. Results stored/returned
   - Save to database
   - Return generated content
   
5. Frontend displays results
   - Update UI with content
   - Show agent pipeline status
   - Enable exports/sharing
```

---

## Security Considerations

### Current (MVP)
- CORS enabled for frontend
- Basic error handling
- No authentication

### Future Implementation
- JWT authentication
- Rate limiting
- Input validation
- SQL/NoSQL injection prevention
- XSS protection
- API key management
- Encrypted sensitive data

---

## Performance Optimizations

### Frontend
- Vite code splitting
- Lazy loading of routes
- Image optimization
- CSS minification
- JavaScript bundling

### Backend
- Response caching
- Database indexing
- Connection pooling
- Async/await patterns
- Request validation

---

## Deployment Architecture

### Frontend (Vercel/Netlify)
```
vite build → dist/ → CDN → Global Edge Cache
```

### Backend (Heroku/Railway/Render)
```
Node.js App → Express Server → MongoDB Atlas
```

---

## Testing Strategy (Future)

- **Unit Tests**: Jest for components & functions
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Cypress for user flows
- **Load Tests**: Testing concurrent requests

---

## Monitoring & Logging (Future)

- **Frontend**: Sentry for error tracking
- **Backend**: Morgan for HTTP logging
- **Metrics**: Prometheus for performance
- **Uptime**: UptimeRobot monitoring

---

## Scalability Roadmap

### Phase 1 (Current)
- Mock APIs
- Single server instance
- Basic schema

### Phase 2
- Real database (MongoDB Atlas)
- API rate limiting
- Caching layer (Redis)

### Phase 3
- Microservices architecture
- Load balancing
- Dedicated agent servers
- Message queue (RabbitMQ)

### Phase 4
- Global CDN
- Database replication
- Kubernetes orchestration
- Advanced monitoring

---

**Last Updated**: 2026-05-11  
**Current Phase**: MVP - Phase 1
