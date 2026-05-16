import natural from 'natural'
import NodeCache from 'node-cache'
import dynamicPromptBuilder from './dynamicPromptBuilder.js'
import aiContentGenerator from './aiContentGenerator.js'

class TrendAnalyzer {
  constructor() {
    this.tokenizer = new natural.WordTokenizer()
    this.stemmer = natural.PorterStemmer
    this.cache = new NodeCache({ stdTTL: 3600 })
  }

  /**
   * Analyze trends from posts and profile data
   */
  async analyzeTrends(profileData, recentPosts) {
    const cacheKey = `trends_${profileData.username}`
    const cached = this.cache.get(cacheKey)
    
    if (cached) return cached

    try {
      // Extract topics from posts
      const topics = this.extractTopics(recentPosts)
      
      // Calculate momentum for each topic
      const trends = this.calculateTrendMomentum(topics, recentPosts)
      
      // Generate growth recommendations
      const recommendations = this.generateRecommendations(profileData, trends, recentPosts)
      
      // Find best posting times
      const bestTimes = this.analyzeBestPostingTimes(recentPosts)
      
      // Identify viral topics
      const viralTopics = this.identifyViralTopics(recentPosts)

      const result = {
        trends: trends.slice(0, 8),
        growthRecommendations: recommendations,
        bestPostingTimes: bestTimes,
        viralTopics: viralTopics,
        topPerformingCategories: this.categorizePerformance(recentPosts),
        generatedAt: new Date()
      }

      this.cache.set(cacheKey, result)
      return result
    } catch (error) {
      console.error('[Trend Analyzer Error]', error.message)
      return this.getFallbackTrends(profileData)
    }
  }

