import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import ModernLanding from './pages/ModernLanding'
import ModernDashboard from './pages/ModernDashboard'
import Settings from './pages/Settings'
import TrendAnalysis from './pages/TrendAnalysis'
import InfluencerProfiles from './pages/InfluencerProfiles'
import AgentPipeline from './pages/AgentPipeline'
import GeneratedScripts from './pages/GeneratedScripts'
import './App.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<ModernLanding />} />
          <Route path="/dashboard" element={<ModernDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/trends" element={<TrendAnalysis />} />
          <Route path="/profiles" element={<InfluencerProfiles />} />
          <Route path="/pipeline" element={<AgentPipeline />} />
          <Route path="/scripts" element={<GeneratedScripts />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}
