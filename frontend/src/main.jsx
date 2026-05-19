/**
 * ============================================================================
 * FRONTEND ENTRY POINT
 * ============================================================================
 * Main application entry point with comprehensive initialization,
 * error handling, performance monitoring, and provider setup
 * ============================================================================
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

/**
 * ============================================================================
 * PERFORMANCE MONITORING
 * ============================================================================
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.startTime = performance.now()
  }

  mark(name) {
    performance.mark(name)
  }

  measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name)[0]
      this.metrics[name] = measure.duration
      console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`)
      return measure.duration
    } catch (error) {
      console.warn(`Performance measure failed: ${name}`, error)
    }
  }

  getTTFB() {
    const nav = performance.getEntriesByType('navigation')[0]
    return nav ? nav.responseEnd : 0
  }

  getFCP() {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]
    return fcp ? fcp.startTime : 0
  }

  getLCP() {
    const entries = performance.getEntriesByType('largest-contentful-paint')
    return entries.length > 0 ? entries[entries.length - 1].startTime : 0
  }

  getCLS() {
    let clsValue = 0
    const entries = performance.getEntriesByType('layout-shift')
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    return clsValue
  }

  getMetrics() {
    return {
      ttfb: this.getTTFB(),
      fcp: this.getFCP(),
      lcp: this.getLCP(),
      cls: this.getCLS(),
      appLoadTime: performance.now() - this.startTime,
      customMetrics: this.metrics
    }
  }

  logMetrics() {
    const metrics = this.getMetrics()
    console.group('📊 Performance Metrics')
    console.log('TTFB:', `${metrics.ttfb.toFixed(2)}ms`)
    console.log('FCP:', `${metrics.fcp.toFixed(2)}ms`)
    console.log('LCP:', `${metrics.lcp.toFixed(2)}ms`)
    console.log('CLS:', metrics.cls.toFixed(4))
    console.log('App Load Time:', `${metrics.appLoadTime.toFixed(2)}ms`)
    console.groupEnd()
    return metrics
  }
}

/**
 * ============================================================================
 * GLOBAL ERROR HANDLING
 * ============================================================================
 */

class ErrorHandler {
  constructor() {
    this.errors = []
    this.setupErrorListeners()
  }

  setupErrorListeners() {
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'uncaughtError',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'unhandledRejection',
        reason: event.reason,
        promise: event.promise
      })
    })

    window.addEventListener('offline', () => {
      console.warn('⚠️ Application went offline')
      this.showOfflineNotification()
    })

    window.addEventListener('online', () => {
      console.log('✅ Application is back online')
      this.showOnlineNotification()
    })
  }

  handleError(errorData) {
    console.error('🔴 Error caught:', errorData)
    this.errors.push({
      ...errorData,
      timestamp: new Date().toISOString()
    })
    this.reportError(errorData)
  }

  reportError(errorData) {
    try {
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/errors/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData)
        }).catch(err => console.warn('Failed to report error:', err))
      }
    } catch (error) {
      console.warn('Error reporting failed:', error)
    }
  }

  showOfflineNotification() {
    const notification = document.createElement('div')
    notification.className = 'offline-notification'
    notification.textContent = '⚠️ You are offline. Some features may not work.'
    notification.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0;
      background: #ff6b6b; color: white; padding: 12px;
      text-align: center; z-index: 10000; font-weight: bold;
    `
    document.body.appendChild(notification)
  }

  showOnlineNotification() {
    const notification = document.createElement('div')
    notification.className = 'online-notification'
    notification.textContent = '✅ You are back online.'
    notification.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0;
      background: #51cf66; color: white; padding: 12px;
      text-align: center; z-index: 10000; font-weight: bold;
    `
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  getErrors() { return this.errors }
  clearErrors() { this.errors = [] }
}

/**
 * ============================================================================
 * APPLICATION LOGGER
 * ============================================================================
 */

class ApplicationLogger {
  constructor() {
    this.logs = []
    this.maxLogs = 1000
  }

  log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    this.logs.push(logEntry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    const styles = this.getLogStyles(level)
    console.log(`%c${level}`, styles, message, data)
  }

  getLogStyles(level) {
    const styles = {
      info: 'color: #0066cc; font-weight: bold;',
      warn: 'color: #ff8800; font-weight: bold;',
      error: 'color: #ff0000; font-weight: bold;',
      debug: 'color: #666666; font-weight: bold;',
      success: 'color: #00aa00; font-weight: bold;'
    }
    return styles[level] || styles.info
  }

  info(message, data) { this.log('INFO', message, data) }
  warn(message, data) { this.log('WARN', message, data) }
  error(message, data) { this.log('ERROR', message, data) }
  debug(message, data) { this.log('DEBUG', message, data) }
  success(message, data) { this.log('SUCCESS', message, data) }

  getLogs() { return this.logs }
  exportLogs() { return JSON.stringify(this.logs, null, 2) }

