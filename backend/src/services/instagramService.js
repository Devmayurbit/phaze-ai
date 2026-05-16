import axios from 'axios';

const RAPIDAPI_HOST = 'instagram-data1.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const rapidApiClient = axios.create({
  baseURL: `https://${RAPIDAPI_HOST}`,
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
});

export const instagramService = {
  // Fetch user profile information
  async fetchUserProfile(username) {
    try {
      const response = await rapidApiClient.get('/user/info', {
        params: { user_name: username },
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(`Failed to fetch profile: ${response.data.message || 'Unknown error'}`);
      }

      const userData = response.data;
      return {
        username: userData.username || username,
        fullName: userData.full_name || '',
        bio: userData.biography || '',
        profilePicture: userData.profile_pic_url || '',
        followers: userData.follower_count || 0,
        following: userData.following_count || 0,
        postsCount: userData.media_count || 0,
        verified: userData.is_verified || false,
        externalUrl: userData.external_url || '',
        rawData: userData,
      };
    } catch (error) {
      throw new Error(`Instagram Profile Fetch Error: ${error.message}`);
    }
  },

  // Fetch recent posts from user
  async fetchUserPosts(username, limit = 12) {
    try {
      const response = await rapidApiClient.get('/user/posts', {
        params: {
          user_name: username,
          number: Math.min(limit, 50), // API max is usually 50
        },
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(`Failed to fetch posts: ${response.data.message || 'Unknown error'}`);
      }

      const posts = response.data.data || [];

      return posts.map((post) => ({
        postId: post.id || post.pk || `${username}-${Date.now()}`,
        username,
        caption: post.caption || '',
        hashtags: extractHashtags(post.caption || ''),
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        timestamp: new Date(post.taken_at * 1000 || Date.now()),
        mediaUrl: post.media_type === 8 ? post.carousel_media[0]?.image_versions2?.candidates[0]?.url : post.image_versions2?.candidates[0]?.url || '',
        mediaType: determineMediaType(post.media_type),
        engagementRate: calculateEngagementRate(post.like_count || 0, post.comments_count || 0),
        shortCode: post.code || '',
        rawData: post,
      }));
    } catch (error) {
      throw new Error(`Instagram Posts Fetch Error: ${error.message}`);
    }
  },

  // Fetch comments on a specific post
  async fetchPostComments(postId, limit = 20) {
    try {
      const response = await rapidApiClient.get('/post/comments', {
        params: {
          pk: postId,
          number: Math.min(limit, 50),
        },
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(`Failed to fetch comments: ${response.data.message || 'Unknown error'}`);
      }

      return response.data.data || [];
    } catch (error) {
      throw new Error(`Instagram Comments Fetch Error: ${error.message}`);
    }
  },

  // Search for Instagram users
  async searchUsers(query) {
    try {
      const response = await rapidApiClient.get('/user/search', {
        params: { search_query: query },
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(`Failed to search users: ${response.data.message || 'Unknown error'}`);
      }

      return response.data.data || [];
    } catch (error) {
      throw new Error(`Instagram User Search Error: ${error.message}`);
    }
  },
};

// Helper functions
function extractHashtags(caption) {
  if (!caption) return [];
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const matches = caption.match(hashtagRegex) || [];
  return matches.map((tag) => tag.slice(1)); // Remove #
}

function determineMediaType(mediaTypeCode) {
  // 1 = image, 2 = video, 8 = carousel, 22 = story
  const typeMap = {
    1: 'image',
    2: 'video',
    8: 'carousel',
    22: 'reel',
  };
  return typeMap[mediaTypeCode] || 'image';
}

function calculateEngagementRate(likes, comments, followers = 1000) {
  if (followers === 0) return 0;
  return ((likes + comments) / followers) * 100;
}

export default instagramService;
