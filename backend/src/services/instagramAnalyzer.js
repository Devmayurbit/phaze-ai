/**
 * InstagramAnalyzer - Analyzes Instagram profile data to extract insights
 * Generates niche, audience, keywords, and engagement metrics
 */

class InstagramAnalyzer {
  /**
   * Main analysis function - processes all profile data
   */
  async analyzeInfluencer(profileData, recentPosts = []) {
    try {
      return {
        niche: this.detectNiche(profileData, recentPosts),
        keywords: this.extractKeywords(profileData, recentPosts),
        audience: this.detectAudience(profileData, recentPosts),
        engagement: this.analyzeEngagement(profileData),
        contentStyle: this.analyzeContentStyle(recentPosts),
        tone: this.detectTone(recentPosts),
        hashtags: this.extractTopHashtags(recentPosts),
        trends: this.detectTrends(recentPosts),
      }
    } catch (error) {
      console.error('Error analyzing influencer:', error.message)
      return this.getDefaultAnalysis(profileData)
    }
  }

  /**
   * Detect niche from bio, recent posts, and captions
   */
  detectNiche(profileData, posts = []) {
    const bio = (profileData.bio || '').toLowerCase()
    const allCaptions = posts
      .map(p => (p.caption || '').toLowerCase())
      .join(' ')

    const nicheKeywords = {
      'fitness|gym|workout|training|bodybuilding': 'Fitness & Gym',
      'cooking|recipe|food|chef|restaurant': 'Cooking & Food',
      'fashion|style|outfit|designer|clothing': 'Fashion & Style',
      'travel|trip|vacation|adventure|explore': 'Travel & Adventure',
      'beauty|makeup|skincare|cosmetics|hair': 'Beauty & Makeup',
      'business|entrepreneur|startup|marketing|sales': 'Business & Entrepreneurship',
      'tech|coding|development|software|app': 'Tech & Development',
      'photography|photo|camera|visual|art': 'Photography & Art',
      'music|singing|artist|producer|song': 'Music & Entertainment',
      'gaming|game|esports|streamer|twitch': 'Gaming & Esports',
      'education|learning|course|teacher|student': 'Education & Learning',
      'health|wellness|meditation|yoga|mental': 'Health & Wellness',
      'lifestyle|daily|vlog|routine|life': 'Lifestyle & Vlogs',
      'sports|athlete|football|basketball|soccer': 'Sports & Athletics',
      'pets|animals|dog|cat|pet': 'Pets & Animals',
    }

    for (const [keywords, niche] of Object.entries(nicheKeywords)) {
      const regex = new RegExp(keywords)
      if (regex.test(bio) || regex.test(allCaptions)) {
        return niche
      }
    }

    return 'General Content Creator'
  }

  /**
   * Extract keywords from bio and captions
   */
  extractKeywords(profileData, posts = []) {
    const bio = profileData.bio || ''
    const captions = posts
      .map(p => p.caption || '')
      .join(' ')

    const text = `${bio} ${captions}`.toLowerCase()

    // Extract words that appear frequently (3+ chars)
    const words = text.match(/\b[a-z]{3,}\b/g) || []
    const wordFreq = {}

    words.forEach(word => {
      // Filter out common stop words
      if (!this.isStopWord(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      }
    })

    // Get top 10 keywords by frequency
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word)
  }

  /**
   * Detect audience demographics and characteristics
   */
  detectAudience(profileData, posts = []) {
    const followers = profileData.followers || 0
    const bio = profileData.bio || ''

    // Estimate age group from bio keywords
    let ageGroup = '18-35'
    if (bio.includes('teen') || bio.includes('high school')) ageGroup = '13-18'
    if (bio.includes('mom') || bio.includes('parent') || bio.includes('family')) ageGroup = '25-45'
    if (bio.includes('senior') || bio.includes('grandpa') || bio.includes('grandma')) ageGroup = '50+'

    return {
      estimatedAgeRange: ageGroup,
      followerSize: followers > 1000000 ? 'Mega Influencer' :
                   followers > 100000 ? 'Macro Influencer' :
                   followers > 10000 ? 'Micro Influencer' :
                   followers > 1000 ? 'Nano Influencer' : 'New Creator',
      engagementLevel: followers > 0 ? 'Active' : 'Starting Out',
      contentFrequency: this.estimateContentFrequency(posts),
    }
  }

