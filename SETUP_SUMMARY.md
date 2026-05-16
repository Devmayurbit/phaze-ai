# Backend Setup - Quick Start

## What's Fixed
1. **Database Connection** - Now connects to MongoDB on startup (was broken)
2. **Environment Config** - Updated `.env.example` with better docs

## Instagram Scraping (IMPORTANT)
- **By default:** Uses generated fake data (doesn't scrape Instagram)
- **If you add RAPIDAPI_KEY:** Will try to fetch real Instagram data
- Default test name: `alexcreates`

## Start Backend (3 steps)

```bash
# 1. Install MongoDB first
brew services start mongodb-community  # macOS
# OR download from mongodb.com/try for Windows

# 2. Setup
cd backend
cp .env.example .env
npm install

# 3. Run
npm run dev
```

**Should print:**
```
🚀 Phaze AI Backend running on http://localhost:5000
📊 MongoDB connected: localhost
```

## Test It
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/status
```

## About API Keys
Your `.env` file had exposed credentials - **rotate them immediately** if committed to git.

## Issues?
- MongoDB not running? → Start it: `brew services start mongodb-community`
- Port 5000 in use? → `export PORT=5001` then run again
- npm install fails? → `npm install --force`

That's it. Simple.

