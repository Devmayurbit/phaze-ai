export const mockDashboardData = {
  stats: {
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
  },
  influencers: [
    {
      id: 'infl_1',
      username: 'alexcreates',
      platform: 'instagram',
      followers: 125000,
      engagement: 8.5,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'infl_2',
      username: 'techsarah',
      platform: 'youtube',
      followers: 250000,
      engagement: 9.2,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 'infl_3',
      username: 'creative_mike',
      platform: 'twitter',
      followers: 85000,
      engagement: 7.8,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ],
  trends: {
    rising: ['AI Automation', 'Content Automation', 'Creator Tools'],
    viral: ['Productivity Hacks', 'Tech Trends', 'AI News'],
    recommended: [
      'Time-saving AI tools',
      'Content creation workflow',
      'Productivity boosters',
    ],
  },
}

export const mockPipelineAgents = [
  {
    id: 'agent_1',
    name: 'Scraper Agent',
    icon: '🕷️',
    description: 'Collects top-performing content & audience data',
    status: 'completed',
  },
  {
    id: 'agent_2',
    name: 'Validator Agent',
    icon: '✓',
    description: 'Scores topics against real engagement data',
    status: 'completed',
  },
  {
    id: 'agent_3',
    name: 'Writer Agent',
    icon: '✏️',
    description: 'Writes full scripts tailored to your voice',
    status: 'completed',
  },
  {
    id: 'agent_4',
    name: 'Hook Generator',
    icon: '✨',
    description: 'Generates viral hooks & captions',
    status: 'processing',
  },
]

export const mockGeneratedContent = {
  hooks: [
    'This AI tool just saved me 10 hours of work (and it\'s free)',
    'Watch me automate my entire content pipeline in 5 minutes',
    'The future of content creation is here—and it\'s scary',
  ],
  captions: [
    'Just discovered this game-changing tool for creators.',
    'If you\'re still manually creating content, you\'re doing it wrong.',
  ],
  hashtags: ['#AI', '#ContentCreation', '#Automation'],
}
