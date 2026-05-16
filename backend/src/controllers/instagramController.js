import InstagramProfile from '../models/InstagramProfile.js';
import InstagramPost from '../models/InstagramPost.js';
import Analytics from '../models/Analytics.js';
import instagramService from '../services/instagramService.js';
import { analyzeInstagramData } from '../utils/analyzeInstagramData.js';

// Fetch Instagram profile and posts
export const fetchInstagramProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid username provided',
      });
    }

    const sanitizedUsername = username.trim().toLowerCase();

    // Fetch profile data from Instagram API
    const profileData = await instagramService.fetchUserProfile(sanitizedUsername);

    // Check if profile exists in database
    let existingProfile = await InstagramProfile.findOne({ username: sanitizedUsername });

    if (existingProfile) {
      // Update existing profile
      existingProfile = Object.assign(existingProfile, profileData);
      existingProfile.lastFetched = new Date();
      await existingProfile.save();
    } else {
      // Create new profile
      existingProfile = new InstagramProfile({
        username: sanitizedUsername,
        ...profileData,
      });
      await existingProfile.save();
    }

    // Fetch recent posts
    const posts = await instagramService.fetchUserPosts(sanitizedUsername, 12);

    // Save posts to database
    for (const post of posts) {
      let existingPost = await InstagramPost.findOne({ postId: post.postId });

      if (!existingPost) {
        existingPost = new InstagramPost({
          ...post,
          instagramProfileId: existingProfile._id,
        });
        await existingPost.save();
      } else {
        // Update engagement metrics
        existingPost.likes = post.likes;
        existingPost.comments = post.comments;
        existingPost.engagementRate = post.engagementRate;
        await existingPost.save();
      }
    }

    // Generate analytics
    const analytics = analyzeInstagramData.analyzeAllPosts(posts, profileData.followers);

    let analyticsRecord = await Analytics.findOne({ username: sanitizedUsername });

    if (analyticsRecord) {
      analyticsRecord.averageEngagementRate = analytics.averageEngagementRate;
      analyticsRecord.mostUsedHashtags = analytics.mostUsedHashtags;
      analyticsRecord.bestPostingTime = analytics.bestPostingTime;
      analyticsRecord.captionStyleAnalysis = analytics.captionStyleAnalysis;
      analyticsRecord.topPerformingContentType = analytics.topPerformingContentType;
      analyticsRecord.totalPosts = posts.length;
      analyticsRecord.totalEngagement = analytics.totalEngagement;
      analyticsRecord.lastAnalyzed = new Date();
      analyticsRecord.instagramProfileId = existingProfile._id;
      await analyticsRecord.save();
    } else {
      analyticsRecord = new Analytics({
        username: sanitizedUsername,
        instagramProfileId: existingProfile._id,
        averageEngagementRate: analytics.averageEngagementRate,
        mostUsedHashtags: analytics.mostUsedHashtags,
        bestPostingTime: analytics.bestPostingTime,
        captionStyleAnalysis: analytics.captionStyleAnalysis,
        topPerformingContentType: analytics.topPerformingContentType,
        totalPosts: posts.length,
        totalEngagement: analytics.totalEngagement,
        lastAnalyzed: new Date(),
      });
      await analyticsRecord.save();
    }

    res.json({
      profile: existingProfile,
      posts: posts.slice(0, 12),
      analytics,
      message: 'Profile fetched and analyzed successfully',
    });
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch Instagram profile',
    });
  }
};

// Get stored profile and analytics
export const getInstagramProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        error: 'Invalid username provided',
      });
    }

    const sanitizedUsername = username.trim().toLowerCase();

    const profile = await InstagramProfile.findOne({ username: sanitizedUsername });

    if (!profile) {
      return res.status(404).json({
        error: 'Profile not found. Please fetch it first.',
      });
    }

    const posts = await InstagramPost.find({ username: sanitizedUsername }).sort({ timestamp: -1 }).limit(12);

    const analytics = await Analytics.findOne({ username: sanitizedUsername });

    res.json({
      profile,
      posts,
      analytics: analytics || {},
    });
  } catch (error) {
    console.error('Error getting Instagram profile:', error);
    res.status(500).json({
      error: error.message || 'Failed to get Instagram profile',
    });
  }
};

// Get analytics for a profile
export const getInstagramAnalytics = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        error: 'Invalid username provided',
      });
    }

    const sanitizedUsername = username.trim().toLowerCase();

    const analytics = await Analytics.findOne({ username: sanitizedUsername }).populate('instagramProfileId');

    if (!analytics) {
      return res.status(404).json({
        error: 'Analytics not found. Please fetch the profile first.',
      });
    }

    // Get top posts for the month
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentPosts = await InstagramPost.find({
      username: sanitizedUsername,
      timestamp: { $gte: thirtyDaysAgo },
    }).sort({ likes: -1, comments: -1 });

    res.json({
      analytics,
      recentPostsCount: recentPosts.length,
      topPosts: recentPosts.slice(0, 5),
    });
  } catch (error) {
    console.error('Error getting Instagram analytics:', error);
    res.status(500).json({
      error: error.message || 'Failed to get Instagram analytics',
    });
  }
};

// Search Instagram users
export const searchInstagramUsers = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Search query required',
      });
    }

    const sanitizedQuery = query.trim().toLowerCase();

    const users = await instagramService.searchUsers(sanitizedQuery);

    res.json({
      results: users,
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({
      error: error.message || 'Failed to search users',
    });
  }
};

// Get all stored profiles
export const getAllStoredProfiles = async (req, res) => {
  try {
    const profiles = await InstagramProfile.find().select('username fullName followers postsCount profilePicture').sort({ createdAt: -1 }).limit(20);

    res.json({
      profiles,
    });
  } catch (error) {
    console.error('Error getting profiles:', error);
    res.status(500).json({
      error: error.message || 'Failed to get profiles',
    });
  }
};

export default {
  fetchInstagramProfile,
  getInstagramProfile,
  getInstagramAnalytics,
  searchInstagramUsers,
  getAllStoredProfiles,
};
