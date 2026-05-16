import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Trash2, Heart, Share2, Search, Filter } from 'lucide-react';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import { GlassCard } from '../components/ui';

export default function GeneratedScripts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scripts = [
    {
      id: 1,
      type: '30s Video',
      title: 'AI Revolution Hook',
      profile: '@mayurrr.sonwane',
      niche: 'Tech & Innovation',
      created: '2 mins ago',
      engagement_score: 9.2,
      views: 1240,
      likes: 89,
      content: `HOOK: "This one AI tool just changed my entire workflow"

BODY:
- Shows the tool interface
- Demonstrates 3 key features
- Compares before/after results
- Shows time saved

CTA: "Try it yourself - link in bio"`,
      liked: false
    },
    {
      id: 2,
      type: '60s Video',
      title: 'Productivity Masterclass',
      profile: '@techsarah',
      niche: 'Tech & Innovation',
      created: '5 mins ago',
      engagement_score: 8.7,
      views: 2103,
      likes: 156,
      content: `HOOK: "I tested 50 productivity tools, here are the top 3"

BODY:
- Tool #1: Features & benefits (15s)
- Tool #2: Features & benefits (15s)
- Tool #3: Features & benefits (15s)
- Real workflow demonstration (10s)

CTA: "Drop a comment - which one will you try?"`,
      liked: true
    },
    {
      id: 3,
      type: '45s Video',
      title: 'Business Growth Secrets',
      profile: '@alexcreates',
      niche: 'Business & Entrepreneurship',
      created: '12 mins ago',
      engagement_score: 8.5,
      views: 1847,
      likes: 142,
      content: `HOOK: "The #1 mistake 90% of entrepreneurs make"

BODY:
- Mistake explanation (15s)
- Real consequences (10s)
- The solution (15s)
- Success story (5s)

CTA: "Save this - you'll need it"`,
      liked: false
    },
    {
      id: 4,
      type: '60s Video',
      title: 'Fitness Transformation',
      profile: '@lifestylejon',
      niche: 'Lifestyle & Wellness',
      created: '18 mins ago',
      engagement_score: 9.4,
      views: 3245,
      likes: 287,
      content: `HOOK: "90 days - zero to hero fitness transformation"

BODY:
- Before results (10s)
- Workout routine breakdown (20s)
- Nutrition plan overview (15s)
- After results (10s)
- Monthly progress graph (5s)

CTA: "Follow for daily fitness tips"`,
      liked: false
    },
    {
      id: 5,
      type: '30s Video',
      title: 'Market Analysis Quick Take',
      profile: '@investorsmith',
      niche: 'Finance & Investing',
      created: '25 mins ago',
      engagement_score: 7.9,
      views: 892,
      likes: 67,
      content: `HOOK: "Stock market just hit a new milestone"

BODY:
- Market overview (8s)
- Key insights (8s)
- Stock picks (8s)
- Price targets (3s)
- Risk disclaimer (2s)

CTA: "What's your next move? Comment below"`,
      liked: false
    },
    {
      id: 6,
      type: '60s Video',
      title: 'Gaming Stream Highlights',
      profile: '@gameralicia',
      niche: 'Gaming & Entertainment',
      created: '32 mins ago',
      engagement_score: 8.8,
      views: 4127,
      likes: 334,
      content: `HOOK: "This gaming moment broke the internet"

BODY:
- Setup & game intro (10s)
- Gameplay footage (25s)
- Reaction moments (15s)
- Highlight reel (8s)
- Stream info

CTA: "Join me live next stream!"`,
      liked: false
    },
  ];

  const handleCopy = (id) => {
    const script = scripts.find(s => s.id === id);
    navigator.clipboard.writeText(script.content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id) => {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         script.profile.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || script.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  Generated Scripts
                </h1>
                <p className="text-gray-400">Browse and manage your AI-generated video scripts</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 text-purple-400 text-sm font-medium">
                {scripts.length} scripts
              </div>
            </div>

            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search scripts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/50 transition-all"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-all"
              >
                <option value="all">All Types</option>
                <option value="30s Video">30s Video</option>
                <option value="45s Video">45s Video</option>
                <option value="60s Video">60s Video</option>
              </select>
            </div>
          </motion.div>

          {/* Scripts Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {filteredScripts.map((script, i) => (
              <motion.div
                key={script.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="h-full flex flex-col">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{script.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                            {script.type}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-gray-400 text-xs font-medium">
                            {script.niche}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{script.profile}</span>
                          <span>•</span>
                          <span>{script.created}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleLike(script.id)}
                        className={`p-2 rounded-lg transition-all ${
                          likedIds.has(script.id)
                            ? 'bg-red-500/30 text-red-400'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <Heart size={20} fill={likedIds.has(script.id) ? 'currentColor' : 'none'} />
                      </motion.button>
                    </div>

                    {/* Engagement Score */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/10">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Engagement Score</p>
                        <p className="text-lg font-bold text-white">{script.engagement_score}/10</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Est. Views</p>
                        <p className="text-lg font-bold text-white">{script.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Likes</p>
                        <p className="text-lg font-bold text-white">{script.likes}</p>
                      </div>
                    </div>

                    {/* Script Content */}
                    <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10 max-h-48 overflow-y-auto">
                      <p className="text-sm text-gray-300 font-mono whitespace-pre-line leading-relaxed">
                        {script.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopy(script.id)}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        {copiedId === script.id ? '✓ Copied' : <Copy size={16} />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        <Share2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        <Download size={16} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-8 py-4 border-t border-white/10 bg-white/5">
                    <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-white hover:from-purple-500/50 hover:to-pink-500/50 transition-all text-sm font-medium">
                      ✨ Use as Template
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredScripts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-gray-400 text-lg">No scripts found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </motion.div>
          )}

          {/* Stats */}
          {filteredScripts.length > 0 && (
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">Script Library Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Scripts', value: scripts.length },
                  { label: 'Avg Engagement', value: (scripts.reduce((sum, s) => sum + s.engagement_score, 0) / scripts.length).toFixed(1) },
                  { label: 'Total Likes', value: scripts.reduce((sum, s) => sum + s.likes, 0) },
                  { label: 'Total Reach', value: (scripts.reduce((sum, s) => sum + s.views, 0) / 1000).toFixed(1) + 'K' },
                ].map((stat, i) => (
                  <GlassCard key={i} className="p-4">
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
