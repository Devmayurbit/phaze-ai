import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-neon-purple opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-neon-blue opacity-20 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-block px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 backdrop-blur-md">
            <p className="text-sm font-medium text-neon-purple">
              ✨ The Future of Content Creation
            </p>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
        >
          Turn Influencer Data Into Viral Content Automatically
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Phaze AI uses autonomous AI agents to analyze trends, generate scripts, create hooks, and
          optimize creator growth—all in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-glow text-white font-semibold px-8 py-4 rounded-lg transition-all"
          >
            Start Generating
          </button>
          <button className="px-8 py-4 rounded-lg font-semibold border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 transition-all">
            View Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div>
            <p className="text-3xl font-bold text-neon-purple">500K+</p>
            <p className="text-sm text-slate-400 mt-2">Scripts Generated</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-neon-blue">98%</p>
            <p className="text-sm text-slate-400 mt-2">Success Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-neon-pink">2M+</p>
            <p className="text-sm text-slate-400 mt-2">Creators Using</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
