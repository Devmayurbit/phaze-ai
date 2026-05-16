import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Hash } from 'lucide-react';

const HashtagsChart = ({ hashtags, expanded = false }) => {
  if (!hashtags || hashtags.length === 0) {
    return (
      <div className="rounded-2xl p-6 bg-[#1a1f3a]/50 border border-purple-500/10 backdrop-blur-xl">
        <p className="text-gray-400">No hashtags data available</p>
      </div>
    );
  }

  const chartData = expanded ? hashtags : hashtags.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-purple-500/20">
          <Hash className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Top Hashtags</h3>
          <p className="text-sm text-gray-400">Most frequently used</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" />
          <XAxis
            dataKey="hashtag"
            stroke="rgba(148, 163, 184, 0.5)"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="rgba(148, 163, 184, 0.5)" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 31, 58, 0.9)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Bar dataKey="frequency" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {expanded && (
        <motion.div className="mt-6 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">All Hashtags</h4>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded-lg transition"
              >
                <span className="text-purple-400 font-semibold">#{item.hashtag}</span>
                <span className="text-gray-500 text-sm">({item.frequency})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HashtagsChart;
