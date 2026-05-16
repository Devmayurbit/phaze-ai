# Backend API Testing Guide

## 🚀 Quick Reference - All Endpoints

### ✅ Start Server First
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
🚀 Phaze AI Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

---

## 1️⃣ Health & Status Endpoints

### Health Check
```bash
curl http://localhost:5000/health
```
**Response:** `{"status":"ok","timestamp":"2026-05-16T10:30:00.000Z"}`

### API Status
```bash
curl http://localhost:5000/api/status
```
**Response:** `{"status":"Phaze AI Backend Running"}`

---

## 2️⃣ Influencer Management

### Submit Influencer Profile
```bash
curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano",
    "platform": "instagram",
    "niche": "sports"
  }'
```
**Response:**
```json
{
  "id": "a1b2c3d4-e5f6-4a8b-9c0d-1e2f3a4b5c6d",
  "status": "processing",
  "message": "Processing influencer profile..."
}
```

### Get Influencer Content
```bash
curl http://localhost:5000/api/influencer/60d5ec49c1234567890abcde/content
```
**Response:**
```json
{
  "id": "60d5ec49c1234567890abcde",
  "username": "cristiano",
  "scripts": [...],
  "hooks": [...]
}
```

### Get Trend Analysis
```bash
curl http://localhost:5000/api/influencer/60d5ec49c1234567890abcde/trends
```
**Response:**
```json
{
  "trends": ["fitness", "motivation"],
  "analysis": "..."
}
```

---

## 3️⃣ Content Generation

### Generate Scripts
```bash
curl -X POST http://localhost:5000/api/generate/scripts \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "fitness motivation",
    "style": "inspirational",
    "count": 3
  }'
```
**Response:**
```json
{
  "scripts": [
    {
      "id": 1,
      "title": "Script Title",
      "content": "Script content here...",
      "hooks": ["Hook 1", "Hook 2"]
    },
    ...
  ]
}
```

### Generate Hooks
```bash
curl -X POST http://localhost:5000/api/generate/hooks \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "fitness",
    "style": "viral",
    "count": 5
  }'
```
**Response:**
```json
{
  "hooks": [
    "Did you know? Most people don't realize...",
    "This ONE trick changed everything...",
    ...
  ]
}
```

---

## 4️⃣ Content Analysis

### Analyze Profile
```bash
curl -X POST http://localhost:5000/api/content/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano",
    "platform": "instagram"
  }'
```
**Response:**
```json
{
  "requestId": "uuid-string",
  "status": "processing",
  "message": "Analyzing profile..."
}
```

### Get Analysis Results
```bash
curl http://localhost:5000/api/content/results/uuid-string
```
**Response:**
```json
{
  "status": "completed",
  "analysis": {
    "followers": 600000000,
    "engagement_rate": "8.5%",
    "content_style": "motivational"
  }
}
```

---

## 5️⃣ Dashboard & Analytics

### Get Dashboard Stats
```bash
curl http://localhost:5000/api/dashboard/stats
```
**Response:**
```json
{
  "totalInfluencers": 45,
  "activeRequests": 12,
  "scriptsGenerated": 234,
  "trendingTopics": ["fitness", "travel"]
}
```

### Get Pipeline Status
```bash
curl http://localhost:5000/api/dashboard/pipeline
```
**Response:**
```json
{
  "agents": {
    "scraper": "ready",
    "analyzer": "processing",
    "writer": "idle",
    "validator": "ready"
  }
}
```

### Get Analytics
```bash
curl http://localhost:5000/api/analytics
```
**Response:**
```json
{
  "requestsToday": 156,
  "activeUsers": 42,
  "averageResponseTime": 245,
  "errorRate": 0.5
}
```

---

## 6️⃣ Instagram Routes

### Get Instagram Profile
```bash
curl -X POST http://localhost:5000/api/instagram/profile \
  -H "Content-Type: application/json" \
  -d '{
    "username": "cristiano"
  }'
```

