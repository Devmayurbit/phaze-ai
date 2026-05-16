# Phaze AI Phase 1: Troubleshooting Guide

## 🔧 Common Issues & Solutions

### 1. Backend Won't Start

#### Error: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
npm install
npm run dev
```

#### Error: "Port 5000 already in use"
**Solution:**
```bash
# Option 1: Kill process using port 5000
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option 2: Use different port
# backend/.env
PORT=5001
```

#### Error: "Cannot connect to MongoDB"
**Solution:**
```bash
# Ensure MongoDB is running
mongod

# Or verify connection string
# backend/.env
MONGODB_URI=mongodb://localhost:27017/phaze-ai

# Or use Atlas cloud
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phaze-ai
```

---

### 2. RapidAPI Issues

#### Error: "RapidAPI key invalid"
**Solution:**
1. Go to https://rapidapi.com/user/account/
2. Copy your API key (exact match)
3. Paste in `backend/.env` as `RAPIDAPI_KEY=...`
4. No spaces or extra characters
5. Restart backend

#### Error: "API rate limit exceeded"
**Solution:**
```
Free plan: 100 requests/day
Options:
1. Wait 24 hours for reset
2. Upgrade to paid plan
3. Use different API provider
4. Cache responses aggressively
```

#### Error: "Instagram username not found"
**Solution:**
- Username must be exactly correct (case-sensitive in some cases)
- Account must be public
- Try: `nasa`, `instagram`, `nasa` (official accounts)
- Cannot scrape private accounts

---

### 3. Frontend Issues

#### Error: "Cannot GET /api/instagram/fetch"
**Solution:**
```bash
# 1. Backend running?
curl http://localhost:5000/health

# 2. Check frontend .env
VITE_API_URL=http://localhost:5000/api

# 3. Check backend server.js has routes
# should have: app.use('/api', apiRoutes)

# 4. Restart both frontend and backend
```

#### Error: "CORS error"
**Solution:**
```bash
# backend/.env - Allow frontend origin
CORS_ORIGIN=http://localhost:5173

# Or verify server.js has:
app.use(cors())

# Restart backend
npm run dev
```

#### Error: "Dashboard loads but shows empty state"
**Solution:**
1. Search bar not working?
   - Check browser console for errors
   - Verify backend is responding: `curl http://localhost:5000/health`
   
2. API call fails silently?
   - Open DevTools → Network tab
   - Look for failed requests
   - Check response status and message

3. Data returned but not displaying?
   - Check React DevTools
   - Verify state is updating
   - Check component props

---

### 4. Database Issues

#### Error: "MongoDB connection timeout"
**Solution:**
```bash
# Option 1: Local MongoDB
# Make sure mongod is running
mongod

# Option 2: Atlas Cloud
# 1. Create cluster at mongodb.com/cloud/atlas
# 2. Whitelist your IP
# 3. Create database user
# 4. Get connection string
# 5. Update .env:
MONGODB_URI=mongodb+srv://user:pass@cluster.net/phaze-ai
```

#### Error: "E11000 duplicate key error"
**Solution:**
```bash
# Username already exists in database
# Option 1: Drop collection and retry
# In MongoDB shell:
use phaze-ai
db.instagramprofiles.deleteMany({})

# Option 2: Change username or update existing
```

#### Error: "Data not saving to database"
**Solution:**
```bash
# 1. Verify MongoDB is connected
# Check logs for: "Connected to MongoDB"

# 2. Check MONGODB_URI format
# Should be: mongodb://host:port/dbname
# Or: mongodb+srv://user:pass@cluster.net/dbname

# 3. Verify models are imported correctly
# In controller: import InstagramProfile from '../models/InstagramProfile.js'

# 4. Check database permissions
```

---

### 5. Performance Issues

#### Problem: "Dashboard loads very slowly"
**Solution:**
```javascript
// 1. Reduce number of posts fetched
// In instagramService.js, fetchUserPosts():
async fetchUserPosts(username, limit = 6) {  // Changed from 12 to 6
  // ...
}

// 2. Add pagination
// Fetch more posts on demand instead of all at once

// 3. Cache data aggressively
// Store in localStorage for repeated searches

// 4. Enable database indexing
// In MongoDB:
db.instagramposts.createIndex({ username: 1, timestamp: -1 })
```

#### Problem: "Charts take too long to render"
**Solution:**
```javascript
// 1. Limit chart data points
// Show only last 20 days instead of all
const chartData = trend.slice(-20)

// 2. Use memoization
// In React component:
const MemoChart = React.memo(HashtagsChart)

// 3. Virtual scrolling
// For large lists, use react-window
```

#### Problem: "High API usage"
**Solution:**
```
1. Implement aggressive caching
   - Cache profile for 6 hours
   - Cache posts for 3 hours
   - Cache analytics for 1 hour

2. Batch requests
   - Fetch multiple profiles in one call
   - Use pagination

3. Optimize API calls
   - Only fetch what you need
   - Reduce post limit
   - Use filters
```

---

### 6. Data Issues

#### Problem: "Wrong data showing for username"
**Solution:**
```javascript
// 1. Clear database
db.instagramprofiles.deleteOne({ username: "nasa" })

// 2. Verify username is exact
// Instagram usernames are case-insensitive in URLs
// but API might be case-sensitive

// 3. Check if profile was updated recently
// API might have cached old data
```

#### Problem: "Hashtags not extracted correctly"
**Solution:**
```javascript
// In analyzeInstagramData.js
// Make sure hashtag extraction works:
function extractHashtags(caption) {
  if (!caption) return [];
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const matches = caption.match(hashtagRegex) || [];
  return matches.map(tag => tag.slice(1)); // Remove #
}
```

