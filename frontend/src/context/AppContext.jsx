/**
 * ============================================================================
 * ENHANCED APP CONTEXT & STATE MANAGEMENT
 * ============================================================================
 * Comprehensive React Context with advanced state management,
 * async operations, caching, and analytics
 * ============================================================================
 */

import { createContext, useContext, useState, useCallback, useRef, useEffect, useReducer } from 'react'
import { apiClient, contentGenerationService, analyticsService, influencerService, healthService } from '../services/apiClient.js'

const AppContext = createContext()

/**
 * ACTION TYPES
 */
const ACTIONS = {
  SET_INFLUENCER: 'SET_INFLUENCER',
  SET_CONTENT: 'SET_CONTENT',
  SET_STATUS: 'SET_STATUS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_ANALYTICS: 'SET_ANALYTICS',
  SET_TRENDS: 'SET_TRENDS',
  CLEAR_DATA: 'CLEAR_DATA',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_USER: 'SET_USER',
  SET_PREFERENCES: 'SET_PREFERENCES'
}

/**
 * INITIAL STATE
 */
const initialState = {
  user: null,
  currentInfluencer: null,
  generatedContent: null,
  processingStatus: 'idle',
  isLoading: false,
  error: null,
  analysisData: null,
  trends: null,
  notifications: [],
  preferences: { theme: 'light', language: 'en', notifications: true, autoSave: true, cache: true },
  history: []
}

/**
 * STATE REDUCER
 */
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_INFLUENCER:
      return { ...state, currentInfluencer: action.payload, history: [...state.history.slice(-9), action.payload] }
    case ACTIONS.SET_CONTENT:
      return { ...state, generatedContent: action.payload }
    case ACTIONS.SET_STATUS:
      return { ...state, processingStatus: action.payload }
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_ANALYTICS:
      return { ...state, analysisData: action.payload }
    case ACTIONS.SET_TRENDS:
      return { ...state, trends: action.payload }
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload }
    case ACTIONS.SET_PREFERENCES:
      return { ...state, preferences: { ...state.preferences, ...action.payload } }
    case ACTIONS.ADD_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, action.payload] }
    case ACTIONS.REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) }
    case ACTIONS.CLEAR_DATA:
      return { ...state, currentInfluencer: null, generatedContent: null, analysisData: null, processingStatus: 'idle', error: null }
    default:
      return state
  }
}

