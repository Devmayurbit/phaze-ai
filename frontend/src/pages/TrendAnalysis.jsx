import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Filter, Download } from 'lucide-react';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import { GlassCard, AIStatusBadge } from '../components/ui';

export default function TrendAnalysis() {
  const [timeframe, setTimeframe] = useState('7d');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const trendData = [
    { date: 'Mon', trend: 45, viral: 32, engagement: 28 },
    { date: 'Tue', trend: 52, viral: 38, engagement: 35 },
    { date: 'Wed', trend: 48, viral: 42, engagement: 31 },
    { date: 'Thu', trend: 61, viral: 55, engagement: 48 },
    { date: 'Fri', trend: 55, viral: 49, engagement: 42 },
    { date: 'Sat', trend: 67, viral: 58, engagement: 52 },
    { date: 'Sun', trend: 72, viral: 64, engagement: 58 },
  ];

  const topicsData = [
    { name: 'AI & Automation', value: 28 },
    { name: 'Tech Trends', value: 22 },
    { name: 'Business Tips', value: 18 },
    { name: 'Growth Hacks', value: 16 },
    { name: 'Other', value: 16 },
  ];

  const engagementData = [
    { platform: 'Instagram', engagement: 12.5, reach: 45000 },
    { platform: 'YouTube', engagement: 8.2, reach: 32000 },
    { platform: 'TikTok', engagement: 18.7, reach: 58000 },
    { platform: 'Twitter', engagement: 5.3, reach: 15000 },
  ];

  const trendingHashtags = [
    { tag: '#AI', trend: '↑ +24%', color: 'from-purple-400 to-pink-400' },
    { tag: '#TechTrends', trend: '↑ +18%', color: 'from-blue-400 to-cyan-400' },
    { tag: '#Innovation', trend: '↑ +15%', color: 'from-emerald-400 to-teal-400' },
    { tag: '#StartupLife', trend: '↓ -5%', color: 'from-orange-400 to-red-400' },
    { tag: '#Developer', trend: '→ Stable', color: 'from-gray-400 to-slate-400' },
  ];

  const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#6b7280'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <GlobalSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto">
        <motion.div
          className="min-h-screen p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                Trend Analysis
              </h1>
              <p className="text-gray-400">Real-time insights into viral content patterns and engagement metrics</p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-all text-sm"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Trending Topics', value: '24', trend: '+12%', icon: '📈' },
              { label: 'Viral Posts', value: '156', trend: '+8%', icon: '🚀' },
              { label: 'Avg Engagement', value: '12.3%', trend: '+5.2%', icon: '💬' },
              { label: 'Reach Potential', value: '2.4M', trend: '+18%', icon: '👥' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
              >
                <div className="text-3xl mb-3">{metric.icon}</div>
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                  <span className="text-sm text-emerald-400 font-medium">{metric.trend}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Trend Over Time */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="text-purple-400" size={24} />
                  Trend Momentum
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="trend" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="viral" stroke="#ec4899" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="engagement" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Topic Distribution */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <h2 className="text-xl font-bold text-white mb-6">Topic Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topicsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </div>

          {/* Platform Performance & Hashtags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Platform Performance */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <h2 className="text-xl font-bold text-white mb-6">Platform Performance</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis stroke="rgba(255,255,255,0.5)" dataKey="platform" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Bar dataKey="engagement" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Trending Hashtags */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <h2 className="text-xl font-bold text-white mb-6">Trending Hashtags</h2>
                <div className="space-y-3">
                  {trendingHashtags.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${item.color} text-white text-sm font-bold`}>
                          {item.tag}
                        </div>
                        <span className="text-gray-400">{item.trend}</span>
                      </div>
                      <div className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                        {Math.floor(Math.random() * 100) + 50}K posts
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Insights */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                AI Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Peak Engagement Time',
                    desc: 'Thursday 2-4 PM shows highest engagement. Schedule posts during this window.',
                    icon: '⏰'
                  },
                  {
                    title: 'Rising Topic',
                    desc: 'AI & Automation trending +24%. Create content around this topic now.',
                    icon: '📈'
                  },
                  {
                    title: 'Optimal Length',
                    desc: '45-60 second videos get 3.2x more engagement than shorter content.',
                    icon: '🎬'
                  },
                ].map((insight, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg">
                    <div className="text-3xl mb-3">{insight.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-400">{insight.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
