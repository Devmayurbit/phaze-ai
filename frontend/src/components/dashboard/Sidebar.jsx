import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'pipeline', label: 'Agent Pipeline', icon: '⚡', path: '/pipeline' },
  { id: 'influencers', label: 'Influencer Profiles', icon: '👥', path: '/profiles' },
  { id: 'scripts', label: 'Generated Scripts', icon: '✏️', path: '/scripts' },
  { id: 'trends', label: 'Trend Analysis', icon: '📈', path: '/trends' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
]

export default function Sidebar({ isOpen = true, setIsOpen = () => {} }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-64 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-r border-white/10 flex flex-col transition-all duration-300 h-full z-50 md:z-0`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Phaze AI
          </h1>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <Link
              key={item.id}
              to={item.path}
            >
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                  active
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-400 hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {active && <span className="ml-auto text-xs">→</span>}
              </motion.button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <p className="text-sm font-bold text-white">Creator</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          </div>
          <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Upgrade
          </button>
        </div>
      </div>
    </motion.div>
  )
}