/**
 * APP PROVIDER COMPONENT
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const analyticsIntervalRef = useRef(null)

  /**
   * NOTIFICATION MANAGEMENT
   */
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now()
    dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: { id, message, type, timestamp: new Date() } })
    if (duration > 0) {
      setTimeout(() => dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id }), duration)
    }
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id })
  }, [])

  /**
   * INFLUENCER SUBMISSION
   */
  const submitInfluencer = useCallback(async (url, niche) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })
    dispatch({ type: ACTIONS.SET_STATUS, payload: 'analyzing' })

    try {
      const response = await influencerService.submitInfluencer(url, niche)
      const requestId = response.id
      addNotification('✅ Influencer submitted for analysis', 'success')
      await pollForResults(requestId)
    } catch (err) {
      const errorMessage = err.message || 'Failed to submit influencer'
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage })
      dispatch({ type: ACTIONS.SET_STATUS, payload: 'idle' })
      addNotification(`❌ ${errorMessage}`, 'error')
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [addNotification])

  /**
   * POLL FOR RESULTS
   */
  const pollForResults = useCallback(async (requestId, maxAttempts = 120) => {
    let attempts = 0
    const poll = async () => {
      if (attempts >= maxAttempts) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Request timeout' })
        dispatch({ type: ACTIONS.SET_STATUS, payload: 'idle' })
        addNotification('⏱️ Request timed out', 'warn')
        return
      }
      attempts++
      try {
        const contentData = await influencerService.getInfluencerContent(requestId)
        if (contentData.status === 'completed') {
          dispatch({ type: ACTIONS.SET_INFLUENCER, payload: { username: contentData.username, niche: contentData.niche, profileData: contentData.influencer, analysis: contentData.analysis } })
          dispatch({ type: ACTIONS.SET_CONTENT, payload: { hooks: contentData.content?.hooks || [], captions: contentData.content?.captions || [], scripts: contentData.content?.scripts || [], hashtags: contentData.content?.hashtags || [], trends: contentData.trends || [] } })
          dispatch({ type: ACTIONS.SET_ANALYTICS, payload: contentData.analysis })
          dispatch({ type: ACTIONS.SET_STATUS, payload: 'complete' })
          addNotification('🎉 Analysis complete!', 'success')
        } else if (contentData.status === 'failed') {
          throw new Error(contentData.error || 'Processing failed')
        } else {
          setTimeout(poll, 2000)
        }
      } catch (pollError) {
        if (attempts >= maxAttempts) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: pollError.message })
          dispatch({ type: ACTIONS.SET_STATUS, payload: 'idle' })
          addNotification(`❌ ${pollError.message}`, 'error')
        } else {
          setTimeout(poll, 2000)
        }
      }
    }
    await poll()
  }, [addNotification])

  /**
   * GENERATE CONTENT
   */
  const generateContent = useCallback(async (type, profileData, options = {}) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })
    try {
      let result
      switch (type) {
        case 'hooks':
          result = await contentGenerationService.generateHooks(profileData, options)
          break
        case 'captions':
          result = await contentGenerationService.generateCaptions(profileData, options)
          break
        case 'scripts':
          result = await contentGenerationService.generateScripts(profileData, options)
          break
        case 'hashtags':
          result = await contentGenerationService.generateHashtags(profileData, options)
          break
        default:
          throw new Error(`Unknown content type: ${type}`)
      }
      dispatch({ type: ACTIONS.SET_CONTENT, payload: { ...state.generatedContent, [type]: result.content } })
      addNotification(`✅ ${type} generated successfully`, 'success')
      return result
    } catch (err) {
      const errorMessage = err.message || `Failed to generate ${type}`
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage })
      addNotification(`❌ ${errorMessage}`, 'error')
      throw err
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [state.generatedContent, addNotification])

  /**
   * FETCH ANALYTICS
   */
  const fetchAnalytics = useCallback(async () => {
    try {
      const metrics = await analyticsService.getMetrics()
      dispatch({ type: ACTIONS.SET_ANALYTICS, payload: metrics })
      return metrics
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      addNotification('⚠️ Could not fetch analytics', 'warn')
    }
  }, [addNotification])

  /**
   * FETCH TRENDS
   */
  const fetchTrends = useCallback(async (niche) => {
    try {
      const trends = await analyticsService.getTrendAnalysis(niche)
      dispatch({ type: ACTIONS.SET_TRENDS, payload: trends })
      return trends
    } catch (err) {
      console.error('Failed to fetch trends:', err)
      addNotification('⚠️ Could not fetch trends', 'warn')
    }
  }, [addNotification])

  /**
   * CLEAR DATA
   */
  const clearData = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_DATA })
    addNotification('🗑️ Data cleared', 'info')
  }, [addNotification])

  /**
   * SAVE PREFERENCES
   */
  const savePreferences = useCallback((preferences) => {
    dispatch({ type: ACTIONS.SET_PREFERENCES, payload: preferences })
    try {
      localStorage.setItem('appPreferences', JSON.stringify(preferences))
      addNotification('✅ Preferences saved', 'success')
    } catch (err) {
      addNotification('⚠️ Could not save preferences', 'warn')
    }
  }, [addNotification])

  /**
   * LOAD PREFERENCES
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('appPreferences')
      if (saved) {
        const preferences = JSON.parse(saved)
        dispatch({ type: ACTIONS.SET_PREFERENCES, payload: preferences })
      }
    } catch (err) {
      console.warn('Could not load preferences:', err)
    }
  }, [])

  /**
   * PERIODIC ANALYTICS SYNC
   */
  useEffect(() => {
    if (state.preferences.cache) {
      analyticsIntervalRef.current = setInterval(() => {
        fetchAnalytics()
      }, 60000)
      return () => clearInterval(analyticsIntervalRef.current)
    }
  }, [state.preferences.cache, fetchAnalytics])

  /**
   * HEALTH CHECK
   */
  const checkHealth = useCallback(async () => {
    try {
      const health = await healthService.checkHealth()
      return health
    } catch (err) {
      console.error('Health check failed:', err)
      addNotification('⚠️ Backend connection issues', 'warn')
      return null
    }
  }, [addNotification])

  /**
   * CACHE UTILITIES
   */
  const getCachedContent = useCallback((key) => {
    try {
      const cached = sessionStorage.getItem(`content_${key}`)
      return cached ? JSON.parse(cached) : null
    } catch (err) {
      console.warn('Cache retrieval failed:', err)
      return null
    }
  }, [])

  const setCachedContent = useCallback((key, content) => {
    try {
      sessionStorage.setItem(`content_${key}`, JSON.stringify(content))
    } catch (err) {
      console.warn('Cache storage failed:', err)
    }
  }, [])

  const value = {
    user: state.user,
    currentInfluencer: state.currentInfluencer,
    generatedContent: state.generatedContent,
    processingStatus: state.processingStatus,
    isLoading: state.isLoading,
    error: state.error,
    analysisData: state.analysisData,
    trends: state.trends,
    notifications: state.notifications,
    preferences: state.preferences,
    history: state.history,
    submitInfluencer,
    generateContent,
    fetchAnalytics,
    fetchTrends,
    clearData,
    checkHealth,
    savePreferences,
    getCachedContent,
    setCachedContent,
    addNotification,
    removeNotification,
    contentGenerationService,
    analyticsService,
    influencerService,
    healthService,
    apiClient
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * USE APP CONTEXT HOOK
 */
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const useApp = () => useAppContext()
export default AppContext
