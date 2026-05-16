# Phaze AI Phase 1: Quick Developer Reference

## 🔥 Quick Start (5 mins)

```bash
# 1. Setup
cd backend && npm install && npm run dev    # Terminal 1
cd frontend && npm install && npm run dev   # Terminal 2
mongod                                       # Terminal 3

# 2. Configure .env files
# backend/.env: Add RAPIDAPI_KEY, MONGODB_URI
# frontend/.env: Keep default

# 3. Open http://localhost:5173
# Search any Instagram username → Real data loads
```

---

## 📚 Architecture Overview

```
User Interface (React)
       ↓
Frontend Services (Axios)
       ↓
Backend API Routes (Express)
       ↓
Controllers (Business Logic)
       ↓
Services (RapidAPI Integration) + Database (MongoDB)
       ↓
Returns JSON to Frontend
```

---

## 🔑 Key Files & Their Purpose

### Backend

| File | Purpose | Key Functions |
|------|---------|---|
| `instagramService.js` | RapidAPI Integration | fetchUserProfile(), fetchUserPosts(), searchUsers() |
| `analyzeInstagramData.js` | Data Analysis | analyzeAllPosts(), extractMostUsedHashtags(), calculateEngagementTrend() |
| `instagramController.js` | API Logic | fetchInstagramProfile(), getInstagramProfile(), getInstagramAnalytics() |
| `instagramRoutes.js` | URL Routing | POST/GET endpoints mapping |
| `errorHandler.js` | Middleware | Validation, sanitization, rate limiting |
| `Models/*.js` | Database Schemas | InstagramProfile, InstagramPost, Analytics |

### Frontend

| File | Purpose | Key Features |
|------|---------|---|
| `InstagramDashboard.jsx` | Main Page | Search, tabs, animations |
| `ProfileHeader.jsx` | Profile Info | Profile pic, verified badge, stats |
| `AnalyticsCards.jsx` | Key Metrics | 4 stat cards with gradients |
| `PostsGrid.jsx` | Posts Display | 3-col grid, modal, engagement |
| `HashtagsChart.jsx` | Hashtag Analytics | Bar chart via Recharts |
| `EngagementChart.jsx` | Trend Chart | Line chart via Recharts |
| `instagramService.js` | API Client | Axios calls to backend |

---

## 🔄 Data Flow Example

```
User enters "nasa" → Search button clicked
         ↓
POST /api/instagram/fetch { username: "nasa" }
         ↓
instagramService.fetchUserProfile("nasa")
  ↓ Calls RapidAPI
  ↓ Returns profile data
         ↓
instagramService.fetchUserPosts("nasa", 12)
  ↓ Calls RapidAPI
  ↓ Returns 12 posts
         ↓
analyzeInstagramData.analyzeAllPosts(posts)
  ↓ Extracts hashtags
  ↓ Calculates engagement
  ↓ Finds best times
         ↓
Save all to MongoDB
         ↓
Return to frontend
         ↓
Frontend renders dashboard with data
```

---

## 🛠️ Common Tasks

### Add a New Stat to AnalyticsCards
```javascript
// 1. Calculate in analyzeInstagramData.js
getFollowerEngagementRatio() {
  return followers / totalEngagement;
}

// 2. Add to controller response
analytics.followerEngagementRatio = ...

// 3. Add card in AnalyticsCards.jsx
{ title: 'Follower Ratio', value: analytics.followerEngagementRatio }
```

### Modify API Response
```javascript
// backend/src/controllers/instagramController.js
export const fetchInstagramProfile = async (req, res) => {
  // ... fetch data ...
  res.json({
    profile: existingProfile,
    posts: posts.slice(0, 12),
    analytics,
    // ADD NEW FIELD HERE
    customData: "..."
  });
};
```

### Add New Route
```javascript
// backend/src/routes/instagramRoutes.js
import newController from '../controllers/newController.js';
router.get('/new-endpoint', newController.newHandler);

// Then access as: GET /api/instagram/new-endpoint
```

---

## 🐛 Debugging Tips

