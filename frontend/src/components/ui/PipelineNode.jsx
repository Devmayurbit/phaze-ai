import React from 'react';
import { motion } from 'framer-motion';

export const PipelineNode = ({
  icon,
  label,
  status = 'idle', // idle, processing, completed, error
  progress = 0,
  delay = 0,
}) => {
  const statusConfig = {
    idle: { color: 'from-gray-500 to-gray-600', bg: 'bg-gray-500/20', pulse: false },
    processing: { color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/20', pulse: true },
    completed: { color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/20', pulse: false },
    error: { color: 'from-red-500 to-pink-500', bg: 'bg-red-500/20', pulse: false },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Node Circle */}
      <motion.div
        animate={config.pulse ? { 
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.7)',
            '0 0 0 10px rgba(59, 130, 246, 0)',
          ]
        } : {}}
        transition={config.pulse ? { duration: 1.5, repeat: Infinity } : {}}
        className={`
          relative w-20 h-20 rounded-full backdrop-blur-xl
          bg-gradient-to-br ${config.color}
          border-2 border-white/30 ${config.bg}
          flex items-center justify-center text-2xl
          shadow-lg shadow-black/30
        `}
      >
        <motion.div
          animate={config.pulse ? { rotate: 360 } : {}}
          transition={config.pulse ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
        >
          {icon}
        </motion.div>

        {/* Progress Ring */}
        {status === 'processing' && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${251 * (progress / 100)} 251`}
              animate={{ strokeDasharray: `${251 * (progress / 100)} 251` }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Status Indicator */}
        {(status === 'completed' || status === 'error') && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/20 border border-white flex items-center justify-center text-xs"
          >
            {status === 'completed' ? '✓' : '✕'}
          </motion.div>
        )}
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1 }}
        className="text-center"
      >
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-white/60 capitalize">{status}</p>
      </motion.div>
    </motion.div>
  );
};

export const AnimatedPipeline = ({ nodes = [] }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center flex-1">
            <PipelineNode
              {...node}
              delay={index * 0.1}
            />
            
            {/* Connector Line */}
            {index < nodes.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="flex-1 h-1 mx-3 relative origin-left"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/50 to-transparent rounded-full blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-cyan-500/70 to-transparent rounded-full" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
