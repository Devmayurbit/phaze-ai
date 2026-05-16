import { motion } from 'framer-motion'
import { GLASS, MOTION } from '../../styles/designSystem'

/**
 * Skeleton Loader for Content Cards
 */
export const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`${GLASS.card} p-4 rounded-lg`}
        >
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-full" />
              <div className="h-3 bg-white/10 rounded w-5/6" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 h-8 bg-white/10 rounded" />
            <div className="w-8 h-8 bg-white/10 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Content Section Skeleton
 */
export const SkeletonContentSection = () => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
    className={`${GLASS.card} p-6 rounded-2xl`}
  >
    {/* Header */}
    <div className="flex gap-4 mb-6">
      <div className="w-10 h-10 rounded-lg bg-white/10" />
      <div className="flex-1">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-2" />
        <div className="h-4 bg-white/10 rounded w-1/4" />
      </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-white/10 rounded" />
          <div className="h-20 bg-white/10 rounded" />
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-white/10 rounded" />
            <div className="w-8 h-8 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)

/**
 * Dashboard Skeleton
 */
export const SkeletonDashboard = () => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          className={`${GLASS.card} p-4 rounded-lg h-20`}
        />
      ))}
    </div>

    {/* Content Sections */}
    <SkeletonContentSection />
    <SkeletonContentSection />
  </div>
)

/**
 * Shimmer Loading Effect
 */
export const ShimmerLoader = ({ width = 'w-full', height = 'h-4' }) => (
  <motion.div
    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    style={{
      backgroundImage:
        'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
      backgroundSize: '200% 100%',
    }}
    className={`${width} ${height} rounded bg-white/5`}
  />
)

/**
 * Animated Loading Spinner
 */
export const AnimatedSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-2 border-purple-500/30 border-t-purple-500 rounded-full`}
    />
  )
}

/**
 * Pulse Animation (for AI thinking states)
 */
export const PulseAnimation = ({ children, intensity = 'md' }) => {
  const intensities = {
    light: { opacity: [0.6, 1, 0.6] },
    md: { opacity: [0.5, 1, 0.5] },
    strong: { opacity: [0.3, 1, 0.3] },
  }

  return (
    <motion.div
      animate={intensities[intensity]}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Glowing Border Animation (for premium cards)
 */
export const GlowingBorder = ({ children, color = 'purple' }) => {
  const colors = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
  }

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px rgba(168, 85, 247, 0.3)`,
          `0 0 40px rgba(168, 85, 247, 0.5)`,
          `0 0 20px rgba(168, 85, 247, 0.3)`,
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className={`rounded-lg bg-gradient-to-r ${colors[color]} p-[1px]`}
    >
      <div className="bg-slate-950 rounded-lg">{children}</div>
    </motion.div>
  )
}

/**
 * Agent Pipeline Animation (For processing visualization)
 */
export const AgentPulse = ({ label, isActive = false, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    className="flex flex-col items-center gap-2"
  >
    <motion.div
      animate={
        isActive
          ? { scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }
          : { scale: 0.9, opacity: 0.5 }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
        isActive
          ? 'bg-purple-500/30 border-2 border-purple-500'
          : 'bg-white/5 border-2 border-white/20'
      }`}
    >
      {label.icon}
    </motion.div>
    <p className={`text-xs font-medium ${isActive ? 'text-purple-300' : 'text-gray-400'}`}>
      {label.name}
    </p>
    {isActive && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full"
      />
    )}
  </motion.div>
)

/**
 * Floating Labels Animation
 */
export const FloatingLabel = ({ text, delay = 0, icon = '✨' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs text-purple-300"
  >
    <span>{icon}</span>
    {text}
  </motion.div>
)

/**
 * Progress Bar with Animation
 */
export const AnimatedProgressBar = ({ progress = 65, label = '' }) => (
  <div className="space-y-2">
    {label && (
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
    )}
    <div className={`w-full h-2 ${GLASS.card} rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
      />
    </div>
  </div>
)

/**
 * Count Up Animation
 */
export const CountUpAnimation = ({ from = 0, to = 100, duration = 2, suffix = '' }) => {
  const [count, setCount] = motion.useMotionValue(from)
  const [displayCount, setDisplayCount] = motion.useMotionValue(from)

  motion.useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayCount(Math.floor(latest))
    })

    return unsubscribe
  }, [count, setDisplayCount])

  motion.useEffect(() => {
    const controls = motion.animate(count, to, {
      duration: duration / 1000,
      ease: 'easeOut',
    })

    return () => controls.stop()
  }, [count, to, duration])

  return (
    <motion.span>
      {displayCount}
      {suffix}
    </motion.span>
  )
}

/**
 * Staggered List Animation
 */
export const StaggeredList = ({ items = [], render, staggerDelay = 0.1 }) => (
  <motion.div
    variants={MOTION.staggerContainer}
    initial="hidden"
    animate="visible"
  >
    {items.map((item, idx) => (
      <motion.div key={idx} variants={MOTION.staggerItem}>
        {render(item, idx)}
      </motion.div>
    ))}
  </motion.div>
)

/**
 * Typewriter Animation (for headlines)
 */
export const TypewriterAnimation = ({ text, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text}
    </motion.span>
  )
}

export default {
  SkeletonCard,
  SkeletonContentSection,
  SkeletonDashboard,
  ShimmerLoader,
  AnimatedSpinner,
  PulseAnimation,
  GlowingBorder,
  AgentPulse,
  FloatingLabel,
  AnimatedProgressBar,
  CountUpAnimation,
  StaggeredList,
  TypewriterAnimation,
}
