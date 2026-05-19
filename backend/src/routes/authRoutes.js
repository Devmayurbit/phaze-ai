import { Router } from 'express'
import { register, login, refreshToken, getMe } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validator.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/register', authLimiter, validate(schemas.register), register)
router.post('/login', authLimiter, validate(schemas.login), login)
router.post('/refresh', refreshToken)
router.get('/me', authenticate, getMe)

export default router
