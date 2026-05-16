# 🚀 FINAL SETUP CHECKLIST

## Before You Run

### ✅ Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] npm installed
- [ ] Internet connection
- [ ] Modern browser (Chrome, Firefox, Safari)

### ✅ API Keys Setup

#### Option A: Full AI Setup (Recommended)
- [ ] Hugging Face account (https://huggingface.co/join)
- [ ] Hugging Face API token created
- [ ] RapidAPI account (https://rapidapi.com/join)
- [ ] RapidAPI Instagram Scraper subscribed

#### Option B: AI Only (Works Fine)
- [ ] Hugging Face API token created
- [ ] Use fallback scraper (less accurate but free)

#### Option C: No Keys (Demo Mode)
- [ ] Skip keys
- [ ] Use mock data for testing
- [ ] Add keys later to go live

---

## Installation Steps

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Expected packages:
# - express, cors, dotenv
# - instagrapi, @huggingface/inference
# - natural, node-cache, cheerio, playwright
```

✅ Check: `node_modules` folder created

### Step 2: Create .env File

```bash
# In backend folder, create .env:
cat > .env << EOF
PORT=5000
NODE_ENV=development
HUGGINGFACE_API_KEY=hf_YOUR_TOKEN_HERE
RAPIDAPI_KEY=YOUR_API_KEY_HERE
VITE_API_URL=http://localhost:5000/api
EOF
```

✅ Check: `.env` file exists in `backend/`

### Step 3: Test Backend

```bash
npm run dev

# Expected output:
# 🚀 Phaze AI Backend running on http://localhost:5000
# 📡 API available at http://localhost:5000/api

# Test in another terminal:
curl http://localhost:5000/health
# Should return: {"status":"ok",...}
```

✅ Check: Server starts without errors

### Step 4: Frontend Setup

```bash
cd frontend
npm install

# Expected: All dependencies installed
```

✅ Check: `node_modules` folder created

### Step 5: Start Frontend

```bash
npm run dev

# Expected output:
# VITE v4.x.x ready in xxx ms
# Local: http://localhost:5173
```

✅ Check: Frontend accessible at `http://localhost:5173`

---

## Testing the Full Pipeline

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/health
# Expected: {"status":"ok","timestamp":"..."}
```
✅ Backend is running

### Test 2: Dashboard Stats
```bash
curl http://localhost:5000/api/dashboard/stats
# Expected: Real statistics
```
✅ API is working

### Test 3: Frontend Load
```
Visit: http://localhost:5173
Expected: Phaze AI landing page loads
```
✅ Frontend is loaded

### Test 4: Navigate to Dashboard
```
Click: Dashboard button
Expected: Dashboard loads with form
```
✅ Router is working

### Test 5: Generate Content
```
1. Enter URL: https://instagram.com/username
2. Select Niche: Tech
3. Click: Generate with Real AI
4. Wait: 30-60 seconds
5. See: Results with real content!
```
✅ Full pipeline working!

---

## Common Issues & Solutions

### ❌ "Cannot find module 'instagrapi'"
```bash
# Solution: Install missing packages
cd backend
npm install instagrapi @huggingface/inference natural node-cache cheerio playwright
```

### ❌ "HUGGINGFACE_API_KEY is undefined"
```
Solution:
1. Open backend/.env
2. Check HUGGINGFACE_API_KEY value
3. Verify token starts with "hf_"
4. Restart backend with: npm run dev
```

### ❌ "Port 5000 already in use"
```bash
# Solution 1: Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID YOUR_PID /F

# Mac/Linux:
lsof -i :5000
kill -9 PID

# Solution 2: Use different port
# In backend/.env, change: PORT=5001
```

### ❌ "Instagram profile not found"
```
Solution:
1. Check URL format: https://instagram.com/username
2. Try without @: username instead of @username
3. Use public account (not private)
4. If fails, ensure RAPIDAPI_KEY is set
```

### ❌ "Timeout waiting for content"
```
Solution:
1. First request takes longer (models download)
2. Wait 60+ seconds
3. Check internet connection
4. Check API key validity
5. Try simpler profile (fewer followers)
```

### ❌ "npm ERR! code ENOENT"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Verification Checklist

### Backend Verification

```bash
# 1. Check .env file exists
test -f backend/.env && echo "✅ .env exists" || echo "❌ .env missing"

# 2. Check node_modules
test -d backend/node_modules && echo "✅ Dependencies installed" || echo "❌ Install dependencies"

# 3. Try starting backend
cd backend
npm run dev

# Expected:
# ✅ Server starts without errors
# ✅ Shows "🚀 Phaze AI Backend running"
# ✅ Can curl /health endpoint
```

### Frontend Verification

```bash
# 1. Check node_modules
test -d frontend/node_modules && echo "✅ Dependencies installed" || echo "❌ Install dependencies"

# 2. Try starting frontend
cd frontend
npm run dev

# Expected:
# ✅ Vite server starts
# ✅ Shows localhost:5173
# ✅ Page loads in browser
```

---

## Running Everything (Full Stack)

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Expected: Server running on :5000

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
Expected: App running on :5173

### Browser
```
Open: http://localhost:5173
Expected: Full Phaze AI app loaded
```

---

## Getting API Keys (Detailed Steps)

### Hugging Face (Required)

```
1. Go to: https://huggingface.co/join
2. Click "Sign Up"
3. Enter email, username, password
4. Verify email
5. Click Settings (top right)
6. Click "Access Tokens"
7. Click "New token"
8. Name: "phaze-ai"
9. Type: "Read"
10. Create token
11. Copy token (starts with hf_)
12. Paste in backend/.env: HUGGINGFACE_API_KEY=hf_...
```

### RapidAPI Instagram Scraper (Optional)

```
1. Go to: https://rapidapi.com/join
2. Sign up (free)
3. Search for: "instagram-scraper-api2"
4. Click "Subscribe to Test"
5. Choose "Freemium" (free)
6. Accept terms
7. Go to "Code" tab
8. Copy "X-RapidAPI-Key" value
9. Paste in backend/.env: RAPIDAPI_KEY=...
```

---

## What Each Key Does

### HUGGINGFACE_API_KEY
```
What: AI text generation
Where: Generates hooks, captions, scripts
Cost: Free tier available
Why: Core AI engine - REQUIRED
```

### RAPIDAPI_KEY
```
What: Instagram data scraping
Where: Gets real profile & post data
Cost: 100 free requests/month
Why: Better accuracy - OPTIONAL but recommended
```

---

## Troubleshooting Flowchart

```
❌ Doesn't work?
│
├─→ Backend won't start?
│   └─→ Check PORT 5000 free
│   └─→ Check .env file exists
│   └─→ Run: npm install
│
├─→ API says "no key"?
│   └─→ Check .env file
│   └─→ Check key format (hf_...)
│   └─→ Restart backend
│
├─→ Profile not found?
│   └─→ Check Instagram username
│   └─→ Try URL format
│   └─→ Use public profile
│
├─→ Generation times out?
│   └─→ Wait longer (60+ seconds)
│   └─→ Check internet
│   └─→ Check API key valid
│
├─→ Frontend won't load?
│   └─→ Check PORT 5173 free
│   └─→ Check npm install ran
│   └─→ Clear browser cache
│
└─→ Still stuck?
    └─→ Check console for error messages
    └─→ Restart both backend & frontend
    └─→ Try different Instagram profile
```

---

## Performance Notes

### First Run
- Takes 30-60 seconds (models download)
- Subsequent runs faster (cached locally)

### Free Tier Limits
- Hugging Face: Unlimited (may have queue during peak)
- RapidAPI: 100 requests/month
- Should be plenty for development

### Speed Tips
1. Use smaller profiles (faster scraping)
2. Generate content for multiple profiles together
3. Cache trends (already implemented)
4. Use local models (advanced)

---

## Success Indicators

### ✅ Backend Ready
```
[Startup]
🚀 Phaze AI Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

### ✅ Frontend Ready
```
[Browser]
- Phaze AI logo visible
- Dashboard button clickable
- Form loads without errors
```

### ✅ Pipeline Working
```
[Generation]
- Accepts Instagram URL
- Shows "Processing..."
- Returns real data with trends
- Shows AI-generated content
```

---

## Next: Using the App

Once everything is running:

1. **Go to Dashboard**
2. **Enter Instagram URL** (e.g., @instagram)
3. **Select Niche** (Tech, Lifestyle, Business)
4. **Click Generate**
5. **Wait for Results** (30-60 seconds)
6. **See Real AI Content!** 🎉

---

## Support Resources

- Hugging Face Docs: https://huggingface.co/docs
- RapidAPI Help: https://docs.rapidapi.com/
- Express.js: https://expressjs.com/
- React: https://react.dev/

---

## You're All Set! 🚀

You now have a fully functional **Real AI Content Generator**.

Next step: **Start generating content and grow your brand!**

Questions? Check the other docs:
- QUICKSTART.md - Quick setup
- REAL_AI_SETUP.md - Detailed setup
- IMPLEMENTATION_SUMMARY.md - What changed
