import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '⚡', label: 'Agent Pipeline', path: '/pipeline' },
  { icon: '👥', label: 'Influencer Profiles', path: '/profiles' },
  { icon: '✏️', label: 'Generated Scripts', path: '/scripts' },
  { icon: '📈', label: 'Trend Analysis', path: '/trends' },
  { icon: '⚙️', label: 'Settings', path: '/settings' },
];

export const FloatingSidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-6 left-6 z-50 md:hidden p-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: open ? 280 : 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col fixed left-6 top-6 h-[calc(100vh-3rem)] rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 overflow-hidden shadow-2xl shadow-black/40 z-40"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <motion.div
            animate={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
              Phaze AI
            </h1>
          </motion.div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50'
                    : 'hover:bg-white/10 border border-transparent'
                  }
                `}
              >
                {/* Active glow */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <span className="text-xl relative z-10 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                <motion.span
                  animate={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white text-sm font-medium overflow-hidden whitespace-nowrap relative z-10"
                >
                  {item.label}
                </motion.span>

                {isActive(item.path) && open && (
                  <motion.div
                    layoutId="activeArrow"
                    className="ml-auto relative z-10"
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} className="text-purple-400" />
                  </motion.div>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👤</span>
              <motion.div
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs text-white/70 font-medium">Creator</p>
              </motion.div>
            </div>
            <motion.div
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-purple-400 font-semibold">Pro Plan</p>
            </motion.div>
          </div>

          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white/80 transition-colors"
          >
            {open ? 'Collapse' : 'Expand'}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 h-full w-64 backdrop-blur-2xl bg-gradient-to-b from-white/10 to-white/5 border-r border-white/20 z-40 overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Phaze AI
                </h1>
              </div>

              <nav className="px-4 py-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-300
                        ${isActive(item.path)
                          ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50'
                          : 'hover:bg-white/10 border border-transparent'
                        }
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-white text-sm font-medium">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
