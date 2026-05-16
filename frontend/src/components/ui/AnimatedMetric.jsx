import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedMetric = ({
  label,
  value,
  suffix = '',
  icon = '',
  trend,
  format = 'text',
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (format === 'number' && typeof value === 'number') {
      let current = 0;
      const increment = value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, format]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-2xl p-6 group hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-white/70 text-sm font-medium mb-2">{label}</p>
          <div className="flex items-baseline gap-1">
            {icon && <span className="text-2xl">{icon}</span>}
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {format === 'number' ? displayValue.toLocaleString() : displayValue}
            </motion.span>
            {suffix && <span className="text-white/60 text-lg">{suffix}</span>}
          </div>
        </div>
        
        {trend && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.3 }}
            className={`
              px-3 py-1 rounded-lg text-xs font-semibold
              ${trend > 0 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
              }
            `}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      {format === 'number' && value && (
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((displayValue / 100) * 100, 100)}%` }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      )}
    </motion.div>
  );
};
