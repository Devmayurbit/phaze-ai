import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Trash2, Plus, MoreVertical, ArrowUpRight, Eye } from 'lucide-react';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import { GlassCard } from '../components/ui';

export default function InfluencerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNiche, setFilterNiche] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const profiles = [
    {
      id: 1,
      username: '@mayurrr.sonwane',
      name: 'Mayurrr Sonwane',
      avatar: '👨‍💻',
      followers: 74200,
      engagement: 8.5,
      niche: 'Tech & Innovation',
      trend: '+12%',
      status: 'active',
      posts: 156,
      avgLikes: 1240,
      bio: 'Digital entrepreneur | Tech lover | Always learning'
    },
    {
      id: 2,
      username: '@alexcreates',
      name: 'Alex Creates',
      avatar: '👩‍💼',
      followers: 52800,
      engagement: 10.2,
      niche: 'Business & Entrepreneurship',
      trend: '+8%',
      status: 'active',
      posts: 98,
      avgLikes: 892,
      bio: 'Helping creators build their empire'
    },
    {
      id: 3,
      username: '@techsarah',
      name: 'Tech Sarah',
      avatar: '👩‍💻',
      followers: 38900,
      engagement: 12.7,
      niche: 'Tech & Innovation',
      trend: '+24%',
      status: 'active',
      posts: 203,
      avgLikes: 1567,
      bio: 'Tech reviews & tutorials daily'
    },
    {
      id: 4,
      username: '@lifestylejon',
      name: 'Jon Lifestyle',
      avatar: '👨‍🎓',
      followers: 125600,
      engagement: 6.3,
      niche: 'Lifestyle & Wellness',
      trend: '-2%',
      status: 'inactive',
      posts: 421,
      avgLikes: 2103,
      bio: 'Fitness + Wellness + Personal Growth'
    },
    {
      id: 5,
      username: '@investorsmith',
      name: 'Investor Smith',
      avatar: '👨‍💼',
      followers: 92300,
      engagement: 7.8,
      niche: 'Finance & Investing',
      trend: '+15%',
      status: 'active',
      posts: 267,
      avgLikes: 1834,
      bio: 'Stock tips & financial freedom'
    },
    {
      id: 6,
      username: '@gameralicia',
      name: 'Gamer Alicia',
      avatar: '👩‍🎮',
      followers: 156700,
      engagement: 14.2,
      niche: 'Gaming & Entertainment',
      trend: '+18%',
      status: 'active',
      posts: 512,
      avgLikes: 2245,
      bio: 'Gaming, streaming, and fun content'
    },
  ];

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = filterNiche === 'all' || profile.niche === filterNiche;
    return matchesSearch && matchesNiche;
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

  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
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
                  Influencer Profiles
                </h1>
                <p className="text-gray-400">Manage and analyze your influencer network</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                <Plus size={20} />
                Add Profile
              </motion.button>
            </div>

            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/50 transition-all"
                />
              </div>
              <select
                value={filterNiche}
                onChange={(e) => setFilterNiche(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-all cursor-pointer"
              >
                <option value="all">All Niches</option>
                <option value="Tech & Innovation">Tech & Innovation</option>
                <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                <option value="Finance & Investing">Finance & Investing</option>
                <option value="Gaming & Entertainment">Gaming & Entertainment</option>
                <option value="Fashion & Beauty">Fashion & Beauty</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Travel & Adventure">Travel & Adventure</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Education & Learning">Education & Learning</option>
                <option value="Sports & Recreation">Sports & Recreation</option>
                <option value="Parenting & Family">Parenting & Family</option>
                <option value="DIY & Home Improvement">DIY & Home Improvement</option>
                <option value="Music & Arts">Music & Arts</option>
                <option value="Productivity & Self-Help">Productivity & Self-Help</option>
                <option value="Real Estate & Property">Real Estate & Property</option>
                <option value="Automotive & Transportation">Automotive & Transportation</option>
                <option value="Photography & Visual Arts">Photography & Visual Arts</option>
                <option value="Gardening & Outdoors">Gardening & Outdoors</option>
                <option value="Pets & Animals">Pets & Animals</option>
                <option value="Relationships & Dating">Relationships & Dating</option>
                <option value="Personal Finance & Money">Personal Finance & Money</option>
                <option value="Career & Professional Development">Career & Professional Development</option>
                <option value="Mental Health & Wellness">Mental Health & Wellness</option>
                <option value="Hobbies & Collectibles">Hobbies & Collectibles</option>
                <option value="Writing & Content Creation">Writing & Content Creation</option>
                <option value="Social & Community">Social & Community</option>
                <option value="Sustainability & Eco-Friendly">Sustainability & Eco-Friendly</option>
              </select>
            </div>
          </motion.div>

          {/* Profiles Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredProfiles.map((profile, i) => (
              <motion.div
                key={profile.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                        {profile.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{profile.name}</h3>
                        <p className="text-gray-500 text-xs">{profile.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <Star size={18} className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{profile.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-white/10">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Followers</p>
                      <p className="font-bold text-white">{formatFollowers(profile.followers)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Engagement</p>
                      <p className="font-bold text-white">{profile.engagement}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Posts</p>
                      <p className="font-bold text-white">{profile.posts}</p>
                    </div>
                  </div>

                  {/* Niche & Trend */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                      {profile.niche}
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold ${profile.trend.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      <ArrowUpRight size={14} />
                      {profile.trend}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${profile.status === 'active' ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                    <span className="text-xs text-gray-400 capitalize">{profile.status}</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium flex items-center justify-center gap-2">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-white hover:from-purple-500/50 hover:to-pink-500/50 transition-all text-sm font-medium">
                      Analyze
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProfiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">No profiles found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </motion.div>
          )}

          {/* Stats Summary */}
          {filteredProfiles.length > 0 && (
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Portfolio Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Profiles', value: filteredProfiles.length },
                  { label: 'Combined Followers', value: formatFollowers(filteredProfiles.reduce((sum, p) => sum + p.followers, 0)) },
                  { label: 'Avg Engagement', value: (filteredProfiles.reduce((sum, p) => sum + p.engagement, 0) / filteredProfiles.length).toFixed(1) + '%' },
                  { label: 'Active Profiles', value: filteredProfiles.filter(p => p.status === 'active').length },
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
