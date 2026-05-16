import express from 'express'
import {
  submitInfluencer,
  getGeneratedContent,
  getTrendAnalysis,
  getDashboardStats,
  getAgentPipelineStatus,
  getAnalytics,
  scrapeProfile,
  generateScripts,
  generateHooks,
} from '../controllers/contentController.js'
import {
  analyzeInfluencer,
  getAnalysisResults,
} from '../controllers/enhancedContentController.js'
import instagramRoutes from './instagramRoutes.js'

const router = express.Router()

// Instagram routes
router.use('/instagram', instagramRoutes)

// Influencer routes
router.post('/influencer/submit', submitInfluencer)
router.get('/influencer/:influencerId/content', getGeneratedContent)
router.get('/influencer/:influencerId/trends', getTrendAnalysis)
router.post('/influencer/scrape', scrapeProfile)

// Dynamic content analysis routes (new)
router.post('/content/analyze', analyzeInfluencer)
router.get('/content/results/:requestId', getAnalysisResults)

// Content generation routes
router.post('/generate/scripts', generateScripts)
router.post('/generate/hooks', generateHooks)

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats)
router.get('/dashboard/pipeline', getAgentPipelineStatus)

// Analytics routes
router.get('/analytics', getAnalytics)

export default router
