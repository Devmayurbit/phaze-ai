import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, Type } from 'lucide-react';

const AnalyticsCards = ({ analytics }) => {
  if (!analytics) return null;

  const cards = [
    {
      title: 'Avg Engagement Rate',
      value: `${analytics.averageEngagementRate?.toFixed(2) || '0'}%`,
      icon: TrendingUp,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Total Engagement',
      value: analytics.totalEngagement?.toLocaleString() || '0',
      icon: Zap,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Best Posting Time',
      value: analytics.bestPostingTime || 'N/A',
      icon: Clock,
      color: 'from-pink-600 to-orange-600',
      bgColor: 'bg-pink-500/5',
      borderColor: 'border-pink-500/20',
    },
    {
      title: 'Top Content Type',
      value: analytics.topPerformingContentType?.charAt(0).toUpperCase() + analytics.topPerformingContentType?.slice(1) || 'Image',
      icon: Type,
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'bg-indigo-500/5',
      borderColor: 'border-indigo-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={index} variants={cardVariants}>
            <motion.div
              whileHover={{ y: -5 }}
              className={`relative group rounded-2xl p-6 border ${card.borderColor} ${card.bgColor} backdrop-blur-xl overflow-hidden cursor-pointer transition`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition duration-300`}></div>

              {/* Glowing border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 blur transition duration-300`}
                style={{
                  padding: '1px',
                }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-10`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">This month</span>
                </div>

                <p className="text-gray-400 text-sm font-medium mb-2">{card.title}</p>
                <h3 className="text-3xl font-bold text-white break-words">{card.value}</h3>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AnalyticsCards;
