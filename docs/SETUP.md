# Phaze AI — Setup Guide

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** for version control

## Project Structure

```
phaze-ai/
├── frontend/          # React + Vite SPA
├── backend/           # Node.js + Express API
├── shared/            # Shared utilities (future)
└── docs/              # Documentation
```

---

## 🚀 Quick Start

### 1. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Configure Environment

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `.env` and update:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/phaze-ai
CORS_ORIGIN=http://localhost:5173
```

### 3. Start Development Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

---

## 📁 Project Structure Breakdown

### Frontend (`/frontend`)

```
src/
├── components/
│   ├── landing/           # Landing page components
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── PipelineShowcase.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Pricing.jsx
│   │   └── Footer.jsx
│   └── dashboard/         # Dashboard components
│       ├── Sidebar.jsx
│       ├── DashboardContent.jsx
│       ├── StatsCards.jsx
│       ├── GeneratorSection.jsx
│       ├── ActivityFeed.jsx
│       └── AgentPipeline.jsx
├── pages/
│   ├── Landing.jsx
│   └── Dashboard.jsx
├── services/
│   └── api.js             # API client configuration
├── mock/
│   └── data.js            # Mock data for development
├── styles/
│   └── globals.css        # Global styles
├── App.jsx
├── App.css
└── main.jsx
```

### Backend (`/backend`)

```
src/
├── routes/
│   └── api.js             # API route definitions
├── controllers/
│   └── contentController.js  # Route handlers
├── models/
│   ├── User.js
│   ├── Influencer.js
│   ├── GeneratedScript.js
│   ├── TrendReport.js
│   └── Analytics.js
├── config/
│   └── mockData.js        # Mock data for responses
├── middleware/            # Custom middleware (future)
└── server.js              # Express server setup
```

---

## 🔌 API Endpoints

### Influencer Management
- `POST /api/influencer/submit` - Submit influencer URL
- `GET /api/influencer/:id/content` - Get generated content
- `GET /api/influencer/:id/trends` - Get trend analysis
- `POST /api/influencer/scrape` - Start profile scraping

### Content Generation
- `POST /api/generate/scripts` - Generate scripts
- `POST /api/generate/hooks` - Generate hooks

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/pipeline` - Get agent pipeline status

### Analytics
- `GET /api/analytics` - Get analytics data

---

## 🎨 Design System

### Colors
```
Dark Blue-Black: #0a0e27
Dark Blue: #0f1535
Purple Neon: #a855f7
Blue: #3b82f6
Pink Neon: #ec4899
Cyan: #06b6d4
```

### Typography
- **Headings**: Plus Jakarta Sans
- **Body**: Inter
- **Code**: Fira Code

### Components
- Glassmorphism cards with backdrop blur
- Glowing borders and hover effects
- Smooth transitions (300-500ms)
- Responsive grid layouts

---

## 📝 Development Notes

### Frontend Development
- Uses **Vite** for fast HMR
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls

### Backend Development
- **Express.js** for routing
- **MongoDB** schema-ready (not connected yet)
- **CORS** enabled for frontend
- Mock data for testing

### Current Status
- ✅ Landing page with animations
- ✅ Dashboard UI with sidebar
- ✅ Agent pipeline visualization
- ✅ Backend mock APIs
- ✅ MongoDB schema models
- ⏳ Database connection (ready for MongoDB setup)
- ⏳ Real AI integration (OpenRouter)
- ⏳ n8n workflow integration

---

## 🔧 Available Scripts

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

### Backend
```bash
npm run dev      # Start with auto-reload
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
# Deploy from 'backend' directory
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes
3. Format code: `npm run format`
4. Run linter: `npm run lint`
5. Commit: `git commit -m "feat: description"`
6. Push: `git push origin feature/feature-name`

---

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vite, React 18, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (schema-ready) |
| **APIs** | RESTful architecture |
| **Future** | OpenRouter, n8n, AI Agents |

---

## 📞 Support & Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Express.js**: https://expressjs.com/

---

**Last Updated**: 2026-05-11  
**Status**: Level 1 MVP — Architecture & UI Focus
