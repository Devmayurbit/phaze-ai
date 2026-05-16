import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GLASS, MOTION, SPACING, combineGlass } from '../../styles/designSystem'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'pipeline', label: 'Agent Pipeline', icon: '⚡', path: '/pipeline' },
  { id: 'influencers', label: 'Influencer Profiles', icon: '👥', path: '/profiles' },
  { id: 'scripts', label: 'Generated Scripts', icon: '✏️', path: '/scripts' },
  { id: 'trends', label: 'Trend Analysis', icon: '📈', path: '/trends' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
]

export default function AppSidebar({ onClose = () => {} }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (path) => location.pathname === path

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-white/10 border border-white/20 md:hidden"
          >
            ☰
          </button>
        )}

        {/* Mobile Drawer Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false)
              onClose()
            }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: isOpen ? 0 : -320 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-0 top-0 h-screen w-64 max-w-xs ${GLASS.sidebar} flex flex-col z-50 md:hidden`}
        >
          <SidebarContent isActive={isActive} onItemClick={() => {
            setIsOpen(false)
            onClose()
          }} />
        </motion.div>
      </>
    )
  }

  // Desktop sidebar
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`hidden md:flex w-64 h-screen ${GLASS.sidebar} flex-col sticky top-0 left-0 z-30`}
    >
      <SidebarContent isActive={isActive} />
    </motion.div>
  )
}

/**
 * Reusable sidebar content component
 */
function SidebarContent({ isActive, onItemClick = () => {} }) {
  return (
    <>
      {/* Header */}
      <div className={`${SPACING.card} border-b ${GLASS.divider}`}>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Phaze AI
          </h1>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <motion.div variants={MOTION.staggerContainer} initial="initial" animate="animate">
          {menuItems.map((item) => {
            const active = isActive(item.path)
            return (
              <motion.div key={item.id} variants={MOTION.staggerItem}>
                <Link to={item.path} onClick={onItemClick}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={combineGlass(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium',
                      active
                        ? 'bg-white/15 border border-white/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                        : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </motion.button>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </nav>

      {/* Creator Profile Card */}
      <div className={`${SPACING.card} border-t ${GLASS.divider}`}>
        <div className={combineGlass(GLASS.card, 'p-4')}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">You</p>
              <p className="text-xs text-white/50 truncate">Premium Plan</p>
            </div>
          </div>
          <button className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/20">
            Manage
          </button>
        </div>
      </div>
    </>
  )
}
