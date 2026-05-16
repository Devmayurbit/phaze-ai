# 🆘 Phase 1 Troubleshooting Guide

## Quick Diagnostics

Run this to check your setup:
```bash
cd backend
npm run verify
# or
node ../verify-phase1.js
```

---

## Common Issues & Solutions

### 1. ❌ "Cannot GET /health" or Backend Not Running

**Symptom**:
```
ECONNREFUSED: Connection refused 127.0.0.1:5000
```

**Solution**:
```bash
cd backend
npm install
node src/server.js
```

Expected output:
```
✅ Server running on http://localhost:5000
```

**Verify**: Open browser → `http://localhost:5000/health`

---

### 2. ❌ No RAPIDAPI_KEY in Environment

**Symptom**:
```
[Scraper] ⚠️ No RAPIDAPI_KEY found in .env
[Scraper] Using generated fallback
```

**Solution**:

**Step 1**: Get API Key
- Go to [RapidAPI.com](https://rapidapi.com)
- Search for "Instagram" or "Instagram Scraper API"
- Click "Subscribe" on a plan (free tier available)

**Step 2**: Find Your Key
- Click "Snippets" or "API Key" tab
- Copy the `X-RapidAPI-Key` value

**Step 3**: Add to .env
```env
RAPIDAPI_KEY=8a8377c77fmsh63db2e9b4e8a01fp1a79ebjsne576bd762077
```

**Step 4**: Restart server
```bash
node src/server.js
```

**Test**: Logs should now show `✅ RapidAPI connection successful`

---

### 3. ❌ RapidAPI Returns 429 (Rate Limit)

**Symptom**:
```
[Scraper] ❌ Method 1 failed: 429
[Scraper] Method 2 failed: 429
[Scraper] Using generated fallback
```

**Causes**:
- Too many requests (quota exceeded)
- Free tier limit reached
- IP blocked temporarily

**Solutions**:

**Option A**: Upgrade RapidAPI Plan
- Go to [RapidAPI Subscriptions](https://rapidapi.com/my-apps/subscriptions)
- Click on Instagram API
- Upgrade to paid plan with higher quota

**Option B**: Use Different Endpoint
- Try different Instagram scraper API on RapidAPI
- Each has different rate limits
- Some allow 100 requests/day, others 1000/month

**Option C**: Wait & Retry
- Free tier resets daily/monthly
- Wait before retrying requests
- Check RapidAPI dashboard for quota reset time

**Test After Fix**:
```bash
curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/instagram", "platform": "instagram", "niche": "Tech"}'
```

Should see real data, not "source: generated"

---

### 4. ❌ RapidAPI Returns 401 (Invalid Key)

**Symptom**:
```
[Scraper] ❌ Method 1 failed: 401
[Scraper] Reason: Invalid or expired API key
```

**Solutions**:

**Step 1**: Verify Key is Correct
- Copy key from RapidAPI again (no extra spaces)
- Update `.env`
- Restart server

**Step 2**: Check if Key is Active
- Go to [RapidAPI My Apps](https://rapidapi.com/my-apps)
- Find your subscription
- Click "Applications" tab
- Make sure API key is listed and active

**Step 3**: Regenerate Key
- Click the three dots (...)
- Select "Regenerate API Key"
- Copy new key to `.env`

---

### 5. ❌ HuggingFace Returns 401

**Symptom**:
```
[AI Generator] HuggingFace connection failed
Error: 401 Unauthorized
```

**Solution**:

**Step 1**: Get Token
- Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
- Click "New token"
- Name: "Phaze AI"
- Type: "Read" (that's all we need)
- Click "Generate token"

**Step 2**: Copy Token
```env
HUGGINGFACE_API_KEY=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
```

**Step 3**: Restart Server
```bash
node src/server.js
```

**Step 4**: Test
```bash
curl -X POST http://localhost:5000/api/generate/hooks \
  -H "Content-Type: application/json" \
  -d '{"profileData": {"username": "test", "followers": 1000}, "niche": "tech", "count": 3}'
```

---

### 6. ⏳ HuggingFace Model is Loading (503)

**Symptom**:
```
[AI Generator] HuggingFace connection failed
Error: 503 Service Unavailable
Reason: Model is loading (first request), try again in 30s
```

**This is NORMAL** on first request!

**Solution**:
1. Wait 30-60 seconds
2. Try again
3. Model will load into memory
4. Subsequent requests will be faster

**Verify**: Try the same request again after 1 minute

---

### 7. ❌ Instagram URL Not Recognized

**Symptom**:
```
Error: Invalid Instagram URL format
```

**Valid Formats** (all these work):
- ✅ `https://www.instagram.com/dainikrajeevtimes.mp`
- ✅ `https://instagram.com/dainikrajeevtimes.mp`
- ✅ `instagram.com/dainikrajeevtimes.mp`
- ✅ `dainikrajeevtimes.mp`
- ✅ `@dainikrajeevtimes.mp`

**Invalid Formats**:
- ❌ `instagram.com/p/ABC123/` (post URL, not profile)
- ❌ `https://www.instagram.com/explore/tags/tech/` (hashtag page)
- ❌ Just text without format

**Fix**: Ensure you're using a **profile URL**, not post URL

---

### 8. ⚠️ Getting Always "Generated" Data Instead of "Real"

**Symptom**: Logs show "using generated fallback" every time

**Diagnostic Steps**:

```bash
# Step 1: Check API Keys
echo $RAPIDAPI_KEY
echo $HUGGINGFACE_API_KEY

# Step 2: Test RapidAPI directly
curl -X GET 'https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=instagram' \
  -H 'X-RapidAPI-Key: YOUR_KEY' \
  -H 'X-RapidAPI-Host: instagram-scraper-api2.p.rapidapi.com'

# Step 3: Check response
# If you get user data → API is working
# If you get error → See issue #2, #3, or #4 above
```

**Solution Priority**:
1. Check if RapidAPI key is valid (test with curl above)
2. Check if key has remaining quota
3. Try alternative scraper endpoint
4. If none work, use generated data (fallback is still useful)

---

### 9. ❌ Frontend Not Loading

**Symptom**: 
```
Connection refused on http://localhost:3000
```

**Solution**:
```bash
cd frontend
npm install
npm run dev
```

**Note**: Frontend runs on port 3000 by default (or next available)

**Verify**: Check terminal for "Local: http://localhost:3000"

---

### 10. 🔄 Backend Responds Slow or Times Out

**Symptom**:
```
Request timeout after 30 seconds
```

**Causes**:
- HuggingFace model loading (first request)
- API throttling
- Network issues

**Solutions**:
1. **For HuggingFace**: Wait for model to load (30-60s first request)
2. **For API**: Check rate limits, upgrade plan if needed
3. **For Network**: Check internet connection
4. **Increase Timeout**: Edit `contentController.js` timeout values

**Typical Times**:
- First request: 30-60 seconds (model loading)
- Subsequent: 5-10 seconds
- Instagram scrape: 2-5 seconds

---

## Debug Mode

Enable detailed logging:

**In `.env`**:
```env
DEBUG_SCRAPER=true
```

**Or in instagramScraper.js**:
```javascript
this.debugMode = true
```

Restart server and check logs for:
```
[InstagramScraper] 🔍 Fetching REAL profile for @username
[InstagramScraper] 📡 Attempting Method 1: instagram-scraper-api2...
[InstagramScraper] ✅ SUCCESS: Got REAL data from instagram-scraper-api2
```

---

## Test Commands (Copy & Paste)

### Test 1: Check Backend
```bash
curl http://localhost:5000/health
```

### Test 2: Scrape Profile
```bash
curl -X POST http://localhost:5000/api/influencer/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/dainikrajeevtimes.mp"}'
```

### Test 3: Generate Content
```bash
curl -X POST http://localhost:5000/api/influencer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.instagram.com/instagram",
    "platform": "instagram",
    "niche": "Tech & Innovation"
  }'
```

### Test 4: Get Results (replace REQUEST_ID)
```bash
curl http://localhost:5000/api/influencer/REQUEST_ID/content
```

---

## Still Not Working?

1. **Run verification script**:
   ```bash
   node verify-phase1.js
   ```

2. **Check error messages** in console carefully

3. **Look at specific section** in this guide matching your error

4. **Verify steps**:
   - ✅ Backend running (`node src/server.js`)
   - ✅ RAPIDAPI_KEY in .env
   - ✅ HUGGINGFACE_API_KEY in .env
   - ✅ .env file is in `backend/` folder
   - ✅ Restarted server after changing .env

5. **Try alternative API**:
   - If RapidAPI failing, subscribe to different Instagram API
   - Different endpoints have different reliability

---

## API Status Checker

Check RapidAPI service status:
- Visit [https://rapidapi.com/my-apps](https://rapidapi.com/my-apps)
- Find your Instagram API
- Click "Specs" tab
- Check last response time

Check HuggingFace model status:
- Visit [https://huggingface.co/meta-llama/Llama-2-7b-chat-hf](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf)
- Check if model is loading or available

---

## Performance Tips

1. **Cache Results**: Generated content is already cached per user
2. **Batch Requests**: Generate for multiple profiles at once
3. **Monitor Quota**: Check RapidAPI remaining requests regularly
4. **Use Free Tier Wisely**: ~100 requests/month typical for free plans

---

## Still Have Issues?

1. Check [PHASE_1_SETUP_GUIDE.md](PHASE_1_SETUP_GUIDE.md) for complete overview
2. Review API documentation links at bottom of guide
3. Check terminal logs carefully for specific error messages
4. Verify all 3 components (Backend, Instagram API, AI API) are working

**You're doing great! Phase 1 will work once APIs are connected.** 🚀
