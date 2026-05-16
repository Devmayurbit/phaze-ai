# 🚀 Phaze AI - Real AI Integration Setup Guide

## What's Changed: Dummy Data → Real AI

Your application now uses:
- ✅ **Real Instagram Data** - Live profile scraping (Instagrapi + RapidAPI)
- ✅ **Real AI Content Generation** - Hugging Face Transformers (LLaMA, BART)
- ✅ **Real Trend Analysis** - ML-powered NLP (Natural.js)
- ✅ **Real Engagement Metrics** - Calculated from actual post data

---

## ⚙️ SETUP INSTRUCTIONS

### 1. **Install Dependencies**

```bash
cd backend
npm install
```

### 2. **Get Free API Keys**

#### 🤖 Hugging Face (Free AI Models - NO CREDIT CARD NEEDED)
```
1. Go to: https://huggingface.co/settings/tokens
2. Create a new token (click "New token")
3. Copy the token
```

#### 📷 Instagram Scraping (RapidAPI - Optional but Recommended)
```
1. Go to: https://rapidapi.com/logicbuilder/api/instagram-scraper-api2
2. Click "Subscribe to Test"
3. Choose "Freemium" plan (100 requests/month free)
4. Copy your API key from "API Key" section
```

### 3. **Create .env file**

Create `backend/.env`:

```env
# ✅ REQUIRED for AI content generation
HUGGINGFACE_API_KEY=hf_YOUR_TOKEN_HERE

# ✅ RECOMMENDED for live Instagram data (optional but better)
RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE

# Server config
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### 4. **Start the Backend**

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Phaze AI Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

### 5. **Start the Frontend** (in another terminal)

```bash
cd frontend
npm run dev
```

---

## 📊 What's Now Real

### ❌ Removed Mock Data:
- Hardcoded influencer profiles
- Fake engagement metrics  
- Pre-written hooks and scripts
- Static trend analysis

### ✅ Added Real Systems:

| Feature | Source | How It Works |
|---------|--------|-------------|
| **Profile Data** | Instagram API/Web | Scrapes real followers, engagement, bio |
| **Recent Posts** | Instagram | Fetches real post captions, likes, comments |
| **AI Hooks** | Hugging Face LLaMA | Generates unique viral hooks per profile |
| **Captions** | Hugging Face LLaMA | AI-written captions based on niche |
| **Scripts** | Hugging Face LLaMA | AI creates video scripts for trends |
| **Trends** | Natural.js NLP | Analyzes posts to find real trends |
| **Engagement Score** | ML Model | Calculates real engagement rates |
| **Growth Tips** | Trend Analysis | ML-based recommendations |

---

## 🧪 Test It

### Test with Real Data:

```bash
# From Frontend:
1. Go to http://localhost:5173
2. Click "Dashboard"
3. Enter Instagram URL: https://www.instagram.com/username/
4. Select Niche: Tech / Lifestyle / Business
5. Click "Generate Content"
6. Wait 30-60 seconds for real data!
```

### See API Responses:

```bash
# Test profile scraping
curl -X POST http://localhost:5000/api/influencer/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://instagram.com/username"}'

# Get generated content
# (Use the request ID from dashboard generation)
curl http://localhost:5000/api/dashboard/stats
```

---

## 🔑 Free AI Options Included

### 1️⃣ Hugging Face (Included - RECOMMENDED)
- **Models**: LLaMA 2, BART, Falcon
- **Cost**: Free (with rate limits)
- **Setup**: 1 API key
- **Quality**: Enterprise-grade

```javascript
// Your AI is now using:
- meta-llama/Llama-2-7b-chat-hf (text generation)
- facebook/bart-large-cnn (summarization)
```

### 2️⃣ Alternative: Local ML Models
If you want NO API calls, use local models:

```bash
npm install transformers
# Then models download automatically (first run)
```

### 3️⃣ Alternative: Open Source Models
- Ollama + Mistral
- LLaMA.cpp
- Stable Diffusion (for images)

---

## 📈 How to Grow with This

### Step 1: Get Real Data
- Your dashboard now shows **real engagement metrics**
- Real trends from actual Instagram posts

### Step 2: AI Recommendations  
- System recommends **best posting times** based on your real data
- Suggests **topics** with highest engagement potential
- **Growth strategies** personalized to your niche

### Step 3: Generate & Post Content
- Use generated hooks/captions/scripts
- Track which perform best
- ML model learns your best-performing patterns

### Step 4: Scale Up
- Add more influencer profiles
- Export scripts to video editor (Adobe, CapCut, etc.)
- Post content using generated info

---

## 🎯 Growth Hacks Included

1. **Trend Detection** - Find what's trending in your niche before competitors
2. **Optimal Posting Times** - Post when your audience is most active
3. **Engagement Optimization** - AI suggests CTAs and hooks that work
4. **Viral Topic Suggestions** - AI recommends what to post next
5. **Competitor Analysis** - See what similar creators are doing
6. **Audience Insights** - Understand your followers better

---

## 🆘 Troubleshooting

### "API key invalid"
```
→ Check .env file spelling
→ Verify key in Hugging Face dashboard
→ Regenerate token if needed
```

### "Instagram profile not found"
```
→ Check username is correct
→ Try without @symbol
→ Try full URL: https://instagram.com/username
→ Profile might be private (use RapidAPI key)
```

### "Content generation timeout"
```
→ Hugging Face might be slow first time
→ Try again (models cache locally)
→ Check internet connection
```

### "Rate limit exceeded"
```
→ Free tier has limits (fine for learning)
→ Upgrade to Pro for production
→ Or use local models (see alternatives above)
```

---

## 📚 Next Steps

1. **Connect Database** - Store generated content
2. **Add Export** - Download scripts as PDF/DOCX
3. **Scheduling** - Auto-post to Instagram
4. **Analytics Dashboard** - Track performance over time
5. **Team Collaboration** - Share content with team

---

## 💡 Pro Tips

### Tip 1: Use Local Models for Speed
No API calls = Instant generation
```bash
npm install @xenova/transformers
```

### Tip 2: Cache Trends
Trends analyzed once, reused for 1 hour
```javascript
// Already implemented! Check trendAnalyzer.js
```

### Tip 3: Batch Processing
Generate content for 10 profiles at once
```bash
# Frontend handles this automatically
```

### Tip 4: Custom Fine-Tuning
Train models on YOUR posts for better results
```python
# (Advanced - guides in docs/)
```

---

## ✨ Architecture

```
┌─────────────┐
│  Frontend   │ (React + Vite)
└──────┬──────┘
       │
┌──────▼──────────────┐
│  Backend (Express)  │
└──┬─────┬─────┬──────┘
   │     │     │
   ▼     ▼     ▼
┌───────────────────────────┐
│ Instagram  │ AI Models  │ Trend │
│ Scraper    │ (Hugging   │ Analyzer│
│            │  Face)     │ (NLP)  │
└───────────────────────────┘
```

---

## 🚀 What's Next?

- ✅ Real AI Integration (DONE)
- ✅ Real Instagram Data (DONE)  
- ⏭️ Database for storing content
- ⏭️ Export to file formats
- ⏭️ Schedule auto-posting
- ⏭️ Advanced analytics

Happy content creating! 🎬
