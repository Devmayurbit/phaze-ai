import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GLASS, MOTION, COLORS } from '../../styles/designSystem'
import { AnimatedSpinner, AgentPulse } from './AnimationComponents'

/**
 * Futuristic Agent Pipeline Component
 * Shows AI processing flow with animated agents
 */
export const AgentPipeline = ({ isProcessing = false, agents = null }) => {
  const defaultAgents = [
    { id: 'scraper', name: 'Instagram Scraper', icon: '📸', status: 'pending' },
    { id: 'analyzer', name: 'Profile Analyzer', icon: '🔍', status: 'pending' },
    { id: 'generator', name: 'Content Generator', icon: '✨', status: 'pending' },
    { id: 'optimizer', name: 'Optimizer', icon: '⚡', status: 'pending' },
    { id: 'formatter', name: 'Formatter', icon: '📝', status: 'pending' },
  ]

  const [currentAgentIndex, setCurrentAgentIndex] = useState(0)
  const agentsList = agents || defaultAgents

  // Cycle through agents when processing
  useEffect(() => {
    if (!isProcessing) {
      setCurrentAgentIndex(0)
      return
    }

    const interval = setInterval(() => {
      setCurrentAgentIndex((prev) => (prev + 1) % agentsList.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isProcessing, agentsList.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${GLASS.premium} rounded-2xl p-8`}
    >
      {/* Title */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          {isProcessing ? (
            <>
              <AnimatedSpinner size="md" />
              Processing Your Content...
            </>
          ) : (
            <>
              <span>⚡</span>
              Agent Pipeline
            </>
          )}
        </h3>
        <p className="text-gray-400 text-sm">
          {isProcessing
            ? `Currently running: ${agentsList[currentAgentIndex]?.name}`
            : 'Ready to analyze and generate content'}
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {agentsList.map((agent, idx) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative ${GLASS.card} p-4 rounded-lg text-center group`}
          >
            {/* Agent Icon/Status */}
            <motion.div
              animate={
                isProcessing && idx <= currentAgentIndex
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(168, 85, 247, 0.3)',
                        '0 0 0 15px rgba(168, 85, 247, 0)',
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 group-hover:border-purple-500/70 transition-all"
            >
              {agent.icon}
            </motion.div>

            {/* Status Indicator */}
            <div className="mb-2">
              {isProcessing && idx <= currentAgentIndex ? (
                idx === currentAgentIndex ? (
                  <span className="inline-flex items-center gap-1 text-xs text-purple-400">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    Running
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Done
                  </span>
                )
              ) : (
                <span className="text-xs text-gray-500">Pending</span>
              )}
            </div>

            {/* Agent Name */}
            <p className="text-xs font-medium text-white truncate">{agent.name}</p>

            {/* Completion Bar */}
            {isProcessing && (
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    idx < currentAgentIndex
                      ? '100%'
                      : idx === currentAgentIndex
                        ? '65%'
                        : '0%',
                }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-bl-lg"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Processing Stats */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {currentAgentIndex + 1}/{agentsList.length}
            </p>
            <p className="text-xs text-gray-400">Agents Running</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-400">
              {Math.round(((currentAgentIndex + 1) / agentsList.length) * 100)}%
            </p>
            <p className="text-xs text-gray-400">Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {Math.floor((agentsList.length - currentAgentIndex - 1) * 3)}s
            </p>
            <p className="text-xs text-gray-400">Estimated Time</p>
          </div>
        </motion.div>
      )}

      {/* Completion Message */}
      {!isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
        >
          <p className="text-green-300 text-sm font-medium">✓ Ready for analysis</p>
        </motion.div>
      )}
    </motion.div>
  )
}

/**
 * Agent Card Component (Individual)
 */
export const AgentCard = ({ agent, isActive, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${GLASS.card} p-4 rounded-xl transition-all ${
        isActive ? 'ring-2 ring-purple-500' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.span
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          {agent.icon}
        </motion.span>
        <div>
          <p className="font-semibold text-white">{agent.name}</p>
          <p className={`text-xs ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
            {isActive ? 'Processing...' : agent.status}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: isActive ? '75%' : progress ? `${progress}%` : '0%' }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </motion.div>
  )
}

/**
 * Processing Overlay
 */
export const ProcessingOverlay = ({ isVisible = false, message = 'Processing...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
        className={`${GLASS.premium} rounded-2xl p-8 max-w-md w-full mx-4 text-center`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-3 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
        />
        <p className="text-white font-semibold mb-2">{message}</p>
        <p className="text-sm text-gray-400">This may take a moment...</p>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: ['0%', '85%'] }}
            transition={{ duration: 8 }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Step-by-step Pipeline Visualization
 */
export const PipelineSteps = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="relative">
      {/* Connecting Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent origin-left -z-10"
      />

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-1 flex flex-col items-center"
          >
            {/* Circle */}
            <motion.div
              animate={
                idx === currentStep
                  ? { scale: [1, 1.1, 1] }
                  : idx < currentStep
                    ? { scale: 1 }
                    : { scale: 0.8 }
              }
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                idx < currentStep
                  ? 'bg-green-500 text-white'
                  : idx === currentStep
                    ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                    : 'bg-gray-500 text-white'
              }`}
            >
              {idx < currentStep ? '✓' : idx + 1}
            </motion.div>

            {/* Label */}
            <p
              className={`text-xs font-medium text-center ${
                idx <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
            >
              {step}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default {
  AgentPipeline,
  AgentCard,
  ProcessingOverlay,
  PipelineSteps,
}
