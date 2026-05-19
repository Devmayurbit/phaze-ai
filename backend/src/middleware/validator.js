import Joi from 'joi'
import { ValidationError } from './errorHandler.js'

/**
 * Validation middleware factory
 * Usage: validate(schema) where schema = { body, query, params }
 */
export function validate(schema) {
  return (req, res, next) => {
    const errors = []

    for (const [key, joiSchema] of Object.entries(schema)) {
      const { error } = joiSchema.validate(req[key], { abortEarly: false })
      if (error) {
        errors.push(...error.details.map(d => d.message))
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '))
    }

    next()
  }
}

// ─── Common Schemas ─────────────────────────────

export const schemas = {
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      username: Joi.string().min(3).max(30).required(),
      name: Joi.string().max(100).optional()
    })
  },

  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },

  generateContent: {
    body: Joi.object({
      topic: Joi.string().min(2).max(500).required(),
      contentType: Joi.string().valid('hooks', 'captions', 'hashtags', 'script').required(),
      niche: Joi.string().max(100).optional(),
      platform: Joi.string().valid('instagram').default('instagram'),
      count: Joi.number().min(1).max(20).default(5),
      duration: Joi.number().valid(15, 30, 45, 60).optional()
    })
  },

  analyzeProfile: {
    body: Joi.object({
      instagramUrl: Joi.string().required()
    })
  }
}
