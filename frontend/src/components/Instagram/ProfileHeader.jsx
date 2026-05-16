import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Link as LinkIcon, Users, FileText } from 'lucide-react';

const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-8 backdrop-blur-xl"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50"></div>
              <img
                src={profile.profilePicture || 'https://via.placeholder.com/120'}
                alt={profile.username}
                className="relative w-32 h-32 rounded-full border-4 border-purple-400/30 object-cover"
              />
              {profile.verified && (
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-400 bg-[#0a0e27] rounded-full" />
              )}
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-grow"
          >
            <div className="mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                {profile.fullName || profile.username}
                {profile.verified && <CheckCircle className="w-8 h-8 text-blue-400" />}
              </h1>
              <p className="text-xl text-purple-400 font-semibold">@{profile.username}</p>
            </div>

            {profile.bio && (
              <p className="text-gray-300 text-sm mb-6 max-w-2xl line-clamp-2">{profile.bio}</p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Followers', value: profile.followers, icon: Users },
                { label: 'Following', value: profile.following, icon: Users },
                { label: 'Posts', value: profile.postsCount, icon: FileText },
                { label: 'External Link', value: profile.externalUrl ? 'Yes' : 'No', icon: LinkIcon },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={index} variants={statVariants} initial="hidden" animate="visible">
                    <div className="bg-[#1a1f3a]/50 rounded-xl p-4 border border-purple-500/10 hover:border-purple-500/30 transition">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Analyze Content
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#1a1f3a]/50 border border-purple-500/30 rounded-lg font-semibold text-purple-300 hover:border-purple-500/50 transition"
              >
                Generate Ideas
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
