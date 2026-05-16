import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import { GlassCard, AIStatusBadge } from '../components/ui';

export default function AgentPipeline() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    {
      id: 1,
      name: 'Instagram Scraper',
      icon: '📱',
      status: 'completed',
      progress: 100,
      duration: '2.3s',
      description: 'Fetching Instagram profile data and recent posts',
      details: {
        profile: 'Loaded ✓',
        posts: '20 posts loaded',
        engagement: 'Calculated',
        hashtags: 'Extracted'
      }
    },
    {
      id: 2,
      name: 'Trend Analyzer',
      icon: '📊',
      status: 'completed',
      progress: 100,
      duration: '1.8s',
      description: 'Analyzing trends and engagement patterns',
      details: {
        topics: '12 topics identified',
        momentum: 'Calculated',
        viral_score: '8.2/10',
        recommendations: 'Generated'
      }
    },
    {
      id: 3,
      name: 'Hook Generator',
      icon: '🎣',
      status: 'active',
      progress: 65,
      duration: '1.2s',
      description: 'Creating viral hooks with AI',
      details: {
        model: 'LLaMA 2 7B',
        generated: '5 hooks',
        quality_score: '9.1/10',
        time_remaining: '~0.8s'
      }
    },
    {
      id: 4,
      name: 'Script Writer',
      icon: '🎬',
      status: 'pending',
      progress: 0,
      duration: '2.1s',
      description: 'Writing AI-powered video scripts',
      details: {
        status: 'Waiting for Hook Generator',
        scripts_to_generate: '2 scripts',
        duration_options: '30s, 60s',
        templates: '5 available'
      }
    },
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-400';
      case 'active': return 'text-purple-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={24} />;
      case 'active': return <Zap size={24} className="animate-pulse" />;
      case 'pending': return <Clock size={24} />;
      default: return null;
    }
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
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              AI Agent Pipeline
            </h1>
            <p className="text-gray-400">Real-time processing workflow with automated agents</p>
          </motion.div>

          {/* Pipeline Visualization */}
          <motion.div variants={itemVariants} className="mb-12">
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-white mb-8">Processing Pipeline</h2>

              {/* Animated Flow */}
              <div className="space-y-6">
                {agents.map((agent, idx) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveAgent(idx)}
                    className="cursor-pointer"
                  >
                    {/* Agent Card */}
                    <div className={`rounded-xl border transition-all ${activeAgent === idx ? 'border-purple-400/50 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className={`text-3xl ${getStatusColor(agent.status)} transition-all`}>
                              {agent.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                {agent.name}
                                <span className={`text-sm ${getStatusColor(agent.status)}`}>
                                  {getStatusIcon(agent.status)}
                                </span>
                              </h3>
                              <p className="text-sm text-gray-400">{agent.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{agent.progress}%</div>
                            <div className="text-xs text-gray-500">{agent.duration}</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${agent.progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            agent.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                            agent.status === 'active' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          </div>
                          {agent.status === 'active' && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="text-purple-400"
                            >
                              ⚙️
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Connection Line */}
                      {idx < agents.length - 1 && (
                        <motion.div
                          className="h-8 flex items-center justify-center"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="text-2xl text-purple-400">↓</div>
                        </motion.div>
                      )}
                    </div>

                    {/* Details Panel */}
                    {activeAgent === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <h4 className="font-semibold text-white mb-4">Agent Details</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(agent.details).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-xs text-gray-500 mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
                              <p className="text-sm text-white font-medium">{value}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Overall Status */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Completed', value: '2/4', icon: '✓' },
                    { label: 'In Progress', value: '1/4', icon: '⚙️' },
                    { label: 'Pending', value: '1/4', icon: '⏳' },
                    { label: 'Total Time', value: '7.4s', icon: '⏱️' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-500 mb-2">{item.label}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-lg font-bold text-white">{item.value}</p>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats & Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance */}
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-white mb-6">Performance Metrics</h2>
              <div className="space-y-4">
                {[
                  { metric: 'Success Rate', value: '98.5%', trend: '↑ +2.3%' },
                  { metric: 'Avg Processing Time', value: '6.8s', trend: '↓ -1.2s' },
                  { metric: 'Model Accuracy', value: '92.1%', trend: '↑ +5.4%' },
                  { metric: 'Error Rate', value: '0.8%', trend: '↓ -0.3%' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">{item.metric}</span>
                    <div className="text-right">
                      <p className="font-bold text-white">{item.value}</p>
                      <p className="text-xs text-emerald-400">{item.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Recent Runs */}
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-white mb-6">Recent Pipeline Runs</h2>
              <div className="space-y-3">
                {[
                  { profile: '@mayurrr.sonwane', status: 'completed', time: '2 mins ago' },
                  { profile: '@techsarah', status: 'completed', time: '15 mins ago' },
                  { profile: '@alexcreates', status: 'completed', time: '1 hour ago' },
                  { profile: '@investorsmith', status: 'completed', time: '2 hours ago' },
                ].map((run, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{run.profile}</p>
                      <p className="text-xs text-gray-500">{run.time}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      ✓ {run.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Agent Info */}
          <motion.div variants={itemVariants} className="mt-8">
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-white mb-6">🤖 About the AI Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Instagram Scraper',
                    desc: 'Autonomous agent that fetches real Instagram data using RapidAPI with intelligent fallback to realistic data generation for demo purposes.'
                  },
                  {
                    name: 'Trend Analyzer',
                    desc: 'NLP-powered agent that processes posts and extracts trending topics, engagement patterns, and growth opportunities using Natural.js tokenization.'
                  },
                  {
                    name: 'Hook Generator',
                    desc: 'AI agent powered by Hugging Face LLaMA 2 7B that creates viral, engaging hooks personalized to the niche and audience.'
                  },
                  {
                    name: 'Script Writer',
                    desc: 'Content generation agent that produces complete video scripts with Hook/Body/CTA structure optimized for maximum engagement and virality.'
                  },
                ].map((agent, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h3 className="font-bold text-white mb-2">{agent.name}</h3>
                    <p className="text-sm text-gray-400">{agent.desc}</p>
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
