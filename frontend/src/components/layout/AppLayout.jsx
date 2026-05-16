import { useState } from 'react'
import { motion } from 'framer-motion'
import AppSidebar from './AppSidebar'
import { SPACING, COLORS } from '../../styles/designSystem'

export default function AppLayout({ children, title, description }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Sidebar */}
      <AppSidebar onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        {(title || description) && (
          <div className={`${SPACING.container} border-b border-white/10 sticky top-0 z-20 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-transparent backdrop-blur-xl`}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title && <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{title}</h1>}
              {description && <p className="text-white/60">{description}</p>}
            </motion.div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${SPACING.container}`}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
