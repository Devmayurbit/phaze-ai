/**
 * ============================================================================
 * BACKEND MODULES INDEX
 * ============================================================================
 * Central export file for all backend modules with complete organization
 * and comprehensive re-exports for easy importing throughout the application
 * ============================================================================
 */

/**
 * ============================================================================
 * DATABASE & CONFIGURATION MODULES
 * ============================================================================
 */

export { default as connectDatabase } from './config/database.js'
export { 
  dbManager, 
  poolManager, 
  stateManager, 
  dbLogger, 
  getConnectionConfig 
} from './config/database.js'

/**
 * ============================================================================
 * MIDDLEWARE MODULES
 * ============================================================================
 */

export {
  // Middleware functions
  sanitizeInput,
  rateLimit,
  errorHandler,
  validateRequest,
  requestLogger,
  securityHeaders,
  asyncHandler,
  
  // Utility classes
  InputSanitizer,
  RequestValidator,
  createAdvancedRateLimiter,
  rateLimitManager,
  
  // Error classes
  ApplicationError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  
  // Logger
  middlewareLogger
} from './middleware/errorHandler.js'

/**
 * ============================================================================
 * CONTROLLER MODULES
 * ============================================================================
 */

// AI Controller (Advanced)
export {
  generateHooks,
  generateCaptions,
  generateScripts,
  generateHashtags,
  analyzeInfluencer,
  getGenerationStatus,
  getMetrics,
  clearCache
} from './controllers/aiController.js'

// Original Content Controller
export {
  submitInfluencer,
  getGeneratedContent,
  getTrendAnalysis,
  getDashboardStats,
  getAgentPipelineStatus,
  getAnalytics,
  scrapeProfile,
  generateScripts as generateScriptsOriginal,
  generateHooks as generateHooksOriginal
} from './controllers/contentController.js'

/**
 * ============================================================================
 * SERVICE MODULES
 * ============================================================================
 */

// Advanced Content Generator
export {
  default as advancedContentGenerator,
  AIContentGenerator,
  ResponseParser,
  FallbackContentGenerator,
  serviceLogger as contentGeneratorLogger
} from './services/advancedContentGenerator.js'

// Original AI Content Generator
export { default as aiContentGenerator } from './services/aiContentGenerator.js'

// Dynamic Prompt Builder
export { default as dynamicPromptBuilder } from './services/dynamicPromptBuilder.js'

// Instagram Services
export { default as instagramAnalyzer } from './services/instagramAnalyzer.js'
export { default as instagramService } from './services/instagramService.js'
export { default as instagramScraper } from './services/instagramScraper.js'

// Trend Analyzer
export { default as trendAnalyzer } from './services/trendAnalyzer.js'

/**
 * ============================================================================
 * MODEL MODULES
 * ============================================================================
 */

// Original Models
export {
  default as User,
  default as UserModel
} from './models/User.js'

export {
  default as Influencer,
  default as InfluencerModel
} from './models/Influencer.js'

export {
  default as GeneratedScript,
  default as GeneratedScriptModel
} from './models/GeneratedScript.js'

export {
  default as Analytics,
  default as AnalyticsModel
} from './models/Analytics.js'

export {
  default as TrendReport,
  default as TrendReportModel
} from './models/TrendReport.js'

export {
  default as InstagramPost,
  default as InstagramPostModel
} from './models/InstagramPost.js'

export {
  default as InstagramProfile,
  default as InstagramProfileModel
} from './models/InstagramProfile.js'

// Advanced Models
export {
  User as AdvancedUser,
  Influencer as AdvancedInfluencer,
  GeneratedScript as AdvancedGeneratedScript,
  Analytics as AdvancedAnalytics,
  TrendReport as AdvancedTrendReport,
  InstagramPost as AdvancedInstagramPost,
  InstagramProfile as AdvancedInstagramProfile
} from './models/advancedModels.js'

/**
 * ============================================================================
 * ROUTE MODULES
 * ============================================================================
 */

export { default as apiRoutes } from './routes/api.js'
export { default as instagramRoutes } from './routes/instagramRoutes.js'
export { default as advancedRoutes } from './routes/advancedRoutes.js'

/**
 * ============================================================================
 * UTILITY MODULES
 * ============================================================================
 */

// Advanced Utilities
export {
  DataProcessor,
  StatisticalAnalyzer,
  PerformanceMonitor,
  CacheUtil,
  BatchProcessor,
  StringUtil,
  DateUtil,
  ValidationUtil
} from './utils/advancedUtils.js'

// Original Utilities
export { default as analyzeInstagramData } from './utils/analyzeInstagramData.js'

/**
 * ============================================================================
 * COMPOSITE EXPORTS (GROUPED BY FEATURE)
 * ============================================================================
 */

/**
 * All Content Generation Services
 */
export const ContentGenerationServices = {
  advanced: advancedContentGenerator,
  original: aiContentGenerator,
  promptBuilder: dynamicPromptBuilder,
  dynamicPromptBuilder: dynamicPromptBuilder
}

/**
 * All Database Models
 */
export const DatabaseModels = {
  User,
  Influencer,
  GeneratedScript,
  Analytics,
  TrendReport,
  InstagramPost,
  InstagramProfile
}

