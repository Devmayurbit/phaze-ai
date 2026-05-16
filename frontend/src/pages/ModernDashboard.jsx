import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { ContentCard } from '../components/ui/ContentCard'
import { AnimatedMetric } from '../components/ui/AnimatedMetric'
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton'
import { Sparkles, TrendingUp, Zap } from 'lucide-react'

function ModernDashboard() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [url, setUrl] = useState('')
  const [niche, setNiche] = useState('Tech & Innovation')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleGenerate = async () => {
    setLoading(true)
    setTimeout(() => {
      setResult({
        profile: {
          username: '@mayurrr.sonwane',
          followers: '74.2K',
          engagement: '10.4%',
          bio: 'Digital entrepreneur | Tech lover | Always learning',
          avatar: '👤',
        },
        hooks: [
          'This one feature just changed everything 🤯',
          'I tested 10 tools, only 1 actually works',
          'The future is here (and it\'s free)',
          'Watch me 10x my productivity with this',
          'They don\'t want you to see this trick',
        ],
        captions: [
          'Just discovered something amazing about Tech content. What I learned will blow your mind 🚀 #Learning #Growth',
          'Sharing my thoughts on Tech content - this is too good to keep to myself 💡 Drop your takes below ⬇️',
          'The more I learn about Tech content, the more I realize how important it is. Here\'s why... 🧵',
        ],
        scripts: [
          {
            title: 'Tech trends Video #1 (60s)',
            content: 'HOOK: Tech trends overview\nBODY: Key points\nCTA: Comment your thoughts',
          },
          {
            title: 'Tech trends Video #2 (60s)',
            content: 'HOOK: More insights\nBODY: Analysis\nCTA: Share your ideas',
          },
        ],
        trends: {
          score: 8.2,
          engagement: 10.4,
          viralTopics: ['AI trends', 'Tech innovation', 'Creator economy'],
          recommendations: [
            'Post more short-form tech tutorial content',
            'Engage with trending developer hashtags',
            'Create comparison videos with competitors',
          ],
        },
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#050816] via-[#0B1023] to-[#111827] overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <GlobalSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="relative z-10 flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AI Content Studio
              </span>
            </h1>
            <p className="text-white/60 text-lg">
              Transform Instagram profiles into viral content with AI
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <AnimatedMetric label="Total Influencers" value={3} icon="👥" format="number" delay={0} />
            <AnimatedMetric label="Scripts Generated" value={127} icon="✏️" trend={12} format="number" delay={0.1} />
            <AnimatedMetric label="Active Requests" value={2} icon="⚡" format="number" delay={0.2} />
            <AnimatedMetric label="Success Rate" value={96.8} suffix="%" icon="✓" format="number" delay={0.3} />
          </motion.div>

          <GlassCard glow className="mb-12" delay={0.4}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Generate AI Content</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Niche / Category
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all cursor-pointer"
                  >
                    <option>Tech & Innovation</option>
                    <option>Lifestyle & Wellness</option>
                    <option>Business & Entrepreneurship</option>
                    <option>Finance & Investing</option>
                    <option>Gaming & Entertainment</option>
                    <option>Fashion & Beauty</option>
                    <option>Food & Cooking</option>
                    <option>Travel & Adventure</option>
                    <option>Fitness & Health</option>
                    <option>Education & Learning</option>
                  </select>
                </div>
              </div>

              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                loading={loading}
                className="w-full md:w-auto"
              >
                Generate with Real AI
              </AnimatedButton>
            </div>
          </GlassCard>

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <GlassCard glow delay={0.5}>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg">
                    {result.profile.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {result.profile.username}
                    </h3>
                    <p className="text-white/70 mb-3">{result.profile.bio}</p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <p className="text-white/60">Followers</p>
                        <p className="text-xl font-bold text-purple-400">
                          {result.profile.followers}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60">Engagement</p>
                        <p className="text-xl font-bold text-pink-400">
                          {result.profile.engagement}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Viral Hooks</h3>
                  </div>
                  {result.hooks.map((hook, i) => (
                    <ContentCard
                      key={i}
                      title={`Hook ${i + 1}`}
                      content={hook}
                      icon="🎣"
                      tags={['AI Generated', 'Viral']}
                      onCopy={() => navigator.clipboard.writeText(hook)}
                      score={8.5 + i * 0.1}
                      delay={0.6 + i * 0.05}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold text-white">AI Captions</h3>
                  </div>
                  {result.captions.map((caption, i) => (
                    <ContentCard
                      key={i}
                      title={`Caption ${i + 1}`}
                      content={caption}
                      icon="📝"
                      tags={['AI Written', 'Optimized']}
                      onCopy={() => navigator.clipboard.writeText(caption)}
                      score={9 + i * 0.1}
                      delay={0.6 + i * 0.05}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Video Scripts</h3>
                {result.scripts.map((script, i) => (
                  <ContentCard
                    key={i}
                    title={script.title}
                    content={script.content}
                    icon="🎥"
                    tags={['60 Second', 'Structured']}
                    onCopy={() => navigator.clipboard.writeText(script.content)}
                    score={8.7 + i * 0.2}
                    expandable
                    delay={0.7 + i * 0.1}
                  />
                ))}
              </div>

              <GlassCard glow delay={0.8}>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">AI Insights</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm mb-2">Trend Score</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {result.trends.score}/10
                      </p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm mb-2">Engagement Potential</p>
                      <p className="text-3xl font-bold text-pink-400">
                        {result.trends.engagement}/10
                      </p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm mb-2">AI Model</p>
                      <p className="text-3xl font-bold text-blue-400">HF</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Trending Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.trends.viralTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 text-sm text-purple-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Growth Recommendations</h4>
                    <ul className="space-y-2">
                      {result.trends.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-2 text-white/80 text-sm">
                          <span className="text-green-400">✓</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <LoadingSkeleton type="card" count={3} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModernDashboard
