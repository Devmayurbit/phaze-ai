import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Image as ImageIcon, Video, Grid3x3 } from 'lucide-react';

const PostsGrid = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No posts available</p>
      </div>
    );
  }

  const getMediaIcon = (mediaType) => {
    switch (mediaType) {
      case 'video':
      case 'reel':
        return <Video className="w-4 h-4" />;
      case 'carousel':
        return <Grid3x3 className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.postId || index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a1f3a]/50 border border-purple-500/10 hover:border-purple-500/30 transition"
          >
            {/* Post Image */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              {post.mediaUrl ? (
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  src={post.mediaUrl}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-600" />
                </div>
              )}

              {/* Overlay with stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 transition"
              >
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-white">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="text-sm font-semibold">{post.likes?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">{post.comments?.toLocaleString() || '0'}</span>
                  </div>
                </div>
                <div className="bg-purple-600/80 backdrop-blur px-2 py-1 rounded-lg text-xs text-white font-medium flex items-center gap-1">
                  {getMediaIcon(post.mediaType)}
                </div>
              </motion.div>
            </div>

            {/* Post Details */}
            <div className="p-4">
              {/* Caption Preview */}
              {post.caption && (
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">{post.caption}</p>
              )}

              {/* Hashtags Preview */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.hashtags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {post.hashtags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.hashtags.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Engagement Rate */}
              <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
                <span className="text-xs text-gray-500">Engagement Rate</span>
                <span className="text-sm font-bold text-purple-400">
                  {post.engagementRate?.toFixed(2) || '0'}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1f3a] rounded-3xl border border-purple-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {selectedPost.mediaUrl && (
                <img src={selectedPost.mediaUrl} alt="Post" className="w-full h-auto rounded-2xl mb-6" />
              )}

              <div className="space-y-4">
                {selectedPost.caption && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">Caption</h3>
                    <p className="text-white text-base break-words">{selectedPost.caption}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-purple-500/10">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Likes</p>
                    <p className="text-2xl font-bold text-white">{selectedPost.likes?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Comments</p>
                    <p className="text-2xl font-bold text-white">{selectedPost.comments?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Engagement</p>
                    <p className="text-2xl font-bold text-purple-400">{selectedPost.engagementRate?.toFixed(2)}%</p>
                  </div>
                </div>

                {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Posted on {new Date(selectedPost.timestamp).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostsGrid;