#### Problem: "Engagement rate shows 0%"
**Solution:**
```javascript
// In instagramService.js
function calculateEngagementRate(likes, comments, followers = 1000) {
  if (followers === 0) return 0;
  return ((likes + comments) / followers) * 100;
}

// Followers defaults to 1000, should be actual followers
// Ensure followers are passed correctly from profile data
```

---

### 7. Frontend Component Issues

#### Problem: "Search button not working"
**Solution:**
```javascript
// Check in InstagramDashboard.jsx
const handleSearch = async (e) => {
  e.preventDefault(); // This is important!
  if (!searchInput.trim()) {
    setError('Please enter a username');
    return;
  }
  // ... rest of function
}
```

#### Problem: "Loading skeleton shows forever"
**Solution:**
```javascript
// In InstagramDashboard.jsx
{loading && (
  <motion.div>
    <LoadingSkeleton />
  </motion.div>
)}

// Make sure:
// 1. setLoading(false) is called when done
// 2. Error doesn't prevent setLoading(false)
// 3. Finally block has: setLoading(false)
```

#### Problem: "Modal won't close"
**Solution:**
```javascript
// In PostsGrid.jsx
const handleClose = () => {
  setSelectedPost(null); // Must set to null, not false
}

// Make sure onClick handlers are correct:
onClick={() => setSelectedPost(null)}
onClick={(e) => e.stopPropagation()}
```

---

### 8. Styling Issues

#### Problem: "Colors not showing (dark background)"
**Solution:**
```javascript
// Verify tailwind.config.js includes dark theme
// Check className uses correct syntax:
className="bg-[#1a1f3a]"  // ✅ Correct
className="bg-purple-600" // ✅ Correct
className="dark:bg-black" // ❌ Won't work without dark mode setup
```

#### Problem: "Animations stuttering"
**Solution:**
```javascript
// 1. Reduce animation complexity
// In Framer Motion:
animate={{ opacity: 1 }} // ✅ Simple
animate={{ opacity: 1, x: 100, scale: 1.2 }} // Better with multiple transforms

// 2. Use proper initial/animate/exit:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>

// 3. Reduce stagger delay
staggerChildren: 0.02  // Smaller is smoother
```

---

### 9. Browser Issues

#### Problem: "Works in Chrome but not in Firefox"
**Solution:**
```
1. Clear browser cache
2. Check console for errors (F12)
3. Verify API calls in Network tab
4. Test in incognito mode
5. Update browser to latest version
```

#### Problem: "Data cached, need fresh data"
**Solution:**
```bash
# Clear browser cache:
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Option+E

# Or hard refresh:
# Chrome/Firefox: Ctrl+Shift+R
# Safari: Cmd+Shift+R
# Edge: Ctrl+Shift+R
```

---

### 10. Environment Variable Issues

#### Problem: "Variables not loading"
**Solution:**
```bash
# 1. Check file location
# backend/.env (not .env.example)
# frontend/.env (not .env.example)

# 2. Verify format
# ✅ Correct: KEY=value
# ❌ Wrong: KEY = value (spaces)

# 3. Restart server after changing .env
npm run dev

# 4. For frontend, restart dev server:
# Ctrl+C to stop
# npm run dev to restart
```

#### Problem: "RapidAPI key appears to be ignored"
**Solution:**
```bash
# 1. Verify in code:
console.log(process.env.RAPIDAPI_KEY) // Should print key

# 2. Check for trailing spaces or quotes:
# ❌ Wrong: RAPIDAPI_KEY="key_here"
# ✅ Correct: RAPIDAPI_KEY=key_here

# 3. Restart backend:
npm run dev
```

---

## 🆘 Debug Checklist

When something breaks, go through this:

```
[ ] Backend running? (npm run dev)
[ ] Frontend running? (npm run dev)
[ ] MongoDB running? (mongod)
[ ] All .env files filled? (RAPIDAPI_KEY, MONGODB_URI)
[ ] Node modules installed? (npm install)
[ ] No port conflicts? (lsof -i :5000)
[ ] API responding? (curl http://localhost:5000/health)
[ ] No CORS errors? (Check browser console)
[ ] RapidAPI subscription active? (Check dashboard)
[ ] Username is public account? (Try @nasa)
[ ] Database connected? (Check backend logs)
[ ] Components properly imported? (Check import paths)
```

---

## 📊 Log Debugging

### Backend Logs
```
✅ "🚀 Phaze AI Backend running" - Backend started OK
✅ "Connected to MongoDB" - Database connected
❌ "Cannot connect to MongoDB" - DB connection failed
❌ "RapidAPI Error" - API call failed
❌ "Error fetching profile" - Data fetch failed
```

### Frontend Logs (DevTools Console)
```
✅ No red errors - Good
❌ "Cannot GET /api/instagram/fetch" - Backend not running
❌ "CORS error" - CORS misconfigured
❌ "Cannot read property of undefined" - Data not loaded
```

---

## 🚨 Emergency Reset

If everything breaks:

```bash
# 1. Stop all services
# Ctrl+C in all terminals

# 2. Clear everything
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm backend/.env
rm frontend/.env

# 3. Fresh install
cd backend && npm install && cp .env.example .env
cd ../frontend && npm install && echo "VITE_API_URL=http://localhost:5000/api" > .env

# 4. Edit .env files with proper keys
# Add RAPIDAPI_KEY and MONGODB_URI

# 5. Restart everything
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
# Terminal 3: mongod
```

---

**If you're still stuck:**
1. Check all 10 common issues above
2. Review the debug checklist
3. Check browser console (F12) for errors
4. Check backend logs in terminal
5. Try the emergency reset
6. Read error messages carefully - they're helpful!

**Good luck! 🚀**
