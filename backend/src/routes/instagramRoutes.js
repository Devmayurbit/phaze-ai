import { Router } from 'express'
const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Instagram service ready' })
})

export default router
