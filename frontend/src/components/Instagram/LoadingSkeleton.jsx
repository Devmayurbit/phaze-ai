import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  const shimmerVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div variants={skeletonVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Profile Header Skeleton */}
      <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden bg-[#1a1f3a]/50 border border-purple-500/20 p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          {/* Profile Picture Skeleton */}
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%]"
          ></motion.div>

          {/* Info Skeleton */}
          <div className="flex-grow w-full space-y-4">
            <motion.div
              variants={shimmerVariants}
              animate="animate"
              className="h-8 w-64 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%]"
            ></motion.div>
            <motion.div
              variants={shimmerVariants}
              animate="animate"
              className="h-4 w-40 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%]"
            ></motion.div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={shimmerVariants}
                  animate="animate"
                  className="h-20 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%]"
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Cards Skeleton */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="animate"
            className="rounded-2xl p-6 bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%] h-32"
          ></motion.div>
        ))}
      </motion.div>

      {/* Charts Skeleton */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="animate"
            className="rounded-2xl p-6 bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%] h-80"
          ></motion.div>
        ))}
      </motion.div>

      {/* Posts Grid Skeleton */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="animate"
            className="rounded-2xl overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 bg-[length:200%_200%] h-80"
          ></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSkeleton;