### Analyze Instagram Profile
```bash
curl -X POST http://localhost:5000/api/instagram/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano"
  }'
```

### Scrape Instagram Data
```bash
curl -X POST http://localhost:5000/api/instagram/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano",
    "dataType": "posts"
  }'
```

---

## 📊 Testing with Postman

### Import Collection
1. Download Postman from [postman.com](https://www.postman.com/downloads/)
2. Open Postman
3. Click "Import"
4. Create new collection "Phaze AI"

### Set Up Environment
1. Click "Environments"
2. Create new environment "Local Dev"
3. Add variable:
   - **Key:** `base_url`
   - **Value:** `http://localhost:5000`

### Add Requests
Create requests with pre-configured body:

**Health Check**
- Method: GET
- URL: `{{base_url}}/health`

**Submit Influencer**
- Method: POST
- URL: `{{base_url}}/api/influencer/submit`
- Body (JSON):
```json
{
  "url": "https://instagram.com/cristiano",
  "platform": "instagram",
  "niche": "sports"
}
```

---

## 🧪 Testing with cURL

### Save as Script
Create `test-api.sh`:
```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

echo "=== Testing Health ==="
curl $BASE_URL/health

echo "\n=== Testing API Status ==="
curl $BASE_URL/api/status

echo "\n=== Testing Submit Influencer ==="
curl -X POST $BASE_URL/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano",
    "platform": "instagram",
    "niche": "sports"
  }'

echo "\n=== Testing Generate Scripts ==="
curl -X POST $BASE_URL/api/generate/scripts \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "fitness",
    "style": "motivational",
    "count": 3
  }'
```

### Run Tests
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": "URL and platform are required"
}
```
**Fix:** Check request body for required fields

### 429 Too Many Requests
```json
{
  "error": "Too many requests. Please try again later."
}
```
**Fix:** Wait before sending more requests (rate limited at 100/min)

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```
**Fix:** Check server logs: `npm run dev`

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Windows - use MongoDB Service
```

---

## 📈 Performance Testing

### Load Test with Apache Bench
```bash
# Install (macOS)
brew install httpd

# Test endpoint
ab -n 1000 -c 10 http://localhost:5000/health

# Output shows:
# - Requests per second
# - Response time (average)
# - Failed requests
```

### Load Test with autocannon
```bash
npm install -g autocannon

autocannon -c 10 -d 30 http://localhost:5000/health
```

---

## 🐛 Debugging

### View Detailed Logs
```bash
npm run dev 2>&1 | tee logs.txt
```

### Test Database Connection
```javascript
// In Node REPL
import mongoose from 'mongoose'
await mongoose.connect('mongodb://localhost:27017/phaze-ai')
console.log('Connected!')
```

### Check Database
```bash
# In MongoDB shell
mongo
use phaze-ai
db.collections()
db.users.find()
```

---

## ✨ Sample Complete Workflow

```bash
# 1. Check health
curl http://localhost:5000/health

# 2. Submit influencer
RESPONSE=$(curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{"url": "https://instagram.com/cristiano", "platform": "instagram"}')

REQUEST_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)

# 3. Wait for processing
sleep 5

# 4. Get results
curl "http://localhost:5000/api/content/results/$REQUEST_ID"

# 5. Generate scripts
curl -X POST http://localhost:5000/api/generate/scripts \
  -H "Content-Type: application/json" \
  -d '{"topic": "fitness", "count": 3}'

# 6. View analytics
curl http://localhost:5000/api/analytics
```

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Connection refused | Start backend: `npm run dev` |
| 404 endpoint not found | Check URL spelling and method (GET/POST) |
| 400 validation error | Check JSON body format and required fields |
| 429 rate limit | Wait 60 seconds or change limit |
| MongoDB error | Start MongoDB or check connection string |
| CORS error | Check `CORS_ORIGIN` in `.env` |
| Port 5000 in use | Kill process or change port |

---

**Last Updated:** 2026-05-16  
**Status:** Ready to Test ✅
