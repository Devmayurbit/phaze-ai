# Phaze AI Phase 1: Instagram Content Intelligence System

## 🎯 Project Overview

Phaze AI Phase 1 is a production-ready Instagram content intelligence platform that fetches real Instagram profile data, analyzes engagement metrics, and provides actionable insights through a beautiful, modern dashboard.

**Key Features:**
- ✅ Real Instagram profile fetching (username, followers, bio, etc.)
- ✅ Fetch 12 latest posts with full analytics
- ✅ AI-powered content analysis (hashtags, engagement, posting times)
- ✅ Beautiful modern dashboard with animations
- ✅ Production-ready security & error handling
- ✅ Rate limiting & request validation

---

## 📋 Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB
- **API Integration:** RapidAPI (Instagram Data)
- **Auth:** JWT (prepared for Phase 2)

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

### Third-party Services
- **Instagram Data API:** RapidAPI
- **ML/NLP:** HuggingFace (future)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB 5.0+ (local or Atlas)
- RapidAPI account with Instagram API access
- Instagram business/creator account (recommended)

### 1. Clone & Setup Repository

```bash
# Navigate to project
cd /path/to/phaze-ai

# Install root dependencies
npm install
```

### 2. Configure Environment Variables

#### Backend (.env)
```bash
cd backend

# Copy and fill in your keys
cp .env.example .env
```

**Required Variables:**
```env
PORT=5000
NODE_ENV=development

# REQUIRED: RapidAPI Instagram Endpoint
RAPIDAPI_KEY=your_rapidapi_key_here

# REQUIRED: HuggingFace for AI features
HUGGINGFACE_API_KEY=your_huggingface_token_here

# Database
MONGODB_URI=mongodb://localhost:27017/phaze-ai

# Frontend URL
VITE_API_URL=http://localhost:5000/api

# Security
JWT_SECRET=your_jwt_secret_here_change_in_production

# CORS
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env)
```bash
cd frontend

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
```

### 3. RapidAPI Setup (Instagram API)

**Steps:**
1. Go to: https://rapidapi.com/
2. Sign up for free account
3. Search for "Instagram" in API marketplace
4. Subscribe to an Instagram API (recommend "instagram-data1")
5. Copy your **RapidAPI Key** from the dashboard
6. Paste into backend `.env` as `RAPIDAPI_KEY`

**Free Plan Usually Includes:**
- 100 requests/day
- Profile info fetching
- Post fetching with engagement data
- User search

**Paid Plans Available** for higher limits.

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB Community
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod

# Verify running on port 27017
```

#### Option B: MongoDB Atlas (Cloud)
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phaze-ai
```

### 5. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 6. Run Backend

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Or production mode
npm run build && npm start
```

**Expected Output:**
```
🚀 Phaze AI Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

### 7. Run Frontend

```bash
cd frontend

# Development mode
npm run dev

# Or build for production
npm run build
npm run preview
```

**Expected Output:**
```
➜  Local:   http://localhost:5173/
```

---

## 📂 Project Structure

```
phaze-ai/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── InstagramProfile.js      # Profile schema
│   │   │   ├── InstagramPost.js         # Posts schema
│   │   │   └── Analytics.js             # Analytics schema
│   │   │
│   │   ├── services/
│   │   │   └── instagramService.js      # RapidAPI integration
│   │   │
│   │   ├── controllers/
│   │   │   └── instagramController.js   # API logic
│   │   │
│   │   ├── routes/
│   │   │   ├── instagramRoutes.js       # Instagram endpoints
│   │   │   └── api.js                   # Main router
│   │   │
│   │   ├── middleware/
│   │   │   └── errorHandler.js          # Error handling & validation
│   │   │
│   │   ├── utils/
│   │   │   └── analyzeInstagramData.js  # Data analysis logic
│   │   │
│   │   ├── server.js                    # Express app setup
│   │   └── package.json
│   │
│   └── .env                             # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── InstagramDashboard.jsx   # Main dashboard page
│   │   │
│   │   ├── components/
│   │   │   └── Instagram/
│   │   │       ├── ProfileHeader.jsx    # Profile section
│   │   │       ├── AnalyticsCards.jsx   # Stats cards
│   │   │       ├── PostsGrid.jsx        # Posts display
│   │   │       ├── HashtagsChart.jsx    # Hashtag analytics
│   │   │       ├── EngagementChart.jsx  # Engagement trends
│   │   │       └── LoadingSkeleton.jsx  # Loading state
│   │   │
│   │   ├── services/
│   │   │   └── instagramService.js      # API calls
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env                             # Frontend env
│   └── package.json
│
├── .env.example                         # Root env template
└── README.md
```

---

## 🔌 API Endpoints

### Instagram Routes
All endpoints under `/api/instagram`

#### 1. Fetch Instagram Profile & Posts
```
POST /api/instagram/fetch
Body: { "username": "dainikrajeevtimes" }

Response: {
  "profile": { username, fullName, followers, ... },
  "posts": [ { caption, hashtags, likes, ... } ],
  "analytics": { avgEngagement, mostUsedHashtags, ... }
}
```

#### 2. Get Stored Profile
```
GET /api/instagram/:username

Response: {
  "profile": { ... },
  "posts": [ ... ],
  "analytics": { ... }
}
```

#### 3. Get Profile Analytics
```
GET /api/instagram/:username/analytics

Response: {
  "analytics": { ... },
  "recentPostsCount": 10,
  "topPosts": [ ... ]
}
```

#### 4. Search Instagram Users
```
POST /api/instagram/search
Body: { "query": "elon musk" }

Response: {
  "results": [ { username, fullName, ... } ]
}
```

#### 5. Get All Stored Profiles
```
GET /api/instagram/

