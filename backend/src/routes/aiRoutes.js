import { Router } from 'express'
import { generateContent, analyzeProfile, getHistory, getAIStats } from '../controllers/aiController.js'
import { authenticate } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validator.js'
import { aiLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// All AI routes require authentication
router.use(authenticate)
router.use(aiLimiter)

router.post('/generate', validate(schemas.generateContent), generateContent)
router.post('/analyze-profile', validate(schemas.analyzeProfile), analyzeProfile)
router.get('/history', getHistory)
router.get('/stats', getAIStats)

export default router
