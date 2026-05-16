import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader, AlertCircle } from 'lucide-react';
import ProfileHeader from '../components/Instagram/ProfileHeader';
import AnalyticsCards from '../components/Instagram/AnalyticsCards';
import PostsGrid from '../components/Instagram/PostsGrid';
import HashtagsChart from '../components/Instagram/HashtagsChart';
import EngagementChart from '../components/Instagram/EngagementChart';
import LoadingSkeleton from '../components/Instagram/LoadingSkeleton';
import { fetchInstagramData } from '../services/instagramService';

const InstagramDashboard = () => {
  const [username, setUsername] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchInstagramData(searchInput.trim());
      setUsername(searchInput.trim());
      setProfile(data.profile);
      setPosts(data.posts);
      setAnalytics(data.analytics);
      setSearchInput('');
    } catch (err) {
      setError(err.message || 'Failed to fetch Instagram profile');
      setProfile(null);
      setPosts([]);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0d1628]">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="pt-8 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Instagram Intelligence
              </h1>
              <p className="text-gray-400">Real-time analytics & content insights</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center bg-[#1a1f3a]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl px-6 py-4 hover:border-purple-500/50 transition">
                  <Search className="w-5 h-5 text-purple-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Enter Instagram username..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="bg-transparent text-white placeholder-gray-500 outline-none flex-1"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                  >
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
                  </button>
                </div>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <LoadingSkeleton />
          </motion.div>
        )}

        {/* Dashboard Content */}
        {profile && !loading && (
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Header */}
            <motion.div variants={itemVariants}>
              <ProfileHeader profile={profile} />
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants} className="flex gap-4 border-b border-purple-500/20 overflow-x-auto">
              {['overview', 'posts', 'hashtags', 'engagement'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold capitalize whitespace-nowrap transition ${
                    activeTab === tab
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <motion.div variants={itemVariants} className="space-y-8">
                <AnalyticsCards analytics={analytics} />
                {analytics && (
                  <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HashtagsChart hashtags={analytics.mostUsedHashtags} />
                    <EngagementChart trend={analytics.engagementTrend} />
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'posts' && (
              <motion.div variants={itemVariants}>
                <PostsGrid posts={posts} />
              </motion.div>
            )}

            {activeTab === 'hashtags' && (
              <motion.div variants={itemVariants}>
                <HashtagsChart hashtags={analytics?.mostUsedHashtags} expanded />
              </motion.div>
            )}

            {activeTab === 'engagement' && (
              <motion.div variants={itemVariants}>
                <EngagementChart trend={analytics?.engagementTrend} expanded />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {!profile && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 py-16 text-center"
          >
            <div className="inline-block p-12 rounded-3xl bg-purple-500/5 border border-purple-500/20">
              <Search className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-gray-300 mb-2">No profile loaded</h2>
              <p className="text-gray-500">Search for an Instagram username to get started</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstagramDashboard;
