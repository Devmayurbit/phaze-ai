# 🚀 Phase 1: Real Instagram Scraping & AI Content Generation

## Overview
This is the **COMPLETE Phase 1** of the Phaze AI Content Studio project. It transforms real Instagram profiles into viral content with AI.

## ✅ What's Working in Phase 1

### 1. **Real Instagram Profile Scraping**
- Fetches actual Instagram data (followers, biography, posts, engagement)
- Multiple API methods for redundancy
- Falls back to realistic generated data if APIs fail

### 2. **AI Content Generation**
- Viral hooks/captions using HuggingFace
- Engagement-optimized scripts
- Hashtag suggestions
- Analysis of content trends

### 3. **Complete Pipeline**
```
Instagram URL → Scrape Profile → Analyze Trends → Generate Content → Return Results
```

---

## 🔑 API Keys Required

### Currently Set Up in `.env`:
```env
PORT=5000
NODE_ENV=development
HUGGINGFACE_API_KEY=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 ✅
RAPIDAPI_KEY=8a8377c77fmsh63db2e9b4e8a01fp1a79ebjsne576bd762077 ✅
VITE_API_URL=http://localhost:5000/api
```

### What Each API Provides:

#### 1. **RapidAPI Key** (You Already Have ✅)
Provides **three different Instagram scraping methods**:
- `instagram-scraper-api2` - Full profile & posts data
- `instagram-user-info` - User information  
- `instagram140` - Alternative scraper

**Status**: Already in your `.env`

