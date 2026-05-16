/**
 * ═══════════════════════════════════════════════════════════════════════
 * DYNAMIC PROMPT BUILDER
 * Generates sophisticated, context-aware AI prompts for influencer analysis
 * Creates unique, persona-specific prompts instead of generic templates
 * ═══════════════════════════════════════════════════════════════════════
 */

class DynamicPromptBuilder {
  /**
   * Build personalized hooks prompt (No generic templates)
   * Each prompt is unique to the specific influencer
   */
  buildHooksPrompt(profile, analysis, count = 10) {
    const {
      username,
      followers,
      bio,
      engagementRate = 8.5,
      niche = 'General',
      topKeywords = [],
      contentStyle = 'educational',
      audienceAge = '18-35',
      postingFrequency = 'daily',
    } = { ...profile, ...analysis }

    // Create context-specific hook guidance
    const keywordContext = topKeywords.slice(0, 5).join(', ') || 'industry insights'
    const styleGuide = this.getContentStyleGuide(contentStyle)
    const audienceContext = this.getAudienceContext(audienceAge, niche)

    return `You are a viral content strategist analyzing @${username} (${followers} followers in ${niche}).

INFLUENCER CONTEXT:
- Username: @${username}
- Bio: "${bio}"
- Followers: ${followers}
- Engagement Rate: ${engagementRate}% (${this.assessEngagement(engagementRate)})
- Audience Age: ${audienceAge}
- Posting Frequency: ${postingFrequency}
- Niche: ${niche}
- Top Keywords: ${keywordContext}

AUDIENCE PROFILE:
${audienceContext}

CONTENT STYLE:
${styleGuide}

YOUR TASK:
Generate exactly ${count} UNIQUE viral hooks specifically for @${username}'s audience. Each hook must:
1. Relate to ${keywordContext}
2. Appeal specifically to ${audienceAge} year-olds
3. Match their ${contentStyle} content style
4. Feel authentic to "@${username}'s" brand voice
5. Create curiosity, urgency, or emotional response
6. Be 8-15 words maximum
7. NEVER be generic - make each one unique and specific

OUTPUT:
Return ONLY the hooks themselves, one per line, no numbering, no quotes, no explanations.`
  }

  /**
   * Build personalized captions prompt
   */
  buildCaptionsPrompt(profile, analysis, sampleHooks = [], count = 5) {
    const {
      username,
      niche,
      bio,
      engagementRate = 8.5,
      audienceAge = '18-35',
      topKeywords = [],
      contentStyle = 'educational',
    } = { ...profile, ...analysis }

    const hooks = sampleHooks.slice(0, 2).map(h => `"${h}"`).join(', ')
    const keywords = topKeywords.slice(0, 4).join(', ')

    return `You are a premium Instagram caption writer for @${username}.

CREATOR PROFILE:
- Handle: @${username}
- Niche: ${niche}
- Audience: ${audienceAge} year-olds
- Engagement Rate: ${engagementRate}%
- Style: ${contentStyle}
- Bio: "${bio}"
- Key Topics: ${keywords}

SAMPLE HOOKS USED:
${hooks}

CAPTION REQUIREMENTS:
Generate exactly ${count} unique captions for @${username} that:
1. Complement the hooks above
2. Include 2-3 keywords naturally: ${keywords}
3. Have authentic emoji usage (3-5 emojis max)
4. End with an engagement CTA (question, challenge, poll, etc.)
5. Feel like @${username}'s real voice, not generic
6. Are 150-200 characters each
7. Include value, story, or entertainment
8. Match their ${contentStyle} approach

CAPTION STRUCTURE:
[Hook/Opening] [Story/Value] [Relatability/Ask] [CTA]

OUTPUT:
Return ONLY captions, one per line, no numbering.`
  }

