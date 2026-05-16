import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  delay = 0,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`
        group relative backdrop-blur-xl bg-white/[0.05] 
        border border-white/10 rounded-2xl p-6
        transition-all duration-300 ease-out
        hover:bg-white/[0.08] hover:border-white/20
        ${glow ? 'shadow-lg shadow-purple-500/20' : 'shadow-lg shadow-black/20'}
        ${onClick ? 'cursor-pointer' : ''}
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Animated glow effect */}
      {glow && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
