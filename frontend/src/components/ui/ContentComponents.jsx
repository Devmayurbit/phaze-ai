import { motion } from 'framer-motion'
import { Copy, RotateCcw, Save, Zap, Check } from 'lucide-react'
import { useState } from 'react'
import { GLASS, MOTION, COLORS, TYPOGRAPHY, SPACING } from '../../styles/designSystem'

/**
 * Premium Content Card Component
 * Used for Hooks, Captions, Scripts, and Hashtags
 * Glassmorphic design with smooth interactions
 */
export const ContentCard = ({
  title,
  content,
  icon = '✨',
  onCopy,
  onRegenerate,
  onSave,
  index = 0,
  isSaved = false,
  isLoading = false,
  variant = 'default',
}) => {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCopy = () => {
    if (onCopy) onCopy(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const variants = {
    default: GLASS.card,
    premium: GLASS.premium,
    neon: GLASS.neon,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${variants[variant]} p-4 md:p-5 rounded-xl group cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl">{icon}</span>
          <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {isSaved && <Check className="w-4 h-4 text-green-400" />}
          <span className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded">#{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className={`text-sm md:text-base text-gray-300 leading-relaxed ${
        isExpanded ? '' : 'line-clamp-3'
      } transition-all duration-300`}>
        {content}
      </div>

      {/* Expand Indicator */}
      {!isExpanded && (
        <div className="mt-2 text-xs text-purple-400">Click to expand...</div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            handleCopy()
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
            copied
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-xs md:text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="hidden md:inline text-xs">Copy</span>
            </>
          )}
        </motion.button>

        {onRegenerate && (
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onRegenerate()
            }}
            className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30 transition-all"
            title="Regenerate this item"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        )}

        {onSave && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onSave()
            }}
            className={`px-3 py-2 rounded-lg transition-all ${
              isSaved
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-gray-500/20 border border-gray-500/50 text-gray-400 hover:bg-gray-500/30'
            }`}
            title={isSaved ? 'Saved' : 'Save this item'}
          >
            <Save className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Content Section Component
 * Groups multiple content items with header and tabs
 */
export const ContentSection = ({
  title,
  icon,
  items = [],
  activeTab,
  setActiveTab,
  isLoading = false,
  onRefresh,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${GLASS.card} rounded-2xl p-6 md:p-8`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl">{icon}</span>
          <div>
            <h3 className={`${TYPOGRAPHY.h4} text-white`}>{title}</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1">{items.length} variations generated</p>
          </div>
        </div>
        {onRefresh && (
          <motion.button
            whileHover={{ rotate: 180 }}
            onClick={onRefresh}
            className={`p-2 rounded-lg ${GLASS.buttonGhost}`}
            disabled={isLoading}
          >
            <RotateCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </motion.button>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <ContentCard
            key={idx}
            title={title}
            icon={icon}
            content={typeof item === 'string' ? item : item.content || item.text}
            index={idx}
            isSaved={item.saved}
            variant={idx % 3 === 0 ? 'default' : idx % 3 === 1 ? 'premium' : 'neon'}
          />
        ))}
      </div>

      {items.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-400">No content generated yet</p>
        </div>
      )}
    </motion.div>
  )
}

/**
 * Copy Button with Toast Feedback
 */
export const CopyButton = ({ text, children = 'Copy' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        copied
          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
          : `${GLASS.buttonPrimary}`
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {children}
        </>
      )}
    </motion.button>
  )
}

/**
 * Regenerate Button with Animation
 */
export const RegenerateButton = ({ onRegenerate, isLoading = false, children = 'Regenerate' }) => {
  return (
    <motion.button
      whileHover={{ rotate: 180 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRegenerate}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isLoading
          ? 'opacity-50 cursor-not-allowed'
          : `${GLASS.buttonGhost} hover:${GLASS.hover}`
      }`}
    >
      <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      {children}
    </motion.button>
  )
}

/**
 * AI Badge Component
 */
export const AIBadge = ({ text = 'AI Generated' }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full"
  >
    <Zap className="w-3 h-3 text-purple-400" />
    <span className="text-xs font-medium text-purple-300">{text}</span>
  </motion.div>
)

/**
 * Stat Card Component
 */
export const StatCard = ({
  label,
  value,
  icon,
  trend,
  trendDirection = 'up',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${GLASS.card} p-4 rounded-lg`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs md:text-sm text-gray-400 mb-1">{label}</p>
        <p className={`${TYPOGRAPHY.h5} text-white`}>{value}</p>
        {trend && (
          <p className={`text-xs mt-1 ${trendDirection === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trendDirection === 'up' ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </motion.div>
)

export default {
  ContentCard,
  ContentSection,
  CopyButton,
  RegenerateButton,
  AIBadge,
  StatCard,
}
