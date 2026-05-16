import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletonVariants = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  if (type === 'card') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            variants={skeletonVariants}
            animate="animate"
            className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-2xl p-6"
          >
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded-lg w-3/4" />
              <div className="h-3 bg-white/10 rounded-lg w-full" />
              <div className="h-3 bg-white/10 rounded-lg w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'metric') {
    return (
      <motion.div
        variants={skeletonVariants}
        animate="animate"
        className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-2xl p-6"
      >
        <div className="space-y-4">
          <div className="h-8 bg-white/20 rounded-lg w-1/3" />
          <div className="w-24 h-24 bg-white/10 rounded-full" />
        </div>
      </motion.div>
    );
  }

  return null;
};

// Shimmer effect for content reveal
export const ShimmerLoading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-2xl"
  >
    <motion.div
      animate={{
        x: ['100%', '-100%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
    />
  </motion.div>
);
