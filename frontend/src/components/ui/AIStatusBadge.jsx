import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const AIStatusBadge = ({ status = 'processing', label = 'AI Processing' }) => {
  const statusConfig = {
    processing: { color: 'from-blue-500 to-cyan-500', icon: '⚙️', pulse: true },
    success: { color: 'from-green-500 to-emerald-500', icon: '✓', pulse: false },
    error: { color: 'from-red-500 to-pink-500', icon: '✕', pulse: false },
    ready: { color: 'from-purple-500 to-pink-500', icon: '✨', pulse: true },
  };

  const config = statusConfig[status] || statusConfig.ready;

  return (
    <motion.div
      animate={config.pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        bg-gradient-to-r ${config.color} bg-opacity-20
        border border-white/20 backdrop-blur-sm
        text-xs font-semibold text-white shadow-lg shadow-black/20
      `}
    >
      <span>{config.icon}</span>
      <span>{label}</span>
    </motion.div>
  );
};