Response: {
  "profiles": [ { username, followers, ... } ]
}
```

---

## 📊 Database Models

### InstagramProfile
```javascript
{
  username: String (unique),
  fullName: String,
  bio: String,
  profilePicture: String,
  followers: Number,
  following: Number,
  postsCount: Number,
  verified: Boolean,
  externalUrl: String,
  lastFetched: Date,
  rawData: Object
}
```

### InstagramPost
```javascript
{
  postId: String (unique),
  username: String,
  caption: String,
  hashtags: [String],
  likes: Number,
  comments: Number,
  timestamp: Date,
  mediaUrl: String,
  mediaType: 'image' | 'video' | 'carousel' | 'reel',
  engagementRate: Number,
  shortCode: String
}
```

### Analytics
```javascript
{
  username: String (unique),
  averageEngagementRate: Number,
  mostUsedHashtags: [{ hashtag, frequency }],
  bestPostingTime: String,
  captionStyleAnalysis: { avgLength, useEmojis, ctaPercentage },
  topPerformingContentType: String,
  totalPosts: Number,
  totalEngagement: Number
}
```

---

## 🎨 Frontend Features

### InstagramDashboard Page
- Search bar with real-time validation
- Profile header with stats
- Tabbed interface (Overview, Posts, Hashtags, Engagement)
- Loading skeletons during fetch
- Error handling with user-friendly messages

### Components
- **ProfileHeader:** Displays profile info, verified status, stats
- **AnalyticsCards:** 4 key metrics with hover animations
- **PostsGrid:** 3-column responsive grid with post details and modal
- **HashtagsChart:** Bar chart of top hashtags
- **EngagementChart:** Line chart of engagement trends
- **LoadingSkeleton:** Animated shimmer effects

### Design System
- Dark premium UI with purple/blue neon theme
- Glassmorphism cards with blur effects
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Accessibility standards (WCAG 2.1)

---

## 🔐 Security Features

### Backend
- ✅ Request validation & sanitization
- ✅ Rate limiting (100 requests/minute)
- ✅ Error handling with no data leaks
- ✅ Environment variable protection
- ✅ MongoDB injection prevention
- ✅ CORS configuration

### Frontend
- ✅ No sensitive data in client code
- ✅ Safe API endpoint configuration
- ✅ XSS prevention with React
- ✅ Input validation before API calls

### Production Checklist
- [ ] Change JWT_SECRET in .env
- [ ] Use environment-specific configurations
- [ ] Enable HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for your domain
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Set up API rate limiting on server
- [ ] Monitor API usage with RapidAPI dashboard

---

## 🧪 Testing

### Manual Testing
```bash
# Test backend health
curl http://localhost:5000/health

# Test Instagram fetch
curl -X POST http://localhost:5000/api/instagram/fetch \
  -H "Content-Type: application/json" \
  -d '{"username":"dainikrajeevtimes"}'
```

### Frontend Testing
1. Open http://localhost:5173
2. Enter a valid Instagram username
3. Verify profile data loads
4. Check all tabs work
5. Test post modal click
6. Verify responsive design on mobile

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```
✅ Ensure MongoDB is running: mongod
✅ Check MONGODB_URI in .env
✅ Verify connection string format
✅ For Atlas: ensure IP is whitelisted
```

### "RapidAPI key invalid"
```
✅ Get key from: https://rapidapi.com/user/account/
✅ Paste in backend/.env
✅ Check for trailing spaces
✅ Verify subscription is active
```

### "CORS error"
```
✅ Frontend .env has VITE_API_URL=http://localhost:5000/api
✅ Backend .env has CORS_ORIGIN=http://localhost:5173
✅ Clear browser cache
✅ Hard refresh (Ctrl+Shift+R)
```

### "Instagram data not fetching"
```
✅ Check RapidAPI request limits
✅ Verify username exists (case-sensitive)
✅ Check backend logs for errors
✅ Try with a public business account
```

### "Slow dashboard loading"
```
✅ Reduce number of posts fetched (12 is default)
✅ Implement pagination for large datasets
✅ Cache data in MongoDB
✅ Enable database indexing
```

---

## 📈 Performance Tips

### Backend Optimization
- Enable MongoDB indexing on frequently queried fields
- Implement caching layer (Redis)
- Use pagination for large result sets
- Batch API requests to RapidAPI

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization with next/image equivalent
- Memoization with React.memo()
- Virtual scrolling for large post lists

### Database Optimization
```javascript
// Add indexes for faster queries
db.instagramposts.createIndex({ username: 1, timestamp: -1 })
db.instagramprofiles.createIndex({ username: 1 })
```

---

## 🔄 Workflow

1. User enters Instagram username in search
2. Frontend sends POST request to `/api/instagram/fetch`
3. Backend calls RapidAPI Instagram endpoint
4. Data validated and sanitized
5. Profile, posts, and analytics saved to MongoDB
6. Data returned to frontend
7. Dashboard renders with animations
8. User can click posts to see details
9. Analytics charts display trends

---

## 🚀 Phase 2 Roadmap

- [ ] User authentication & profiles
- [ ] Save favorite profiles
- [ ] Content generation with AI
- [ ] Hook/caption suggestions
- [ ] Trend analysis & predictions
- [ ] Multi-platform support (TikTok, YouTube)
- [ ] Export analytics to PDF/CSV
- [ ] Real-time notifications
- [ ] Team collaboration features

---

## 📞 Support & Resources

- **RapidAPI Docs:** https://rapidapi.com/instagram-data1-instagram-data-instagram-data-default/api
- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/
- **Framer Motion:** https://www.framer.com/motion/

---

## 📝 License

This project is part of Phaze AI. All rights reserved.

**Last Updated:** 2026-05-13  
**Phase:** 1 MVP  
**Status:** Production Ready
