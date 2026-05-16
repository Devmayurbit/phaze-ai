import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const EngagementChart = ({ trend, expanded = false }) => {
  if (!trend || trend.length === 0) {
    return (
      <div className="rounded-2xl p-6 bg-[#1a1f3a]/50 border border-purple-500/10 backdrop-blur-xl">
        <p className="text-gray-400">No engagement data available</p>
      </div>
    );
  }

  const chartData = expanded ? trend : trend.slice(-15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-blue-500/20">
          <TrendingUp className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Engagement Trend</h3>
          <p className="text-sm text-gray-400">Post performance over time</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(148, 163, 184, 0.5)"
            tick={{ fontSize: 12 }}
            interval={Math.floor(chartData.length / 6)}
          />
          <YAxis stroke="rgba(148, 163, 184, 0.5)" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 31, 58, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      {expanded && (
        <motion.div className="mt-6 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Engagement Timeline</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {trend.slice().reverse().map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="flex items-center justify-between p-3 bg-[#1a1f3a]/50 rounded-lg hover:bg-[#1a1f3a]/80 transition"
              >
                <span className="text-sm text-gray-400">{item.date}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-8 bg-gradient-to-r from-blue-500/20 to-transparent rounded">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded"
                      style={{ width: `${Math.min((item.engagement / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold text-right w-16">{item.engagement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EngagementChart;