**If key expires/fails**, get a new one:
1. Go to [RapidAPI.com](https://rapidapi.com)
2. Search for "Instagram" or "Instagram Scraper"
3. Subscribe to a free/paid plan
4. Copy API key to `.env` as `RAPIDAPI_KEY`

#### 2. **HuggingFace API Key** (You Already Have ✅)
Provides **AI text generation** for content:
- Viral hooks
- Engaging captions
- Video scripts
- Hashtags

**Status**: Already in your `.env`

**Model Used**: `meta-llama/Llama-2-7b-chat-hf`

**If key expires/fails**:
1. Go to [HuggingFace.co](https://huggingface.co)
2. Click your profile → Settings → Access Tokens
3. Create new token (read access is enough)
4. Copy to `.env` as `HUGGINGFACE_API_KEY`

---

## 🧪 How to Test Phase 1

### Step 1: Start Backend Server
```bash
cd backend
npm install  # if needed
node src/server.js
```
You should see:
```
✅ Server running on http://localhost:5000
```

### Step 2: Test with Your Instagram URL

#### Using Browser (Frontend):
1. Open `http://localhost:3000` (if frontend is running)
2. Enter Instagram URL: `https://www.instagram.com/dainikrajeevtimes.mp`
3. Select niche: "Social & Community" (or your choice)
4. Click "Generate with Real AI"
5. Wait 30-60 seconds for results

#### Using API (Direct Test):
```bash
curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.instagram.com/dainikrajeevtimes.mp",
    "platform": "instagram",
    "niche": "Social & Community"
  }'
```

Response:
```json
{
  "id": "req_12345...",
  "status": "processing",
  "username": "dainikrajeevtimes",
  "platform": "instagram",
  "message": "Content generation pipeline started - Real AI analysis in progress",
  "estimatedTime": "30-60 seconds"
}
```

#### Get Results After Processing:
```bash
curl http://localhost:5000/api/influencer/req_12345.../content
```

### Step 3: Check Backend Logs
Look for these messages in terminal:

**✅ SUCCESS (Real Data)**:
```
[InstagramScraper] 🔍 Fetching REAL profile for @dainikrajeevtimes
[InstagramScraper] 📡 Attempting Method 1: instagram-scraper-api2...
[InstagramScraper] ✅ SUCCESS: Got REAL data from instagram-scraper-api2
```

**⚠️ FALLBACK (Generated Data)**:
```
[InstagramScraper] 📡 Attempting Method 1: instagram-scraper-api2...
[InstagramScraper] ❌ Method 1 failed: 429
[InstagramScraper] 📡 Attempting Method 2: instagram-user-info...
[InstagramScraper] ⚠️ All API methods failed, using generated fallback
```

---

## 🔄 Complete Flow Explanation

### What Happens When You Submit a URL:

```
1. Frontend/API Receives: 
   "https://www.instagram.com/dainikrajeevtimes.mp"
   
2. Username Extracted: 
   → "dainikrajeevtimes"
   
3. Instagram Scraper Runs:
   → Tries RapidAPI Method 1, 2, 3
   → Returns real followers, posts, engagement
   → Falls back to realistic generated data if all fail
   
4. Gets Recent Posts:
   → Fetches last 20 posts
   → Analyzes hashtags, mentions, engagement
   
5. Trend Analysis:
   → Identifies content patterns
   → Calculates trending topics
   
6. AI Content Generation (HuggingFace):
   → 5 viral hooks/openings
   → 3 engaging captions  
   → 2 short-form video scripts
   → 15 relevant hashtags
   
7. Results Returned:
   {
     "profileData": { real Instagram data },
     "content": {
       "hooks": [...],
       "captions": [...],
       "scripts": [...],
       "hashtags": [...]
     },
     "trends": { analysis results }
   }
```

---

## 📊 Data Structure: What You Get

### Profile Data (Real Instagram):
```json
{
  "username": "dainikrajeevtimes",
  "fullName": "Dainik Rajeev Times",
  "followers": 125000,
  "following": 843,
  "posts": 342,
  "biography": "Latest News & Updates",
  "avatar": "https://...",
  "isVerified": true,
  "engagement": 6.2,
  "source": "real",
  "apiMethod": "instagram-scraper-api2"
}
```

### Generated Content:
```json
{
  "hooks": [
    "Wait until you see what happens next... 🚀",
    "This one feature changed everything",
    "I can't believe this actually works",
    "The most viral thing I've seen this week",
    "This is how you actually grow on Instagram"
  ],
  "captions": [
    "Just discovered something amazing...",
    "If you're not doing this, you're missing out...",
    "This simple trick saved me hours..."
  ],
  "scripts": [
    {
      "title": "60-Second Hook",
      "duration": "60s",
      "content": "Hook (5s) → Problem (10s) → Solution (30s) → CTA (15s)"
    }
  ],
  "hashtags": ["#Growth", "#AI", "#ContentCreation", ...],
  "engagementScore": 8.5,
  "trendScore": 8.2
}
```

---

## 🛠️ Troubleshooting

### Problem: Getting Only Generated/Mock Data

**Symptom**: Logs show "using generated fallback"

**Solutions**:
1. **Check RapidAPI Key**:
   ```bash
   echo "RAPIDAPI_KEY: $RAPIDAPI_KEY"
   ```
   
2. **Verify API Key is Valid**:
   - Go to [RapidAPI Dashboard](https://rapidapi.com/my-apps)
   - Check if API subscriptions are active
   - Check if you have API quota remaining

3. **Test RapidAPI Directly**:
   ```bash
   curl -X GET 'https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=instagram' \
     -H 'X-RapidAPI-Key: YOUR_KEY_HERE' \
     -H 'X-RapidAPI-Host: instagram-scraper-api2.p.rapidapi.com'
   ```

### Problem: HuggingFace API Errors

**Symptom**: No content generated, empty hooks/captions

**Solutions**:
1. **Check HuggingFace Key**:
   ```bash
   echo "HUGGINGFACE_API_KEY: $HUGGINGFACE_API_KEY"
   ```

2. **Verify Token is Active**:
   - Go to [HuggingFace Tokens](https://huggingface.co/settings/tokens)
   - Check token hasn't been revoked
   - Ensure "Read" access is enabled

3. **Check Model Availability**:
   - Model `meta-llama/Llama-2-7b-chat-hf` might be loading
   - First request takes longer (model loading)
   - Subsequent requests are faster

### Problem: Username Extraction Failed

**Symptom**: Error extracting username from URL

**Valid URL Formats**:
- ✅ `https://www.instagram.com/dainikrajeevtimes.mp`
- ✅ `https://www.instagram.com/dainikrajeevtimes.mp/`
- ✅ `https://instagram.com/dainikrajeevtimes.mp`
- ✅ `dainikrajeevtimes.mp`
- ✅ `@dainikrajeevtimes.mp`

**Invalid Formats** (will be cleaned):
- ❌ `https://www.instagram.com/dainikrajeevtimes.mp/?utm_source=...` → OK (query removed)
- ❌ `https://www.instagram.com/p/ABC123/` → Won't work (post URL, not profile)

---

## 🎯 Next Steps (Phase 2-3)

### Phase 2: Enhanced Features
- [ ] Store generated content in database
- [ ] User accounts & saved drafts
- [ ] Performance metrics
- [ ] Multi-language support
- [ ] Instagram post scheduling

### Phase 3: Advanced Features
- [ ] Real-time trend analysis
- [ ] Competitor analysis
- [ ] Custom AI model fine-tuning
- [ ] Video generation
- [ ] Direct Instagram posting

---

## 📝 API Endpoints Reference

### Current Endpoints (Phase 1):

#### 1. Submit Influencer for Processing
```
POST /api/influencer/submit
Body: { url, platform, niche }
Response: { id, status, username, estimatedTime }
```

#### 2. Get Generated Content
```
GET /api/influencer/{requestId}/content
Response: { profileData, content, trends }
```

#### 3. Get Trend Analysis
```
GET /api/influencer/{requestId}/trends
Response: { trends analysis }
```

#### 4. Direct Profile Scrape
```
POST /api/influencer/scrape
Body: { url }
Response: { profileData }
```

#### 5. Generate Specific Content
```
POST /api/generate/hooks
POST /api/generate/scripts
Body: { profileData, niche, count }
```

---

## ✨ Summary: What You Have Now

✅ **Real Instagram Scraping** with 3 fallback methods  
✅ **AI Content Generation** (Hooks, Captions, Scripts, Hashtags)  
✅ **Trend Analysis** of Instagram profiles  
✅ **Complete Backend Pipeline** ready to use  
✅ **Error Handling & Fallbacks** for reliability  
✅ **Detailed Logging** for debugging  

🚀 **Your system is ready for Phase 1!**

---

## 📞 Support

If you need different API providers:
- Instagram Graph API (Official): [https://developers.facebook.com/docs/instagram-api](https://developers.facebook.com/docs/instagram-api)
- RapidAPI Alternatives: Search "Instagram" on RapidAPI marketplace
- Self-hosted options: Instagrapi (Python), instagram-scraper (Node.js)

---

**Generated**: May 13, 2026  
**Project**: Phaze AI Content Studio  
**Phase**: 1 - Foundation & Real Data Integration
