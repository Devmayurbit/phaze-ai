import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, Settings } from 'lucide-react'

// ==================== DESIGN SYSTEM ====================
const GLASS = {
  sidebar: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl',
  card: 'bg-white/8 backdrop-blur-md border border-white/15 hover:border-white/30 hover:bg-white/10',
  hover: 'hover:bg-white/10 hover:border-white/20 transition-all duration-300',
  focus: 'focus:bg-white/15 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30',
}

const COLORS = {
  primary: 'text-purple-400',
  secondary: 'text-gray-400',
  hover: 'hover:text-purple-300',
  active: 'text-purple-300',
}

const SPACING = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

// ==================== MENU ITEMS ====================
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'pipeline', label: 'Agent Pipeline', icon: '⚡', path: '/pipeline' },
  { id: 'influencers', label: 'Influencer Profiles', icon: '👥', path: '/profiles' },
  { id: 'scripts', label: 'Generated Scripts', icon: '✏️', path: '/scripts' },
  { id: 'trends', label: 'Trend Analysis', icon: '📈', path: '/trends' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
]

// ==================== GLOBAL SIDEBAR COMPONENT ====================
export default function GlobalSidebar({ onClose = () => {} }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // ========== RESPONSIVE HANDLER ==========
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (path) => location.pathname === path

  // ========== MOBILE DRAWER ==========
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsOpen(true)}
            className={`fixed top-4 left-4 z-40 p-2 rounded-lg ${GLASS.card} md:hidden`}
          >
            <Menu className="w-5 h-5 text-purple-400" />
          </motion.button>
        )}

        {/* Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false)
                onClose()
              }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 h-screen w-64 max-w-xs ${GLASS.sidebar} flex flex-col z-50 md:hidden`}
            >
              <SidebarContent
                isActive={isActive}
                isCollapsed={isCollapsed}
                onClose={() => {
                  setIsOpen(false)
                  onClose()
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // ========== DESKTOP SIDEBAR ==========
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`hidden md:flex w-64 h-screen ${GLASS.sidebar} flex-col sticky top-0 left-0 z-30 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <SidebarContent
        isActive={isActive}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </motion.div>
  )
}

// ==================== SIDEBAR CONTENT COMPONENT ====================
function SidebarContent({ isActive, isCollapsed = false, setIsCollapsed, onClose = () => {} }) {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            ⚡
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-bold text-white text-sm">PHAZE AI</p>
              <p className="text-xs text-purple-400">Creator Suite</p>
            </div>
          )}
        </motion.div>
        {setIsCollapsed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1 rounded-lg ${GLASS.hover} hidden md:block`}
          >
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isCollapsed ? 'rotate-90' : '-rotate-90'
              }`}
            />
          </motion.button>
        )}
      </div>

      {/* ===== MENU ITEMS ===== */}
      <nav className={`flex-1 space-y-2 ${SPACING.sm}`}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? `bg-purple-500/20 border border-purple-500/50 ${COLORS.active}`
                  : `${GLASS.hover} text-gray-400`
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* ===== DIVIDER ===== */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ===== CREATOR CARD ===== */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${GLASS.card} p-3 rounded-lg`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">You</p>
              <p className="text-xs text-gray-400">Creator</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <button className="w-full text-xs px-2 py-1.5 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-gray-300 transition-colors flex items-center justify-center gap-1">
              <Settings className="w-3 h-3" />
              Profile
            </button>
            <button className="w-full text-xs px-2 py-1.5 bg-white/5 border border-white/10 rounded hover:bg-red-500/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        </motion.div>
      )}

      {/* ===== FOOTER STATS (Desktop only) ===== */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs"
        >
          <div className="flex justify-between text-gray-400">
            <span>Scripts Generated</span>
            <span className="text-purple-400 font-semibold">127</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Success Rate</span>
            <span className="text-green-400 font-semibold">96.8%</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
