# Phaze AI — Multi-Agent Content Automation System

> Modern AI SaaS platform for influencers to generate viral content automatically using autonomous AI agents.

## 🚀 Project Overview

**Phaze AI** enables content creators to submit their social profiles and receive:
- Viral content ideas
- Reel hooks & scripts
- Optimized captions
- Hashtag recommendations
- Trend analysis & growth insights

## 📋 Tech Stack

### Frontend
- **Vite** + **React 18**
- **Tailwind CSS** (responsive, mobile-first)
- **Framer Motion** (smooth animations)
- Modern dark UI with purple neon theme

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (schema-ready)
- RESTful API architecture
- Mock data integration

### Future Integration
- **OpenRouter API** (Claude, GPT models)
- **n8n** (workflow automation)
- **AI Agents** (Scraper, Validator, Writer, Hook)

---

## 📁 Project Structure

```
phaze-ai/
├── frontend/              # React + Vite SPA
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global styles
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── mock/          # Mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Helper functions
│   │   ├── config/        # Configuration files
│   │   └── server.js      # Main entry point
│   ├── .env.example
│   └── package.json
│
├── shared/                # Shared utilities
│   ├── constants.js
│   ├── types.js
│   └── validators.js
│
├── docs/                  # Documentation
│   ├── API.md
│   ├── SETUP.md
│   └── ARCHITECTURE.md
│
└── .env.example           # Root environment template
```

---

## 🎯 Roadmap (Phase 1)

- [x] Project structure setup
- [ ] Landing page with hero section
- [ ] Dashboard UI with sidebar
- [ ] Agent pipeline visualization
- [ ] Backend mock APIs
- [ ] MongoDB schema models
- [ ] Responsive animations
- [ ] Complete documentation

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

---

## 🎨 Design System

### Color Palette
- **Background**: `#0a0e27` (Dark blue-black)
- **Primary**: `#6d28d9` (Purple)
- **Secondary**: `#3b82f6` (Blue)
- **Accent**: `#ec4899` (Pink neon)
- **Text**: `#f8fafc` (Light)

### Typography
- **Headings**: Inter / Plus Jakarta Sans
- **Body**: Inter
- **Code**: Fira Code

### Components
- Glassmorphism cards
- Glowing borders on hover
- Smooth transitions (300-500ms)
- Responsive grid layouts

---

## 📡 API Routes (Backend)

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/influencer/submit
GET    /api/influencer/:id
POST   /api/scrape
POST   /api/generate-script
POST   /api/generate-hooks
GET    /api/trend-analysis
GET    /api/analytics
```

---

## 🗄️ MongoDB Collections

- **Users** - Platform accounts
- **Influencers** - Creator profiles
- **GeneratedScripts** - AI-generated content
- **Hooks** - Generated hooks/captions
- **TrendReports** - Trend analysis
- **Analytics** - Usage metrics

---

## 🤝 Contributing

Ensure code follows:
- ESLint rules
- Prettier formatting
- Mobile-first responsive design
- Accessibility standards (WCAG 2.1)

---

## 📞 Support

For setup help, see `docs/SETUP.md`

---

**Status**: Level 1 MVP (Architecture & UI Focus)  
**Last Updated**: 2026-05-11