### Backend Issues
```bash
# Check if running
curl http://localhost:5000/health

# Check if MongoDB connected
# Look for "Connected to MongoDB" in console

# Check RapidAPI errors
# Look for "RapidAPI" errors in console output

# Enable detailed logs
NODE_ENV=development npm run dev
```

### Frontend Issues
```javascript
// Add console logs in service
export const fetchInstagramData = async (username) => {
  console.log('Fetching:', username);
  const response = await instagramAPI.post('/fetch', { username });
  console.log('Response:', response.data);
  return response.data;
};

// Check network tab in DevTools
// Look for failed API calls (red)
```

---

## 📦 Dependencies

### Backend
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ORM",
  "axios": "HTTP client for RapidAPI",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables"
}
```

### Frontend
```json
{
  "react": "UI framework",
  "vite": "Build tool",
  "tailwindcss": "CSS framework",
  "framer-motion": "Animations",
  "recharts": "Charts library",
  "lucide-react": "Icon library",
  "axios": "API client"
}
```

---

## 🔒 Environment Variables

### Required
```env
RAPIDAPI_KEY          # Get from https://rapidapi.com
MONGODB_URI           # MongoDB connection string
```

### Optional
```env
PORT                  # Backend port (default 5000)
NODE_ENV              # development/production
JWT_SECRET            # For authentication (Phase 2)
VITE_API_URL         # Frontend API URL
CORS_ORIGIN          # Allowed frontend URLs
```

---

## 📊 Database Queries (MongoDB)

```javascript
// Get top 5 users by followers
db.instagramprofiles.find().sort({ followers: -1 }).limit(5)

// Get posts with hashtags
db.instagramposts.find({ hashtags: { $exists: true, $ne: [] } })

// Get high engagement posts
db.instagramposts.find({ engagementRate: { $gt: 5 } })

// Get posts from last 30 days
db.instagramposts.find({ 
  timestamp: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
})
```

---

## 🎨 Styling System

### Colors
```javascript
// Dark Background
bg-[#0a0e27]     // Primary dark
bg-[#1a1f3a]     // Secondary dark
bg-[#0d1628]     // Tertiary dark

// Accent Colors
from-purple-600  // Primary
to-blue-600      // Secondary
text-pink-400    // Accent
```

### Components Pattern
```jsx
// Glassmorphism card
<div className="rounded-3xl bg-[#1a1f3a]/50 backdrop-blur-xl border border-purple-500/20">
  {/* Content */}
</div>

// Gradient text
<h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
  Title
</h1>

// Hover effect
<motion.div whileHover={{ y: -5 }} className="...">
```

---

## 🚀 Performance Checklist

- ✅ Database indexes created
- ✅ API responses optimized
- ✅ Frontend components memoized
- ✅ Images cached in database
- ✅ Rate limiting enabled
- ✅ Error handling comprehensive
- ✅ Loading states implemented
- ✅ Responsive design tested

---

## 📋 Testing Checklist

```
Backend:
  ☐ Health endpoint responds
  ☐ RapidAPI integration works
  ☐ MongoDB saves data
  ☐ Error handling works
  ☐ Rate limiting works
  
Frontend:
  ☐ Dashboard loads
  ☐ Search works
  ☐ All tabs functional
  ☐ Post modal opens
  ☐ Charts render
  ☐ Responsive on mobile
  ☐ Loading states show
  ☐ Error messages display

Full Stack:
  ☐ End-to-end flow works
  ☐ Data persists in DB
  ☐ Multiple searches work
  ☐ Different usernames tested
```

---

## 🔗 Useful Links

- **RapidAPI Dashboard:** https://rapidapi.com/user/account/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **React Docs:** https://react.dev/
- **Framer Motion:** https://www.framer.com/motion/
- **Recharts:** https://recharts.org/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 📞 Support Resources

| Issue | Solution |
|-------|----------|
| API returns 401 | Update RapidAPI key in .env |
| MongoDB connection fails | Ensure MongoDB is running |
| CORS error | Check frontend/backend URLs in .env |
| No data returned | Verify username exists and is public |
| Slow dashboard | Reduce posts limit or add pagination |
| Dashboard won't load | Check browser console for errors |

---

**Last Updated:** 2026-05-13
**Version:** Phase 1 MVP
**Status:** Production Ready