  /**
   * Extract key topics from posts
   */
  extractTopics(posts) {
    const topicCounts = {}

    posts.forEach(post => {
      const text = (post.caption || '').toLowerCase()
      
      // Extract hashtags as topics
      const hashtags = text.match(/#\w+/g) || []
      hashtags.forEach(tag => {
        const topic = tag.slice(1)
        topicCounts[topic] = (topicCounts[topic] || 0) + 1
      })

      // Extract keywords
      const words = this.tokenizer.tokenize(text)
      words.forEach(word => {
        if (word.length > 4 && !this.isStopword(word)) {
          const stemmed = this.stemmer.stem(word)
          topicCounts[stemmed] = (topicCounts[stemmed] || 0) + 1
        }
      })
    })

    return Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, frequency: count }))
      .sort((a, b) => b.frequency - a.frequency)
  }

  /**
   * Calculate trend momentum
   */
  calculateTrendMomentum(topics, posts) {
    const now = new Date()
    const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000)
    
    const recentPosts = posts.filter(p => new Date(p.timestamp) > twoWeeksAgo)

    return topics.map(({ topic, frequency }) => {
      const recentCount = recentPosts.filter(p => 
        p.caption?.toLowerCase().includes(topic.toLowerCase())
      ).length

      // Calculate momentum (recent frequency / total frequency)
      const momentum = recentCount / Math.max(frequency, 1)
      const momentumLabel = momentum > 0.6 ? 'rapidly rising' : 
                           momentum > 0.3 ? 'rising' : 'stable'

      // Calculate trend score
      const baseScore = Math.min(topic.length / 2 + frequency, 10)
      const trendScore = baseScore + (momentum * 3)

      return {
        topic: this.prettifyTopic(topic),
        score: Math.min(trendScore, 10),
        momentum: momentumLabel,
        recentMentions: recentCount,
        totalMentions: frequency
      }
    }).sort((a, b) => b.score - a.score)
  }

  /**
   * Generate growth recommendations
   */
  generateRecommendations(profileData, trends, posts) {
    const recommendations = []

    // Post frequency recommendation
    const postFrequency = posts.length / 30 // per month
    if (postFrequency < 4) {
      recommendations.push('Increase posting frequency to 3-4x per week for better algorithm reach')
    } else if (postFrequency > 30) {
      recommendations.push('Consider consolidating posts - quality over quantity builds better engagement')
    } else {
      recommendations.push(`Maintain your posting schedule of ${postFrequency.toFixed(1)} posts per week`)
    }

    // Trend-based recommendations
    const topTrend = trends[0]?.topic
    if (topTrend) {
      recommendations.push(`Lean into "${topTrend}" content - it's your audience's #1 interest`)
    }

    // Engagement optimization
    const avgEngagement = posts.reduce((sum, p) => sum + (p.engagement || 0), 0) / posts.length
    if (avgEngagement < 3) {
      recommendations.push('Add more calls-to-action (CTAs) to boost comments and saves')
    } else if (avgEngagement > 10) {
      recommendations.push('Your engagement is excellent! Double down on your winning content strategy')
    }

    // Audience growth
    if (profileData.followers < 50000) {
      recommendations.push('Collaborate with creators in your niche to reach new audiences')
    } else if (profileData.followers > 100000) {
      recommendations.push('Consider exclusive content/community to increase audience loyalty')
    }

    // Hashtag strategy
    recommendations.push('Use 20-30 relevant hashtags, mix popular (#1M+) with niche tags')

    // Content timing
    recommendations.push('Post when your audience is most active - typically weekday mornings (9-11 AM)')

    return recommendations.slice(0, 6)
  }

  /**
   * Analyze best posting times
   */
  analyzeBestPostingTimes(posts) {
    const timeSlots = {}

    posts.forEach(post => {
      const date = new Date(post.timestamp)
      const day = date.toLocaleDateString('en-US', { weekday: 'long' })
      const hour = date.getHours()
      const timeSlot = `${hour}:00`
      
      const key = `${day}_${timeSlot}`
      const engagement = post.engagement || 0

      if (!timeSlots[key]) {
        timeSlots[key] = { engagement: 0, count: 0, day, hour: timeSlot }
      }

      timeSlots[key].engagement += engagement
      timeSlots[key].count += 1
    })

    return Object.values(timeSlots)
      .map(slot => ({
        day: slot.day,
        time: slot.hour,
        engagement: (slot.engagement / slot.count).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement))
      .slice(0, 5)
  }

  /**
   * Identify viral topics
   */
  identifyViralTopics(posts) {
    const topicEngagement = {}

    posts.forEach(post => {
      const hashtags = (post.caption || '').match(/#\w+/g) || []
      const engagement = post.engagement || 0

      hashtags.forEach(tag => {
        const topic = tag.slice(1)
        if (!topicEngagement[topic]) {
          topicEngagement[topic] = { total: 0, count: 0 }
        }
        topicEngagement[topic].total += engagement
        topicEngagement[topic].count += 1
      })
    })

    return Object.entries(topicEngagement)
      .map(([topic, data]) => ({
        topic: this.prettifyTopic(topic),
        avgEngagement: (data.total / data.count).toFixed(1),
        posts: data.count
      }))
      .sort((a, b) => parseFloat(b.avgEngagement) - parseFloat(a.avgEngagement))
      .slice(0, 8)
  }

  /**
   * Categorize performance by content type
   */
  categorizePerformance(posts) {
    const categories = {
      'Tutorial': { engagement: [], count: 0 },
      'Behind-the-Scenes': { engagement: [], count: 0 },
      'Tips & Tricks': { engagement: [], count: 0 },
      'Story': { engagement: [], count: 0 },
      'Carousel': { engagement: [], count: 0 }
    }

    posts.forEach(post => {
      // Simple categorization based on caption keywords
      let category = 'Story'
      const caption = (post.caption || '').toLowerCase()

      if (caption.includes('how') || caption.includes('tutorial') || caption.includes('guide')) {
        category = 'Tutorial'
      } else if (caption.includes('behind') || caption.includes('bts') || caption.includes('process')) {
        category = 'Behind-the-Scenes'
      } else if (caption.includes('tip') || caption.includes('trick') || caption.includes('hack')) {
        category = 'Tips & Tricks'
      } else if (post.type === 'carousel') {
        category = 'Carousel'
      }

      if (categories[category]) {
        categories[category].engagement.push(post.engagement || 0)
        categories[category].count += 1
      }
    })

    return Object.entries(categories)
      .filter(([_, data]) => data.count > 0)
      .map(([category, data]) => ({
        category,
        engagement: (data.engagement.reduce((a, b) => a + b, 0) / data.count).toFixed(1),
        count: data.count
      }))
      .sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement))
  }

  /**
   * Helper: Check if word is stopword
   */
  isStopword(word) {
    const stopwords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for']
    return stopwords.includes(word.toLowerCase())
  }

  /**
   * Helper: Prettify topic
   */
  prettifyTopic(topic) {
    return topic
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Fallback trends
   */
  getFallbackTrends(profileData) {
    return {
      trends: [
        { topic: 'Content Creation', score: 9.2, momentum: 'rising' },
        { topic: 'AI & Automation', score: 8.8, momentum: 'rapidly rising' },
        { topic: 'Digital Growth', score: 8.5, momentum: 'stable' }
      ],
      growthRecommendations: [
        'Post 3-4 times per week at peak hours (9-11 AM, 7-9 PM)',
        'Focus on Reels - they get 60% more reach than static posts',
        'Use 20-30 relevant hashtags with mix of popular and niche tags'
      ],
      bestPostingTimes: [
        { day: 'Wednesday', time: '9:00 AM', engagement: '12.5' },
        { day: 'Tuesday', time: '6:00 PM', engagement: '11.8' }
      ],
      viralTopics: [
        { topic: 'Tutorial', avgEngagement: '8.5', posts: 12 },
        { topic: 'Tips', avgEngagement: '7.2', posts: 8 }
      ],
      topPerformingCategories: [
        { category: 'Tutorial', engagement: '9.1', count: 15 },
        { category: 'Carousel', engagement: '8.3', count: 10 }
      ]
    }
  }

  /**
   * Generate AI-powered trend analysis for growth strategy
   */
  async generateAITrendInsights(profileData, analysis, recentPosts) {
    try {
      const trendAnalysis = await aiContentGenerator.generateTrendAnalysis(profileData, analysis)
      return trendAnalysis
    } catch (error) {
      console.error('[AI Trend Insights Error]', error.message)
      return this.getFallbackAIInsights()
    }
  }

  /**
   * Fallback AI insights
   */
  getFallbackAIInsights() {
    return {
      trending: ['Short-form videos', 'Educational content', 'Authentic storytelling'],
      contentGaps: ['Behind-the-scenes content', 'Trending audio usage', 'Collaboration opportunities'],
      viralPatterns: ['First 3 seconds are critical', 'CTA in last 2 seconds', 'Emotional connection drives shares'],
      opportunities: ['Trending sounds on TikTok/Reels', 'Emerging niche communities', 'Cross-platform growth'],
      recommendations: ['Post during peak hours', 'Test new trending formats', 'Engage with community daily']
    }
  }
}

export default new TrendAnalyzer()