  /**
   * Build personalized scripts prompt
   */
  buildScriptsPrompt(profile, analysis, hooks = [], duration = '60s', count = 3) {
    const {
      username,
      niche,
      engagementRate = 8.5,
      audienceAge = '18-35',
      topKeywords = [],
      contentStyle = 'educational',
      topTopics = [],
    } = { ...profile, ...analysis }

    const durationSec = parseInt(duration) || 60
    const hooks_ = hooks.slice(0, 2).map(h => `"${h}"`).join(' | ')
    const topics = topTopics.slice(0, 3).join(' | ')
    const keywords = topKeywords.slice(0, 5).join(', ')

    return `You are a video scriptwriter for @${username} (${niche}, ${engagementRate}% engagement).

VIDEO CONTEXT:
- Creator: @${username}
- Duration: ${duration}
- Niche: ${niche}
- Audience: ${audienceAge} year-olds
- Engagement Rate: ${engagementRate}%
- Topics: ${topics}
- Keywords: ${keywords}
- Style: ${contentStyle}

SAMPLE HOOKS:
${hooks_}

SCRIPT REQUIREMENTS:
Generate exactly ${count} unique ${duration} video scripts for @${username}:
1. Open with an attention-grabbing hook (first 2 seconds critical)
2. Maintain engagement with pattern interrupts every 10-15 seconds
3. Deliver value/entertainment appropriate to: ${contentStyle}
4. Use natural language - sounds like @${username} talking
5. Include pacing cues: [SLOW], [SPEED UP], [PAUSE]
6. Include visual suggestions: [SHOW X], [CUT TO]
7. Strong CTA at the end
8. ${durationSec === 60 ? '~120 words' : durationSec === 90 ? '~180 words' : '~240 words'}

FORMAT:
[TIME] | [NARRATION] | [VISUAL] | [AUDIO CUE]

EXAMPLE:
[0-2s] "Hook here" | Show creator's face | Trending audio hook
[2-15s] Story/value point | B-roll or demo | Background music
[15-50s] Main content | Key visuals | Consistent audio
[50-${durationSec}s] CTA | Call-to-action | End audio

OUTPUT:
Return ONLY the full script with timestamps, no explanations.`
  }

  /**
   * Build personalized hashtags prompt
   */
  buildHashtagsPrompt(profile, analysis, count = 20) {
    const {
      username,
      followers,
      engagementRate = 8.5,
      niche,
      topKeywords = [],
      audienceSearchTerms = [],
    } = { ...profile, ...analysis }

    const keywords = topKeywords.slice(0, 8).join(', ')
    const searchTerms = audienceSearchTerms.slice(0, 5).join(', ')

    return `You are a hashtag strategy expert optimizing for @${username}.

HASHTAG TARGETING:
- Creator: @${username}
- Followers: ${followers}
- Engagement Rate: ${engagementRate}%
- Niche: ${niche}
- Keywords: ${keywords}
- Audience Searches: ${searchTerms}

STRATEGY:
Generate ${count} optimal hashtags for @${username}:
- 3 High-volume tags (500K-5M posts, 20-30% reach potential)
- 7 Medium-volume tags (50K-500K posts, 40-60% reach potential)
- ${count - 10} Niche tags (<50K posts, 70-90% reach for their audience)

REQUIREMENTS:
1. Each hashtag must match @${username}'s niche: ${niche}
2. Mix trending + evergreen hashtags
3. Include: ${keywords}
4. Target audience searching for: ${searchTerms}
5. No generic hashtags
6. Each tag should attract their specific audience

OUTPUT:
Return ONLY hashtags with # symbol, one per line, no descriptions, no numbering.`
  }

  /**
   * Build trend analysis prompt
   */
  buildTrendAnalysisPrompt(profile, recentPosts = [], analysis = {}) {
    const {
      username,
      followers,
      niche,
      engagementRate = 8.5,
      audienceAge = '18-35',
      topKeywords = [],
    } = { ...profile, ...analysis }

    const postSamples = recentPosts
      .slice(0, 5)
      .map(p => `"${p.caption?.substring(0, 50) || p.description || 'Post'}..."`)
      .join(', ')

    return `You are a trend analyst specializing in ${niche} content.

CREATOR PROFILE:
- Handle: @${username}
- Followers: ${followers}
- Niche: ${niche}
- Engagement Rate: ${engagementRate}%
- Audience: ${audienceAge} year-olds
- Main Topics: ${topKeywords.slice(0, 5).join(', ')}

RECENT POSTS:
${postSamples}

ANALYZE & PROVIDE:

1. TOP 5 TRENDING OPPORTUNITIES in ${niche} (Next 30 days):
   - Trend name
   - Relevance to @${username}'s audience
   - 2-3 ways they can leverage it
   - Predicted lifespan

2. CONTENT GAPS:
   - What topics are underserved?
   - What's trending but @${username} hasn't covered?
   - Unique angles they could explore?

3. GROWTH OPPORTUNITIES:
   - Untapped audience segments
   - Emerging related niches
   - Collaboration opportunities
   - Cross-platform potential

4. AUDIENCE INSIGHTS:
   - What's the audience in ${niche} actually searching for?
   - What problems can @${username} solve?
   - What content keeps them coming back?

5. ACTIONABLE RECOMMENDATIONS:
   - Top 5 content ideas for @${username}
   - Optimal posting strategy
   - Format recommendations (Reels vs. Posts vs. Stories)

OUTPUT:
Provide actionable, specific insights for @${username} in ${niche}.`
  }