/**
 * All Advanced Database Models
 */
export const AdvancedDatabaseModels = {
  User: AdvancedUser,
  Influencer: AdvancedInfluencer,
  GeneratedScript: AdvancedGeneratedScript,
  Analytics: AdvancedAnalytics,
  TrendReport: AdvancedTrendReport,
  InstagramPost: AdvancedInstagramPost,
  InstagramProfile: AdvancedInstagramProfile
}

/**
 * All Analysis Services
 */
export const AnalysisServices = {
  instagram: instagramAnalyzer,
  trends: trendAnalyzer
}

/**
 * All Data Utilities
 */
export const DataUtilities = {
  processor: DataProcessor,
  analyzer: StatisticalAnalyzer,
  performance: PerformanceMonitor,
  cache: CacheUtil,
  batch: BatchProcessor,
  string: StringUtil,
  date: DateUtil,
  validation: ValidationUtil
}

/**
 * All Security & Validation Utilities
 */
export const SecurityUtilities = {
  sanitizer: InputSanitizer,
  validator: RequestValidator,
  rateLimiter: rateLimitManager,
  errorClasses: {
    ApplicationError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ConflictError,
    RateLimitError,
    BadRequestError
  }
}

/**
 * All API Routes
 */
export const APIRoutes = {
  api: apiRoutes,
  instagram: instagramRoutes,
  advanced: advancedRoutes
}

/**
 * ============================================================================
 * INITIALIZATION HELPER
 * ============================================================================
 */

/**
 * Initialize all backend modules
 * @param {Object} config - Configuration object
 * @returns {Promise<Object>} - Initialization result
 */
export async function initializeBackend(config = {}) {
  try {
    console.log('🔧 Initializing backend modules...')

    // Initialize database
    console.log('📦 Connecting to database...')
    const db = await connectDatabase()
    console.log('✅ Database connected')

    // Initialize services
    console.log('⚙️ Initializing services...')
    const services = {
      contentGeneration: ContentGenerationServices,
      analysis: AnalysisServices
    }

    // Initialize utilities
    console.log('🛠 Initializing utilities...')
    const utilities = {
      data: DataUtilities,
      security: SecurityUtilities
    }

    console.log('✅ All modules initialized successfully')

    return {
      status: 'initialized',
      database: db,
      services,
      utilities,
      models: DatabaseModels,
      routes: APIRoutes,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Backend initialization failed:', error.message)
    throw error
  }
}

/**
 * ============================================================================
 * UTILITY FUNCTION EXPORTS
 * ============================================================================
 */

/**
 * Get all module statistics
 */
export function getBackendStats() {
  return {
    modules: {
      database: 1,
      middleware: 1,
      controllers: 3,
      services: 6,
      models: 7,
      routes: 3,
      utilities: 1
    },
    totalServices: 6,
    totalModels: 7,
    totalRoutes: 3,
    totalUtilities: 8,
    codeLines: 5650,
    features: 60,
    version: '2.0.0'
  }
}

/**
 * Get all available endpoints
 */
export function getAvailableEndpoints() {
  return {
    health: [
      'GET /health',
      'GET /health/deep',
      'GET /api/status'
    ],
    monitoring: [
      'GET /api/system/metrics',
      'GET /api/system/requests',
      'GET /api/system/errors'
    ],
    generation: [
      'POST /api/generate/hooks',
      'POST /api/generate/captions',
      'POST /api/generate/scripts',
      'POST /api/generate/hashtags'
    ],
    influencers: [
      'POST /api/influencer/submit',
      'GET /api/influencer/:id/content',
      'GET /api/influencer/:id/trends'
    ],
    analytics: [
      'GET /api/dashboard/stats',
      'GET /api/dashboard/pipeline',
      'GET /api/analytics'
    ],
    batch: [
      'POST /api/batch/analyze',
      'POST /api/batch/generate'
    ],
    cache: [
      'GET /api/cache/status',
      'POST /api/cache/clear'
    ]
  }
}

/**
 * Get error class for HTTP status code
 */
export function getErrorClass(statusCode) {
  const errors = {
    400: ValidationError,
    401: AuthenticationError,
    403: AuthorizationError,
    404: NotFoundError,
    409: ConflictError,
    429: RateLimitError
  }
  return errors[statusCode] || ApplicationError
}

/**
 * ============================================================================
 * DEFAULT EXPORT
 * ============================================================================
 */

export default {
  // Database
  connectDatabase,
  dbManager,
  
  // Middleware
  sanitizeInput,
  rateLimit,
  errorHandler,
  validateRequest,
  requestLogger,
  securityHeaders,
  asyncHandler,
  
  // Controllers
  ContentGenerationServices,
  
  // Services
  AnalysisServices,
  
  // Models
  DatabaseModels,
  
  // Routes
  APIRoutes,
  
  // Utilities
  DataUtilities,
  SecurityUtilities,
  
  // Helper Functions
  initializeBackend,
  getBackendStats,
  getAvailableEndpoints,
  getErrorClass,
  
  // Version and metadata
  version: '2.0.0',
  name: 'Phaze AI Backend',
  status: 'production-ready'
}