/**
 * JWT Authentication Middleware
 */

import jwt from 'jsonwebtoken'
import { AuthError } from './errorHandler.js'

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AuthError('Token expired')
    }
    throw new AuthError('Invalid token')
  }
}

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return next()

  try {
    const token = authHeader.split(' ')[1]
    req.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    // Token invalid — continue without auth
  }
  next()
}
