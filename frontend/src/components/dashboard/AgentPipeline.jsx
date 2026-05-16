import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { mockPipelineAgents } from '../../mock/data'

export default function AgentPipeline() {
  const [agents, setAgents] = useState(mockPipelineAgents)

  useEffect(() => {
    // Simulate agent status updates
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent, index) => {
          if (index < 3) return agent
          return {
            ...agent,
            status: agent.status === 'processing' ? 'completed' : 'processing',
          }
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-hover p-8 rounded-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-8">Agent Pipeline Status</h2>

      <motion.div
        className="grid md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            variants={itemVariants}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              agent.status === 'processing'
                ? 'border-neon-purple bg-neon-purple/10 shadow-glow'
                : 'border-neon-blue/50 bg-neon-blue/5'
            }`}
          >
            {/* Processing animation */}
            {agent.status === 'processing' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-2 right-2 w-3 h-3"
              >
                <div className="w-3 h-3 rounded-full bg-neon-purple" />
              </motion.div>
            )}

            {/* Completed checkmark */}
            {agent.status === 'completed' && (
              <div className="absolute top-2 right-2 text-neon-blue text-xl">✓</div>
            )}

            <div className="text-3xl mb-4">{agent.icon}</div>
            <h3 className="font-bold text-white mb-2">{agent.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{agent.description}</p>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  agent.status === 'processing'
                    ? 'bg-neon-purple/20 text-neon-purple'
                    : 'bg-neon-blue/20 text-neon-blue'
                }`}
              >
                {agent.status === 'processing' ? '⚙️ Processing' : '✓ Complete'}
              </span>
            </div>

            {/* Connector arrow */}
            {index < agents.length - 1 && (
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-neon-purple opacity-50"
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div className="mt-8 p-4 bg-dark-700/50 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-400">Overall Progress</span>
          <span className="text-sm font-semibold text-neon-purple">75%</span>
        </div>
        <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
