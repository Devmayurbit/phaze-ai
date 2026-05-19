/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT
 * ============================================================================
 * Central React application with routing, error boundaries, lazy loading,
 * and comprehensive state management
 * ============================================================================
 */

import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'

// Lazy load pages for performance
const ModernLanding = lazy(() => import('./pages/ModernLanding'))
const ModernDashboard = lazy(() => import('./pages/ModernDashboard'))
const Settings = lazy(() => import('./pages/Settings'))
const TrendAnalysis = lazy(() => import('./pages/TrendAnalysis'))
const InfluencerProfiles = lazy(() => import('./pages/InfluencerProfiles'))
const AgentPipeline = lazy(() => import('./pages/AgentPipeline'))
const GeneratedScripts = lazy(() => import('./pages/GeneratedScripts'))

/**
 * ERROR BOUNDARY COMPONENT
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔴 Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // Report to error tracking service
    if (window.__PHAZE_STATE__?.errorHandler) {
      window.__PHAZE_STATE__.errorHandler.handleError({
        type: 'errorBoundary',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'system-ui'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#ff0000', margin: '0 0 10px' }}>❌ Something Went Wrong</h1>
            <p style={{ color: '#666', margin: '0 0 20px' }}>
              We encountered an error while rendering the application. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details style={{ textAlign: 'left', background: '#f5f5f5', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>Error Details</summary>
                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px', color: '#666' }}>
                  {this.state.error.toString()}{'\n\n'}{this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                marginRight: '10px'
              }}
            >
              🔄 Reload Application
            </button>
            <button
              onClick={() => window.history.back()}
              style={{
                padding: '12px 24px',
                background: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              ← Go Back
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * LOADING FALLBACK COMPONENT
 */

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          margin: '0 auto 20px',
          background: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>⏳ Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

/**
 * PAGE TRANSITION ANIMATIONS
 */

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

/**
 * ROUTE CONFIGURATION
 */

const routes = [
  { path: '/', component: ModernLanding, name: 'Landing' },
  { path: '/dashboard', component: ModernDashboard, name: 'Dashboard' },
  { path: '/settings', component: Settings, name: 'Settings' },
  { path: '/trends', component: TrendAnalysis, name: 'Trends' },
  { path: '/profiles', component: InfluencerProfiles, name: 'Profiles' },
  { path: '/pipeline', component: AgentPipeline, name: 'Pipeline' },
  { path: '/scripts', component: GeneratedScripts, name: 'Scripts' }
]

/**
 * APP ROUTES COMPONENT
 */

function AppRoutes() {
  const location = useLocation()
  const [previousLocation, setPreviousLocation] = useState(location)

  useEffect(() => {
    if (location !== previousLocation) {
      window.scrollTo(0, 0)
      setPreviousLocation(location)
    }
  }, [location, previousLocation])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * 404 NOT FOUND PAGE
 */

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '120px', margin: 0 }}>404</h1>
        <h2 style={{ fontSize: '32px', margin: '10px 0' }}>Page Not Found</h2>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>The page you're looking for doesn't exist.</p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

/**
 * PERFORMANCE MONITORING COMPONENT
 */

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    if (window.__PHAZE_STATE__?.featureFlags?.isEnabled('enablePerformanceMonitoring')) {
      const timer = setInterval(() => {
        const newMetrics = window.__PHAZE_STATE__.performance.getMetrics()
        setMetrics(newMetrics)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [])

  if (!metrics || process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxWidth: '250px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>📊 Performance Metrics</div>
      <div>FCP: {metrics.fcp.toFixed(2)}ms</div>
      <div>LCP: {metrics.lcp.toFixed(2)}ms</div>
      <div>CLS: {metrics.cls.toFixed(4)}</div>
      <div>Load Time: {metrics.appLoadTime.toFixed(2)}ms</div>
    </div>
  )
}

/**
 * MAIN APP COMPONENT
 */

export default function App() {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    // Wait for global state to initialize
    if (window.__PHAZE_STATE__?.initialized) {
      setAppReady(true)
    } else {
      const checkInterval = setInterval(() => {
        if (window.__PHAZE_STATE__?.initialized) {
          setAppReady(true)
          clearInterval(checkInterval)
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [])

  if (!appReady) {
    return <LoadingFallback />
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
          <PerformanceMonitor />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}
