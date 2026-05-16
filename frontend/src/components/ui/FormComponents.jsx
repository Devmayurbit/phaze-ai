import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { GLASS, COLORS, TYPOGRAPHY, MOTION } from '../../styles/designSystem'

/**
 * Premium Glassmorphic Dropdown
 * Fixed visibility, dark mode support, custom styling
 */
export const GlassDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  icon,
  searchable = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Filter options based on search term
  const filteredOptions = options.filter(opt =>
    opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      searchInputRef.current?.focus()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Dropdown Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${GLASS.select} rounded-xl px-4 py-3 flex items-center justify-between group relative overflow-hidden text-left`}
        whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Content */}
        <div className="flex items-center gap-3 flex-1 relative z-10">
          {icon && <span className="text-lg">{icon}</span>}
          <span className={selectedOption ? 'text-white font-medium' : 'text-gray-400'}>
            {selectedOption?.label || placeholder}
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`w-5 h-5 text-purple-400 transition-transform duration-300 relative z-10 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`absolute top-full left-0 right-0 mt-2 ${GLASS.premium} rounded-xl border border-purple-500/30 shadow-2xl z-50 overflow-hidden`}
          >
            {/* Search Box (if searchable) */}
            {searchable && (
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 ${GLASS.input} rounded-lg`}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                      value === option.value
                        ? 'bg-purple-500/20 border-l-2 border-purple-500 text-purple-300'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {option.icon && <span>{option.icon}</span>}
                      {option.label}
                    </span>
                    {value === option.value && (
                      <Check className="w-4 h-4 text-purple-400" />
                    )}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Custom Select with Glassmorphism
 */
export const GlassSelect = ({
  options = [],
  value,
  onChange,
  placeholder,
  className = '',
  icon,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className={`flex items-center gap-2 px-4 py-3 ${GLASS.select} rounded-lg`}>
        {icon && <span>{icon}</span>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-0 outline-none text-white cursor-pointer appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-5 h-5 text-purple-400 pointer-events-none" />
      </div>
    </div>
  )
}

/**
 * Input Field with Glassmorphism
 */
export const GlassInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 ${
            error ? GLASS.inputError : GLASS.input
          } rounded-lg text-white ${GLASS.hover}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * Textarea with Glassmorphism
 */
export const GlassTextarea = ({
  placeholder,
  value,
  onChange,
  rows = 4,
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full p-4 ${
          error ? GLASS.inputError : GLASS.textarea
        } rounded-lg text-white resize-none ${GLASS.hover}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * Toggle Switch
 */
export const GlassToggle = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <motion.button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-purple-600' : 'bg-gray-600'
        }`}
      >
        <motion.div
          layout
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  )
}

/**
 * Niche Selection Component (Fixes visibility bug)
 */
export const NicheSelector = ({ value, onChange }) => {
  const niches = [
    { value: 'tech', label: 'Tech & Innovation', icon: '🚀' },
    { value: 'lifestyle', label: 'Lifestyle & Wellness', icon: '✨' },
    { value: 'business', label: 'Business & Entrepreneurship', icon: '💼' },
    { value: 'creative', label: 'Creative & Design', icon: '🎨' },
    { value: 'education', label: 'Education & Learning', icon: '📚' },
    { value: 'entertainment', label: 'Entertainment & Humor', icon: '🎭' },
    { value: 'fitness', label: 'Fitness & Sports', icon: '💪' },
    { value: 'food', label: 'Food & Cooking', icon: '🍽️' },
    { value: 'travel', label: 'Travel & Adventure', icon: '✈️' },
    { value: 'beauty', label: 'Beauty & Fashion', icon: '💄' },
  ]

  return (
    <GlassDropdown
      options={niches}
      value={value}
      onChange={onChange}
      placeholder="Select your niche..."
      label="Creator Niche"
      icon="📁"
      searchable={true}
    />
  )
}

/**
 * Form Field with Label and Error
 */
export const FormField = ({
  label,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-white mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-400 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default {
  GlassDropdown,
  GlassSelect,
  GlassInput,
  GlassTextarea,
  GlassToggle,
  NicheSelector,
  FormField,
}
