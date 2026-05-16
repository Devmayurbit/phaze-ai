import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Zap, ChevronDown } from 'lucide-react';

export const ContentCard = ({ 
  title, 
  content, 
  icon = '✨',
  tags = [],
  onCopy,
  onRegenerate,
  expandable = true,
  score,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl">{icon}</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              {tags.length > 0 && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {tags.map((tag, i) => (
                    <span key={i} className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {score && (
            <div className="text-right">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {score.toFixed(1)}
              </div>
              <div className="text-xs text-white/60">Score</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : expandable ? 80 : 'auto' }}
            className="overflow-hidden"
          >
            <p className="text-white/80 text-sm leading-relaxed">
              {content}
            </p>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-medium transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
            
            {onRegenerate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegenerate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors"
              >
                <Zap className="w-3 h-3" />
                Regenerate
              </motion.button>
            )}
          </div>

          {expandable && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpanded(!expanded)}
              className="text-white/60 hover:text-white"
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
