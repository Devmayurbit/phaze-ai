# Phaze AI Backend - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js 18+** ([download](https://nodejs.org/))
- **MongoDB** (local or cloud)
- **npm** (comes with Node.js)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your configuration (see section below).

### Step 3: Start Backend
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

**Expected Output:**
```
🚀 Phaze AI Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
📊 MongoDB connected: cluster0.gktpmck.mongodb.net
```

---

## 🗄️ Database Setup

### Option A: Local MongoDB (Easiest)
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Windows (using MongoDB Community)
# Download: https://www.mongodb.com/try/download/community
# Run installer and start MongoDB Service

# Verify connection
mongo  # Should connect successfully
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (M0 - free tier)
4. Create database user
5. Get connection string
6. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phaze-ai?appName=Cluster0
```

### Verify MongoDB Connection
```bash
curl http://localhost:5000/health
# Response: {"status":"ok","timestamp":"2026-05-16T..."}
```

---

## 🔑 Environment Variables Configuration

### Backend (`PORT`, `NODE_ENV`)
```env
PORT=5000                    # Server port
NODE_ENV=development         # development | production | test
```

### Database
```env
MONGODB_URI=mongodb://localhost:27017/phaze-ai
DB_HOST=localhost
DB_PORT=27017
DB_NAME=phaze-ai
```

### API Keys (For Features)
| Key | Purpose | Get From |
|-----|---------|----------|
| `HUGGINGFACE_API_KEY` | AI model inference | [huggingface.co/settings](https://huggingface.co/settings/tokens) |
| `RAPIDAPI_KEY` | External APIs | [rapidapi.com](https://rapidapi.com/dashboard) |
| `OPENAI_API_KEY` | GPT integration | [platform.openai.com](https://platform.openai.com/api-keys) |
| `OPENROUTER_API_KEY` | Multi-model API | [openrouter.ai](https://openrouter.ai/keys) |

### CORS & Security
```env
CORS_ORIGIN=http://localhost:5173       # Frontend URL (dev)
JWT_SECRET=your_super_secret_jwt_key    # Change in production
```

---

## 🧪 Testing the Backend

### Test 1: Health Check
```bash
curl http://localhost:5000/health

# Expected: {"status":"ok","timestamp":"2026-05-16T..."}
```

### Test 2: API Status
```bash
curl http://localhost:5000/api/status

# Expected: {"status":"Phaze AI Backend Running"}
```

### Test 3: Submit Influencer (Full Test)
```bash
curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://instagram.com/cristiano",
    "platform": "instagram",
    "niche": "sports"
  }'

# Expected: {"id":"uuid","status":"processing",...}
```

### Test 4: Generate Scripts
```bash
curl -X POST http://localhost:5000/api/generate/scripts \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "fitness",
    "style": "motivational",
    "count": 3
  }'
```

### Using Postman (Recommended)
1. Download [Postman](https://www.postman.com/downloads/)
2. Import from file: `docs/Phaze_AI_API.postman_collection.json` (if exists)
3. Set environment: `BASE_URL=http://localhost:5000`
4. Run tests

---

## 📡 API Endpoints

### Health & Status
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Server health check |
| GET | `/api/status` | API status |

### Influencer Management
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/influencer/submit` | `{url, platform, niche}` |
| GET | `/api/influencer/:id/content` | - |
| GET | `/api/influencer/:id/trends` | - |
| POST | `/api/influencer/scrape` | `{url, platform}` |

### Content Generation
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/generate/scripts` | `{topic, style, count}` |
| POST | `/api/generate/hooks` | `{topic, style, count}` |
| POST | `/api/content/analyze` | `{url, platform}` |
| GET | `/api/content/results/:requestId` | - |

### Dashboard & Analytics
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/dashboard/stats` | Dashboard metrics |
| GET | `/api/dashboard/pipeline` | Agent pipeline status |
| GET | `/api/analytics` | Usage analytics |

### Instagram Specific
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/instagram/profile` | `{username}` |
| POST | `/api/instagram/analyze` | `{url}` |

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
```
Error: Cannot find module 'dotenv'
```
**Solution:**
```bash
cd backend
npm install
npm install --save-dev
```

### Issue: "MongoDB connection failed"
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solutions:**
1. Start MongoDB locally:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows - use MongoDB Community Server service
   ```

2. OR use MongoDB Atlas:
   - Update `MONGODB_URI` in `.env`
   - Add your IP to cluster whitelist

### Issue: "Port 5000 already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process on port 5000
lsof -i :5000                  # macOS/Linux
netstat -ano | findstr :5000   # Windows

# Kill it or use different port
NODE_PORT=5001 npm run dev
```

### Issue: "CORS error from frontend"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `.env`:
```env
CORS_ORIGIN=http://localhost:5173  # Your frontend URL
```

### Issue: "Rate limit exceeded"
```
Error: Too many requests. Please try again later.
```
**Current limit:** 100 requests/minute per IP
- Reduce request frequency OR increase limit in `src/server.js` line 22

---

## 📊 Monitoring & Logs

### Development Logs
```bash
npm run dev

# Logs show:
# - HTTP requests
# - Database operations
# - API errors
# - Processing status
```

### Production Logs
```bash
npm start > logs.txt 2>&1

# View logs
tail -f logs.txt
```

### Add Logging to Code
```javascript
// In your controller
console.log(`📝 Processing ${username}...`)
console.warn(`⚠️  Warning: ${message}`)
console.error(`❌ Error: ${error}`)
```

---

## 🔒 Security Checklist

### Before Production
- [ ] Change `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (use reverse proxy)
- [ ] Add rate limiting (increase limits if needed)
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Add authentication middleware
- [ ] Enable CORS only for your domain
- [ ] Rotate API keys regularly
- [ ] Never commit `.env` to git

### Security Features Already Implemented
✅ Input sanitization (trim whitespace)  
✅ Rate limiting (100 req/min)  
✅ Error handling (don't expose internals)  
✅ CORS protection  
✅ MongoDB injection protection (Mongoose)  

---

## 🚀 Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create phaze-ai-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to AWS Lambda
1. Use `aws-serverless-express`
2. Package code: `zip -r function.zip node_modules src`
3. Upload to Lambda
4. Set environment variables in Lambda console

### Deploy to DigitalOcean / VPS
```bash
# SSH into server
ssh root@your_server

# Clone repo
git clone https://github.com/yourusername/phaze-ai.git
cd phaze-ai/backend

# Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Start with PM2 (process manager)
npm install -g pm2
pm2 start src/server.js --name phaze-ai
pm2 startup
pm2 save
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 💬 Need Help?

1. Check the troubleshooting section above
2. Review server logs: `npm run dev`
3. Test endpoints with Postman
4. Check MongoDB connection: `mongo`
5. Verify `.env` file is in correct location

---

**Last Updated:** 2026-05-16  
**Status:** Production Ready ✅
