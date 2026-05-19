/**
 * Environment validation — fail fast if missing required vars
 */

const REQUIRED_VARS = [
  'MONGODB_URI',
  'GEMINI_API_KEY',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
]

const OPTIONAL_VARS = [
  'OPENAI_API_KEY',
  'HUGGINGFACE_API_KEY',
  'RAPIDAPI_KEY',
  'PORT',
  'NODE_ENV',
  'FRONTEND_URL'
]

export function validateEnv() {
  const missing = REQUIRED_VARS.filter(v => !process.env[v])

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach(v => console.error(`   - ${v}`))
    console.error('\nCopy backend/.env.example to backend/.env and fill in values.')
    process.exit(1)
  }

  const available = OPTIONAL_VARS.filter(v => process.env[v])
  const unavailable = OPTIONAL_VARS.filter(v => !process.env[v])

  console.log('✅ Required env vars loaded')
  if (available.length) console.log(`   Optional available: ${available.join(', ')}`)
  if (unavailable.length) console.log(`   Optional missing: ${unavailable.join(', ')}`)
}
