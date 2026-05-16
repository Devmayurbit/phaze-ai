export const analyzeInstagramData = {
  // Analyze all posts and generate insights
  analyzeAllPosts(posts, followerCount = 1000) {
    if (!posts || posts.length === 0) {
      return this.getDefaultAnalytics();
    }

    return {
      mostUsedHashtags: this.extractMostUsedHashtags(posts),
      averageEngagementRate: this.calculateAverageEngagement(posts, followerCount),
      bestPostingTime: this.determineBestPostingTime(posts),
      captionStyleAnalysis: this.analyzeCaptionStyle(posts),
      topPerformingContentType: this.findTopContentType(posts),
      totalEngagement: this.calculateTotalEngagement(posts),
      postsByType: this.groupPostsByType(posts),
      engagementTrend: this.calculateEngagementTrend(posts),
      topPerformingPosts: this.getTopPerformingPosts(posts, 3),
    };
  },

  extractMostUsedHashtags(posts, limit = 15) {
    const hashtagMap = {};

    posts.forEach((post) => {
      if (post.hashtags && Array.isArray(post.hashtags)) {
        post.hashtags.forEach((tag) => {
          hashtagMap[tag] = (hashtagMap[tag] || 0) + 1;
        });
      }
    });

    return Object.entries(hashtagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([hashtag, frequency]) => ({
        hashtag,
        frequency,
      }));
  },

  calculateAverageEngagement(posts, followerCount) {
    if (posts.length === 0) return 0;

    const totalEngagement = posts.reduce((sum, post) => {
      const likes = post.likes || 0;
      const comments = post.comments || 0;
      return sum + likes + comments;
    }, 0);

    const avgEngagementRate = (totalEngagement / (posts.length * followerCount)) * 100;
    return Math.round(avgEngagementRate * 100) / 100;
  },

  determineBestPostingTime(posts) {
    if (posts.length === 0) return 'No data';

    const hoursMap = {};
    posts.forEach((post) => {
      if (post.timestamp) {
        const hour = new Date(post.timestamp).getHours();
        hoursMap[hour] = (hoursMap[hour] || 0) + 1;
      }
    });

    const bestHour = Object.entries(hoursMap).sort((a, b) => b[1] - a[1])[0]?.[0];

    if (bestHour === undefined) return 'No data';

    return `${String(bestHour).padStart(2, '0')}:00 - ${String((bestHour + 1) % 24).padStart(2, '0')}:00`;
  },

  analyzeCaptionStyle(posts) {
    if (posts.length === 0) {
      return {
        averageLength: 0,
        useEmojis: false,
        callToActionPercentage: 0,
      };
    }

    let totalLength = 0;
    let emojiCount = 0;
    let ctaCount = 0;
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
    const ctaRegex = /(\bclick\b|\bshop\b|\bbuy\b|\blink in bio\b|\bswipe up\b|\blike\b|\bcomment\b|\bfollow\b)/gi;

    posts.forEach((post) => {
      if (post.caption) {
        totalLength += post.caption.length;
        const emojiMatches = post.caption.match(emojiRegex) || [];
        emojiCount += emojiMatches.length;

        if (ctaRegex.test(post.caption)) {
          ctaCount++;
        }
      }
    });

    return {
      averageLength: Math.round(totalLength / posts.length),
      useEmojis: emojiCount > 0,
      callToActionPercentage: Math.round((ctaCount / posts.length) * 100),
    };
  },

  findTopContentType(posts) {
    if (posts.length === 0) return 'image';

    const typeMap = {};
    posts.forEach((post) => {
      const type = post.mediaType || 'image';
      typeMap[type] = (typeMap[type] || 0) + 1;
    });

    const [topType] = Object.entries(typeMap).sort((a, b) => b[1] - a[1])[0] || ['image'];
    return topType;
  },

  calculateTotalEngagement(posts) {
    return posts.reduce((sum, post) => {
      return sum + (post.likes || 0) + (post.comments || 0);
    }, 0);
  },

  groupPostsByType(posts) {
    const grouped = { image: 0, video: 0, carousel: 0, reel: 0 };

    posts.forEach((post) => {
      const type = post.mediaType || 'image';
      if (type in grouped) {
        grouped[type]++;
      }
    });

    return grouped;
  },

  calculateEngagementTrend(posts) {
    if (posts.length < 2) return [];

    return posts
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map((post, index) => ({
        index,
        date: new Date(post.timestamp).toLocaleDateString(),
        engagement: (post.likes || 0) + (post.comments || 0),
      }));
  },

  getTopPerformingPosts(posts, limit = 3) {
    return posts
      .sort((a, b) => {
        const engagementA = (a.likes || 0) + (a.comments || 0);
        const engagementB = (b.likes || 0) + (b.comments || 0);
        return engagementB - engagementA;
      })
      .slice(0, limit)
      .map((post) => ({
        caption: post.caption?.substring(0, 100) || 'No caption',
        likes: post.likes,
        comments: post.comments,
        engagement: (post.likes || 0) + (post.comments || 0),
        timestamp: post.timestamp,
      }));
  },

  getDefaultAnalytics() {
    return {
      mostUsedHashtags: [],
      averageEngagementRate: 0,
      bestPostingTime: 'No data',
      captionStyleAnalysis: {
        averageLength: 0,
        useEmojis: false,
        callToActionPercentage: 0,
      },
      topPerformingContentType: 'image',
      totalEngagement: 0,
      postsByType: { image: 0, video: 0, carousel: 0, reel: 0 },
      engagementTrend: [],
      topPerformingPosts: [],
    };
  },
};

export default analyzeInstagramData;