  /**
   * Build niche analysis prompt
   */
  buildNicheAnalysisPrompt(bio, recentTopics = [], captions = []) {
    const topicsStr = recentTopics.slice(0, 10).join(', ')
    const captionsSample = captions.slice(0, 3).map(c => `"${c}"`).join(' | ')

    return `Analyze this Instagram creator's profile in detail:

BIO: "${bio}"
RECENT TOPICS: ${topicsStr}
CAPTION SAMPLES: ${captionsSample}

PROVIDE DETAILED ANALYSIS:

1. PRIMARY NICHE: [Specific, not generic]
2. SECONDARY NICHES: [2-3 related areas they cover]
3. AUDIENCE DEMOGRAPHICS: [Age, gender, interests, pain points]
4. BRAND VOICE/TONE: [How they communicate]
5. CORE VALUE PROPOSITION: [What makes them unique - 1 sentence]
6. CONTENT PILLARS: [5-7 main themes/topics they cover]
7. AUDIENCE PAIN POINTS: [What problems their content solves]
8. COMPETITIVE POSITIONING: [How they differentiate]
9. ENGAGEMENT TRIGGERS: [What makes their audience respond]
10. GROWTH POTENTIAL: [Untapped opportunities]

OUTPUT:
Be specific and data-driven. Use the information provided to give real insights.
Format: [LABEL]: [Analysis]`
  }

  /**
   * Helper: Assess engagement level
   */
  assessEngagement(rate) {
    if (rate >= 10) return 'extremely high (top 5% of creators)'
    if (rate >= 8) return 'very high (excellent engagement)'
    if (rate >= 5) return 'good (above average)'
    if (rate >= 2) return 'moderate (average)'
    return 'low (needs improvement)'
  }

  /**
   * Helper: Get content style guide
   */
  getContentStyleGuide(style) {
    const guides = {
      educational: `- Focus on teaching and learning
- Include tips, hacks, or insights
- Make complex topics accessible
- Provide actionable value
- Use "learn," "discover," "understand" language`,

      entertaining: `- Focus on humor, fun, and entertainment
- Use wordplay, jokes, or surprising moments
- Create shareable moments
- Use casual, relatable language
- Prioritize entertainment over education`,

      motivational: `- Focus on inspiration and empowerment
- Use aspirational language
- Include personal stories or transformation
- Create emotional connection
- Call people to action toward goals`,

      lifestyle: `- Focus on daily life and relatability
- Show behind-the-scenes moments
- Share personal experiences
- Use authentic, conversational tone
- Connect with audience on personal level`,

      professional: `- Focus on industry expertise
- Use data and research
- Provide professional insights
- Maintain credibility and authority
- Use clear, structured communication`,
    }

    return guides[style] || guides.educational
  }

  /**
   * Helper: Get audience context
   */
  getAudienceContext(ageRange, niche) {
    const ageGroups = {
      '13-18': 'Gen Z, TikTok-native, value authenticity over perfection, respond to trends',
      '18-25': 'Gen Z/Millennial, digital natives, value relatability and humor',
      '25-35': 'Millennials, interested in self-improvement and practical tips',
      '35-50': 'Gen X, value expertise and credible information',
      '50+': 'Baby Boomers, value clear communication and proven results',
    }

    return `Age: ${ageGroups[ageRange] || ageGroups['18-25']}
Niche Context: People interested in ${niche}
Values: Authenticity, relatability, practical value
Engagement: Prefers native content over ads`
  }

  /**
   * Build comprehensive influencer analysis prompt
   */
  buildInfluencerAnalysisPrompt(profile, recentPosts = []) {
    return `Conduct a comprehensive influencer analysis for @${profile.username}:

Profile: ${JSON.stringify(profile, null, 2)}

Recent Posts Sample:
${recentPosts.slice(0, 5).map((p, i) => `${i + 1}. "${p.caption || p.description || 'Post'}"`).join('\n')}

PROVIDE:
1. Niche Classification
2. Audience Demographics & Psychographics
3. Content Strategy Analysis
4. Engagement Patterns
5. Growth Trajectory
6. Competitive Analysis
7. Monetization Potential
8. Collaboration Fit
9. Recommendations for Growth
10. Risk Assessment

Format: Structured JSON with detailed insights.`
  }
}

export default new DynamicPromptBuilder()