  downloadLogs() {
    const dataStr = this.exportLogs()
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `logs-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }
}

/**
 * ============================================================================
 * FEATURE FLAGS & CONFIGURATION
 * ============================================================================
 */

class FeatureFlags {
  constructor() {
    this.flags = {
      enableAnalytics: true,
      enableOfflineMode: true,
      enableAdvancedFilters: true,
      enableBatchOperations: true,
      enableAIGeneration: true,
      enableTrendAnalysis: true,
      enableInstagramIntegration: true,
      enableDataExport: true,
      enableRealTimeUpdates: true,
      enableDarkMode: true,
      enableAdvancedCaching: true,
      enablePerformanceMonitoring: true,
      enableErrorReporting: true,
      enableAutoSave: true,
      enableCriticalAlerts: true
    }
  }

  isEnabled(flag) { return this.flags[flag] ?? false }
  enable(flag) { this.flags[flag] = true }
  disable(flag) { this.flags[flag] = false }
  getAll() { return { ...this.flags } }
  loadFromServer(flags) { this.flags = { ...this.flags, ...flags } }
}

/**
 * ============================================================================
 * GLOBAL STATE INITIALIZATION
 * ============================================================================
 */

class GlobalState {
  constructor() {
    this.performance = new PerformanceMonitor()
    this.errorHandler = new ErrorHandler()
    this.logger = new ApplicationLogger()
    this.featureFlags = new FeatureFlags()
    this.initialized = false
  }

  async initialize() {
    try {
      this.logger.info('🚀 Initializing application...')
      this.performance.mark('app-init-start')
      await this.loadFeatureFlags()
      if (this.featureFlags.isEnabled('enableOfflineMode')) {
        await this.registerServiceWorker()
      }
      await this.loadUserPreferences()
      if (this.featureFlags.isEnabled('enableAnalytics')) {
        this.setupAnalytics()
      }
      this.performance.mark('app-init-end')
      this.performance.measure('app-initialization', 'app-init-start', 'app-init-end')
      this.initialized = true
      this.logger.success('✅ Application initialized successfully')
      return true
    } catch (error) {
      this.logger.error('❌ Application initialization failed', error)
      throw error
    }
  }

  async loadFeatureFlags() {
    try {
      const response = await fetch('/api/config/flags')
      if (response.ok) {
        const flags = await response.json()
        this.featureFlags.loadFromServer(flags)
        this.logger.info('📋 Feature flags loaded')
      }
    } catch (error) {
      this.logger.warn('⚠️ Could not load feature flags', error)
    }
  }

  async loadUserPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      this.logger.warn('⚠️ Could not load user preferences', error)
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        this.logger.info('✅ Service Worker registered')
        return registration
      } catch (error) {
        this.logger.warn('⚠️ Service Worker registration failed', error)
      }
    }
  }

  setupAnalytics() {
    window.addEventListener('beforeunload', () => {
      const metrics = this.performance.getMetrics()
      navigator.sendBeacon('/api/analytics/metrics', JSON.stringify(metrics))
    })
    this.logger.info('📊 Analytics setup complete')
  }

  getStatus() {
    return {
      initialized: this.initialized,
      performance: this.performance.getMetrics(),
      featureFlags: this.featureFlags.getAll(),
      errors: this.errorHandler.getErrors().length,
      logs: this.logger.getLogs().length
    }
  }
}

/**
 * ============================================================================
 * GLOBAL STATE INSTANCE
 * ============================================================================
 */

const globalState = new GlobalState()
window.__PHAZE_STATE__ = globalState
window.__PHAZE_METRICS__ = () => globalState.performance.logMetrics()
window.__PHAZE_LOGS__ = () => globalState.logger.getLogs()
window.__PHAZE_ERRORS__ = () => globalState.errorHandler.getErrors()

/**
 * ============================================================================
 * APPLICATION STARTUP
 * ============================================================================
 */

async function startApplication() {
  try {
    await globalState.initialize()
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('✅ React application mounted successfully')
  } catch (error) {
    console.error('❌ Failed to start application:', error)
    document.body.innerHTML = `
      <div style="
        display: flex; align-items: center; justify-content: center;
        height: 100vh; background: #f5f5f5; font-family: system-ui;
      ">
        <div style="
          text-align: center; background: white; padding: 40px;
          border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h1 style="color: #ff0000; margin: 0 0 10px;">❌ Application Error</h1>
          <p style="color: #666; margin: 0;">Failed to initialize the application.</p>
          <p style="color: #999; font-size: 12px; margin-top: 10px;">${error.message}</p>
          <button onclick="location.reload()" style="
            margin-top: 20px; padding: 10px 20px; background: #007bff;
            color: white; border: none; border-radius: 4px;
            cursor: pointer; font-size: 14px;
          ">Reload Application</button>
        </div>
      </div>
    `
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApplication)
} else {
  startApplication()
}

window.addEventListener('beforeunload', () => {
  try {
    const state = globalState.getStatus()
    sessionStorage.setItem('appState', JSON.stringify(state))
  } catch (error) {
    console.warn('Could not save state on unload:', error)
  }
})

export { PerformanceMonitor, ErrorHandler, ApplicationLogger, FeatureFlags, GlobalState, globalState }