  /**
   * Analyze engagement metrics
   */
  analyzeEngagement(profileData) {
    const likes = profileData.totalLikes || 0
    const comments = profileData.totalComments || 0
    const followers = profileData.followers || 1
    const posts = profileData.posts || 1

    const avgLikesPerPost = likes / posts
    const avgCommentsPerPost = comments / posts
    const engagementRate = ((avgLikesPerPost + avgCommentsPerPost) / followers * 100).toFixed(2)

    return {
      averageLikesPerPost: Math.round(avgLikesPerPost),
      averageCommentsPerPost: Math.round(avgCommentsPerPost),
      engagementRate: `${engagementRate}%`,
      totalPosts: posts,
      followerGrowth: 'Moderate', // Would require historical data
    }
  }

  /**
   * Analyze content style and patterns
   */
  analyzeContentStyle(posts = []) {
    if (posts.length === 0) return 'Unknown'

    const captions = posts.map(p => p.caption || '')
    const avgCaptionLength = captions.reduce((sum, c) => sum + c.length, 0) / posts.length

    let style = 'Balanced'
    if (avgCaptionLength < 100) style = 'Short & Concise'
    if (avgCaptionLength > 500) style = 'Long & Detailed'
    if (avgCaptionLength > 1000) style = 'Story-telling'

    return style
  }

  /**
   * Detect tone from captions
   */
  detectTone(posts = []) {
    const captions = posts.map(p => p.caption || '').join(' ').toLowerCase()

    if (captions.includes('😂') || captions.includes('haha') || captions.includes('funny')) {
      return 'Humorous'
    }
    if (captions.includes('💪') || captions.includes('goal') || captions.includes('motivation')) {
      return 'Motivational'
    }
    if (captions.includes('thank') || captions.includes('love') || captions.includes('grateful')) {
      return 'Grateful & Appreciative'
    }
    if (captions.includes('tips') || captions.includes('guide') || captions.includes('how to')) {
      return 'Educational'
    }

    return 'Friendly & Engaging'
  }

  /**
   * Extract top hashtags from posts
   */
  extractTopHashtags(posts = []) {
    const hashtags = {}

    posts.forEach(post => {
      const captions = post.caption || ''
      const tags = captions.match(/#\w+/g) || []
      tags.forEach(tag => {
        hashtags[tag] = (hashtags[tag] || 0) + 1
      })
    })

    return Object.entries(hashtags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag]) => tag)
  }

  /**
   * Detect trending topics and themes
   */
  detectTrends(posts = []) {
    const allText = posts
      .map(p => p.caption || '')
      .join(' ')
      .toLowerCase()

    const trends = {
      viral: (allText.match(/viral/gi) || []).length > 0,
      challenges: (allText.match(/challenge/gi) || []).length > 0,
      collaboration: (allText.match(/@/g) || []).length > 2,
      seasonalContent: this.detectSeasonalContent(allText),
    }

    return trends
  }

  /**
   * Estimate content frequency
   */
  estimateContentFrequency(posts = []) {
    if (posts.length === 0) return 'Never'
    if (posts.length < 5) return 'Rarely'
    if (posts.length < 20) return 'Occasionally'
    if (posts.length < 50) return 'Regularly'
    return 'Very Frequently'
  }

  /**
   * Detect seasonal content themes
   */
  detectSeasonalContent(text) {
    const seasons = {
      summer: /summer|beach|pool|vacation/gi,
      christmas: /christmas|holiday|santa|new year/gi,
      halloween: /halloween|spooky|costume/gi,
      valentine: /valentine|love|couple/gi,
    }

    const detected = []
    for (const [season, regex] of Object.entries(seasons)) {
      if (regex.test(text)) detected.push(season)
    }

    return detected.length > 0 ? detected.join(', ') : 'None'
  }

  /**
   * Check if word is a stop word
   */
  isStopWord(word) {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'be', 'was', 'are', 'were',
      'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
      'would', 'could', 'should', 'may', 'might', 'must', 'can', 'i', 'you',
      'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that',
      'these', 'those', 'am', 'are', 'be', 'been', 'being', 'not', 'no',
    ])

    return stopWords.has(word)
  }

  /**
   * Get default analysis when real analysis fails
   */
  getDefaultAnalysis(profileData) {
    return {
      niche: 'General Content Creator',
      keywords: ['content', 'creative', 'instagram'],
      audience: {
        estimatedAgeRange: '18-35',
        followerSize: 'Micro Influencer',
        engagementLevel: 'Active',
        contentFrequency: 'Regularly',
      },
      engagement: {
        averageLikesPerPost: 0,
        averageCommentsPerPost: 0,
        engagementRate: '0%',
        totalPosts: 0,
      },
      contentStyle: 'Balanced',
      tone: 'Friendly & Engaging',
      hashtags: [],
      trends: { viral: false, challenges: false, collaboration: false },
    }
  }
}

export default new InstagramAnalyzer()
