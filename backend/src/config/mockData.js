export const mockInfluencerData = {
  id: 'infl_123',
  username: 'alexcreates',
  platform: 'instagram',
  followers: 125000,
  engagement: 8.5,
  niche: 'Tech & Lifestyle',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: 'Tech enthusiast and content creator',
  analytics: {
    recentPostCount: 42,
    averageEngagement: 8.5,
    topicsOfInterest: ['Technology', 'Productivity', 'AI', 'Startups'],
  },
}

export const mockGeneratedContent = {
  hooks: [
    'This AI tool just saved me 10 hours of work (and it\'s free)',
    'Watch me automate my entire content pipeline in 5 minutes',
    'The future of content creation is here—and it\'s scary',
    'I tested 15 AI tools, only 1 actually works',
    'This one feature is worth $500/month alone',
  ],
  captions: [
    'Just discovered this game-changing tool for creators. The automation is insane. 🚀',
    'If you\'re still manually creating content in 2024, you\'re doing it wrong. Here\'s why →',
    'This AI analyzed my audience in seconds and gave me insights I never would have found.',
    'Creators: this will change your workflow. Marketers: this will change your ROI.',
  ],
  scripts: [
    {
      title: '60-Second Product Demo',
      content: 'Hook: [Opening hook from list above]\n\nBody:\n- Problem statement (5s)\n- Solution intro (10s)\n- Demo/Walkthrough (30s)\n- CTA (10s)\n- Outro (5s)',
      duration: '60s',
    },
    {
      title: '15-Second Viral Hook',
      content: 'Hook: [Opening hook]\n- Immediate value prop (5s)\n- Quick demo (8s)\n- CTA (2s)',
      duration: '15s',
    },
    {
      title: '3-Minute Deep Dive',
      content: 'Hook + Intro (30s)\nSection 1: Problem (45s)\nSection 2: Solution (60s)\nSection 3: Implementation (30s)\nOutro + CTA (15s)',
      duration: '3:00',
    },
  ],
  hashtags: [
    '#AI',
    '#ContentCreation',
    '#Automation',
    '#CreatorEconomy',
    '#TechTools',
    '#ProductivityTips',
    '#StartupLife',
    '#ArtificialIntelligence',
  ],
  trendScore: 8.7,
  engagementScore: 9.2,
}

export const mockTrendAnalysis = {
  trends: [
    { topic: 'AI Automation', score: 9.8, momentum: 'rapidly rising' },
    { topic: 'Content Automation', score: 9.5, momentum: 'rising' },
    { topic: 'Creator Tools', score: 8.9, momentum: 'stable' },
    { topic: 'Productivity Hacks', score: 8.5, momentum: 'rising' },
  ],
  growthRecommendations: [
    'Post 3-4 times per week at optimal times (Tue, Wed, Thu)',
    'Focus on tech-savvy audience (25-45 age group)',
    'Create 60-second demo videos (highest engagement)',
    'Use trending hashtags: #AIRevolution #CreatorTools #ProductivityTips',
    'Engage with similar creators in tech/productivity space',
  ],
  bestPostingTimes: [
    { day: 'Tuesday', time: '9:00 AM', engagement: 12.5 },
    { day: 'Wednesday', time: '6:00 PM', engagement: 11.8 },
    { day: 'Thursday', time: '10:00 AM', engagement: 10.9 },
  ],
  topPerformingCategories: [
    { category: 'Tutorial', engagement: 12.3, count: 15 },
    { category: 'Demo', engagement: 11.8, count: 22 },
    { category: 'Tips & Tricks', engagement: 10.5, count: 18 },
  ],
  viralTopicSuggestions: [
    'Time-saving AI tools comparison',
    'Content creation workflow automation',
    'How to 10x your productivity with AI',
    'The future of creator economy',
  ],
}

export const mockAnalytics = {
  scriptsGenerated: 127,
  hooksGenerated: 584,
  captionsGenerated: 231,
  hashtagsGenerated: 892,
  totalRequests: 1234,
  successRate: 96.8,
  averageProcessingTime: 4.2,
  apiUsage: {
    scraper: 1234,
    validator: 1200,
    writer: 1100,
    hookGenerator: 1080,
  },
}

export const mockAgentPipeline = {
  agents: [
    {
      id: 'agent_1',
      name: 'Scraper Agent',
      icon: 'spider',
      description: 'Collects top-performing content & audience data',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000000),
    },
    {
      id: 'agent_2',
      name: 'Validator Agent',
      icon: 'check',
      description: 'Scores topics against real engagement data',
      status: 'completed',
      timestamp: new Date(Date.now() - 500000),
    },
    {
      id: 'agent_3',
      name: 'Writer Agent',
      icon: 'pencil',
      description: 'Writes full scripts tailored to your voice',
      status: 'completed',
      timestamp: new Date(Date.now() - 200000),
    },
    {
      id: 'agent_4',
      name: 'Hook Generator',
      icon: 'sparkles',
      description: 'Generates viral hooks & captions',
      status: 'processing',
      timestamp: new Date(),
    },
  ],
}

export const mockDashboardStats = {
  totalInfluencers: 3,
  totalScriptsGenerated: 127,
  activeRequests: 2,
  successRate: 96.8,
  recentActivity: [
    {
      id: 1,
      action: 'Generated content for @alexcreates',
      platform: 'Instagram',
      time: '2 mins ago',
    },
    {
      id: 2,
      action: 'Trend analysis completed',
      platform: 'YouTube',
      time: '15 mins ago',
    },
    {
      id: 3,
      action: 'New influencer profile added',
      platform: 'Twitter',
      time: '1 hour ago',
    },
  ],
}
