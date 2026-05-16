import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import { GlassCard, AnimatedButton, AIStatusBadge } from '../components/ui';

export default function Settings() {
  const [apiKey, setApiKey] = useState('hf_xxxxxxxxxx...');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    email: 'creator@phaze.ai',
    username: 'Creator Pro',
    niche: 'Tech & Innovation',
    timezone: 'UTC',
    notifications: true,
    emailAlerts: true,
    weaklyReport: true,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Settings
            </h1>
            <p className="text-gray-400">Manage your account, API keys, and preferences</p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Settings */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              
              {/* Account Section */}
              <GlassCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/50 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Niche</label>
                      <select
                        name="niche"
                        value={formData.niche}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-all cursor-pointer"
                      >
                        <option>Tech & Innovation</option>
                        <option>Lifestyle & Wellness</option>
                        <option>Business & Entrepreneurship</option>
                        <option>Finance & Investing</option>
                        <option>Gaming & Entertainment</option>
                        <option>Fashion & Beauty</option>
                        <option>Food & Cooking</option>
                        <option>Travel & Adventure</option>
                        <option>Fitness & Health</option>
                        <option>Education & Learning</option>
                        <option>Sports & Recreation</option>
                        <option>Parenting & Family</option>
                        <option>DIY & Home Improvement</option>
                        <option>Music & Arts</option>
                        <option>Productivity & Self-Help</option>
                        <option>Real Estate & Property</option>
                        <option>Automotive & Transportation</option>
                        <option>Photography & Visual Arts</option>
                        <option>Gardening & Outdoors</option>
                        <option>Pets & Animals</option>
                        <option>Relationships & Dating</option>
                        <option>Personal Finance & Money</option>
                        <option>Career & Professional Development</option>
                        <option>Mental Health & Wellness</option>
                        <option>Hobbies & Collectibles</option>
                        <option>Writing & Content Creation</option>
                        <option>Social & Community</option>
                        <option>Sustainability & Eco-Friendly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-all"
                      >
                        <option>UTC</option>
                        <option>EST</option>
                        <option>CST</option>
                        <option>PST</option>
                      </select>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* API Key Section */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <span className="text-2xl">🔑</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">API Configuration</h2>
                  </div>
                  <AIStatusBadge status="active" />
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Hugging Face API Key for AI content generation</p>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none"
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      {showKey ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-gray-400" />}
                    </button>
                  </div>

                  <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300 transition">
                    → Get API Key from Hugging Face
                  </a>
                </div>
              </GlassCard>

              {/* Notification Settings */}
              <GlassCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-pink-500/20">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'notifications', label: 'Push Notifications', desc: 'Get alerts for generated content' },
                    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive trend analysis reports' },
                    { key: 'weaklyReport', label: 'Weekly Report', desc: 'Summary of performance metrics' },
                  ].map(({ key, label, desc }) => (
                    <label key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-all cursor-pointer group">
                      <div>
                        <p className="font-medium text-white group-hover:text-purple-400 transition">{label}</p>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        name={key}
                        checked={formData[key]}
                        onChange={handleChange}
                        className="w-5 h-5 rounded accent-purple-500 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Plan Info */}
              <GlassCard className="p-6 glow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Pro Plan</h3>
                  <p className="text-sm text-gray-400 mb-4">Full access to all features</p>
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
                    $29/mo
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium">
                    Manage Billing
                  </button>
                </div>
              </GlassCard>

              {/* Usage Stats */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">API Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Requests</span>
                      <span className="text-white font-medium">847 / 1000</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                        initial={{ width: 0 }}
                        animate={{ width: '84.7%' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Storage</span>
                      <span className="text-white font-medium">2.3 / 10 GB</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: '23%' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Support */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
                    📚 Documentation
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
                    💬 Support Chat
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div variants={itemVariants} className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium">
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Save size={18} />
              {saved ? 'Saved!' : 'Save Changes'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
