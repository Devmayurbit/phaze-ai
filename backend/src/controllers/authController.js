import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { AppError, AuthError, ValidationError } from '../middleware/errorHandler.js'

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password, username, name } = req.body

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    throw new ValidationError(
      existingUser.email === email
        ? 'Email already registered'
        : 'Username already taken'
    )
  }

  // Create user
  const user = await User.create({ email, password, username, name })

  // Generate tokens
  const token = user.generateAuthToken()
  const refreshToken = user.generateRefreshToken()

  res.status(201).json({
    success: true,
    data: {
      user: user.toJSON(),
      token,
      refreshToken
    }
  })
})

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new AuthError('Invalid email or password')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new AuthError('Invalid email or password')

  // Update last login
  user.lastLoginAt = new Date()
  await user.save()

  const token = user.generateAuthToken()
  const refreshToken = user.generateRefreshToken()

  res.json({
    success: true,
    data: {
      user: user.toJSON(),
      token,
      refreshToken
    }
  })
})

/**
 * POST /api/auth/refresh
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: rt } = req.body
  if (!rt) throw new AuthError('Refresh token required')

  try {
    const decoded = jwt.verify(rt, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) throw new AuthError('User not found')

    const token = user.generateAuthToken()
    const newRefreshToken = user.generateRefreshToken()

    res.json({
      success: true,
      data: { token, refreshToken: newRefreshToken }
    })
  } catch {
    throw new AuthError('Invalid refresh token')
  }
})

/**
 * GET /api/auth/me
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new AuthError('User not found')

  const usage = user.checkUsageLimit()

  res.json({
    success: true,
    data: {
      user: user.toJSON(),
      usage
    }
  })
})
