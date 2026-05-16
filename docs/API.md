# Phaze AI — API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently using mock data. Future versions will implement JWT authentication.

---

## Influencer Endpoints

### Submit Influencer Profile
```
POST /api/influencer/submit
```

**Request Body:**
```json
{
  "url": "https://instagram.com/username",
  "platform": "instagram",
  "niche": "Tech & Lifestyle"
}
```

**Response (202 Accepted):**
```json
{
  "id": "req_123456",
  "status": "processing",
  "message": "Content generation started",
  "platform": "instagram",
  "url": "https://instagram.com/username",
  "estimatedTime": "15-30 seconds"
}
```

---

### Get Generated Content
```
GET /api/influencer/:influencerId/content
```

**Response (200 OK):**
```json
{
  "id": "infl_123",
  "influencer": {
    "username": "alexcreates",
    "platform": "instagram",
    "followers": 125000,
    "engagement": 8.5
  },
  "content": {
    "hooks": [
      "This AI tool just saved me 10 hours of work (and it's free)",
      "Watch me automate my entire content pipeline in 5 minutes"
    ],
    "captions": [
      "Just discovered this game-changing tool for creators. The automation is insane. 🚀"
    ],
    "scripts": [
      {
        "title": "60-Second Product Demo",
        "content": "Hook: [Opening hook]...",
        "duration": "60s"
      }
    ],
    "hashtags": ["#AI", "#ContentCreation", "#Automation"],
    "trendScore": 8.7,
    "engagementScore": 9.2
  },
  "generatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Get Trend Analysis
```
GET /api/influencer/:influencerId/trends
```

**Response (200 OK):**
```json
{
  "id": "trend_123",
  "influencerId": "infl_123",
  "trends": [
    {
      "topic": "AI Automation",
      "score": 9.8,
      "momentum": "rapidly rising"
    }
  ],
  "growthRecommendations": [
    "Post 3-4 times per week at optimal times",
    "Focus on tech-savvy audience (25-45 age group)"
  ],
  "bestPostingTimes": [
    {
      "day": "Tuesday",
      "time": "9:00 AM",
      "engagement": 12.5
    }
  ],
  "topPerformingCategories": [
    {
      "category": "Tutorial",
      "engagement": 12.3,
      "count": 15
    }
  ],
  "viralTopicSuggestions": [
    "Time-saving AI tools comparison",
    "Content creation workflow automation"
  ],
  "generatedAt": "2024-01-15T10:35:00Z"
}
```

---

## Content Generation Endpoints

### Generate Scripts
```
POST /api/generate/scripts
```

**Request Body:**
```json
{
  "influencerId": "infl_123"
}
```

**Response (202 Accepted):**
```json
{
  "id": "gen_789",
  "status": "generating",
  "message": "Script generation started",
  "influencerId": "infl_123",
  "estimatedTime": "8-15 seconds"
}
```

---

### Generate Hooks
```
POST /api/generate/hooks
```

**Request Body:**
```json
{
  "influencerId": "infl_123",
  "count": 5
}
```

**Response (202 Accepted):**
```json
{
  "id": "gen_790",
  "status": "generating",
  "message": "Generating 5 hooks",
  "influencerId": "infl_123",
  "count": 5,
  "estimatedTime": "3-5 seconds"
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics
```
GET /api/dashboard/stats
```

**Response (200 OK):**
```json
{
  "stats": {
    "totalInfluencers": 3,
    "totalScriptsGenerated": 127,
    "activeRequests": 2,
    "successRate": 96.8,
    "recentActivity": [
      {
        "id": 1,
        "action": "Generated content for @alexcreates",
        "platform": "Instagram",
        "time": "2 mins ago"
      }
    ]
  },
  "agentPipeline": {
    "agents": [
      {
        "id": "agent_1",
        "name": "Scraper Agent",
        "icon": "spider",
        "status": "completed",
        "timestamp": "2024-01-15T10:25:00Z"
      }
    ]
  }
}
```

---

### Get Agent Pipeline Status
```
GET /api/dashboard/pipeline
```

**Response (200 OK):**
```json
{
  "pipeline": [
    {
      "id": "agent_1",
      "name": "Scraper Agent",
      "description": "Collects top-performing content & audience data",
      "status": "completed",
      "timestamp": "2024-01-15T10:25:00Z"
    },
    {
      "id": "agent_4",
      "name": "Hook Generator",
      "description": "Generates viral hooks & captions",
      "status": "processing",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "overallStatus": "processing",
  "completionPercentage": 75
}
```

---

## Analytics Endpoints

### Get Analytics Data
```
GET /api/analytics
```

**Response (200 OK):**
```json
{
  "analytics": {
    "scriptsGenerated": 127,
    "hooksGenerated": 584,
    "captionsGenerated": 231,
    "hashtagsGenerated": 892,
    "totalRequests": 1234,
    "successRate": 96.8,
    "averageProcessingTime": 4.2,
    "apiUsage": {
      "scraper": 1234,
      "validator": 1200,
      "writer": 1100,
      "hookGenerator": 1080
    }
  },
  "period": "monthly"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "URL and platform are required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request succeeded |
| 202 | Accepted - Request accepted for processing |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Rate Limiting
Currently no rate limiting. Future implementation will include:
- 1000 requests per hour per user
- 10 concurrent requests per user

---

## Future Enhancements

- [ ] JWT Authentication
- [ ] Database persistence (MongoDB)
- [ ] Real AI integration (OpenRouter, Claude)
- [ ] n8n workflow integration
- [ ] WebSocket for real-time updates
- [ ] File uploads for profile pictures
- [ ] Advanced filtering and search
- [ ] Bulk content generation
- [ ] API key management

---

**Last Updated**: 2026-05-11  
**Version**: 1.0.0 (MVP)
