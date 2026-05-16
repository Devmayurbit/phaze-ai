import { motion } from 'framer-motion'
import { useState } from 'react'
import { influencerAPI } from '../../services/api'

export default function GeneratorSection({ url, setUrl, platform, setPlatform, niche, setNiche }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [requestId, setRequestId] = useState(null)
  const [pollingStatus, setPollingStatus] = useState('')

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Please enter an influencer URL')
      return
    }

    if (!niche.trim()) {
      setError('Please select a niche')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)
    setPollingStatus('Starting real AI pipeline...')

    try {
      // Submit influencer - returns request ID
      const submitResponse = await influencerAPI.submit({
        url: url.trim(),
        platform,
        niche: niche.trim(),
      })

      const id = submitResponse.data.id
      setRequestId(id)
      console.log('Generation started with ID:', id)

      // Poll for results
      pollForResults(id)
    } catch (err) {
      setError('Failed to start generation. Please try again.')
      console.error(err)
      setLoading(false)
    }
  }

  const pollForResults = async (id) => {
    let attempts = 0
    const maxAttempts = 120 // 2 minutes with 1s intervals

    const poll = async () => {
      attempts++
      setPollingStatus(`Processing... (${attempts}s)`)

      try {
        const response = await influencerAPI.getContent(id)

        if (response.data.status === 'completed') {
          setResult(response.data)
          setPollingStatus('')
          setLoading(false)
          console.log('Generation completed:', response.data)
          return
        }

        if (attempts < maxAttempts) {
          setTimeout(poll, 1000)
        } else {
          setError('Generation timeout. Please try again.')
          setLoading(false)
        }
      } catch (err) {
        if (attempts < maxAttempts) {
          setTimeout(poll, 1000)
        } else {
          setError('Failed to fetch results. Please try again.')
          setLoading(false)
        }
      }
    }

    poll()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Input Section */}
      <div className="glass-hover p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-6">🚀 Generate AI Content</h2>

        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-neon-purple/20 text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple transition-colors"
              disabled={loading}
            />
          </div>

          {/* Platform & Niche */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple transition-colors"
                disabled={loading}
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter/X</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Niche / Category</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-neon-purple/20 text-white focus:outline-none focus:border-neon-purple transition-colors cursor-pointer"
                disabled={loading}
              >
                <option value="">Select niche...</option>
                <option value="Tech">Tech & Innovation</option>
                <option value="Lifestyle">Lifestyle & Wellness</option>
                <option value="Business">Business & Entrepreneurship</option>
                <option value="Finance">Finance & Investing</option>
                <option value="Gaming">Gaming & Entertainment</option>
                <option value="Fashion">Fashion & Beauty</option>
                <option value="Food">Food & Cooking</option>
                <option value="Travel">Travel & Adventure</option>
                <option value="Fitness">Fitness & Health</option>
                <option value="Education">Education & Learning</option>
                <option value="Sports">Sports & Recreation</option>
                <option value="Parenting">Parenting & Family</option>
                <option value="DIY">DIY & Home Improvement</option>
                <option value="Music">Music & Arts</option>
                <option value="Productivity">Productivity & Self-Help</option>
                <option value="RealEstate">Real Estate & Property</option>
                <option value="Automotive">Automotive & Transportation</option>
                <option value="Photography">Photography & Visual Arts</option>
                <option value="Gardening">Gardening & Outdoors</option>
                <option value="Pets">Pets & Animals</option>
                <option value="Relationships">Relationships & Dating</option>
                <option value="Personal Finance">Personal Finance & Money</option>
                <option value="Career">Career & Professional Development</option>
                <option value="Mental Health">Mental Health & Wellness</option>
                <option value="Hobbies">Hobbies & Collectibles</option>
                <option value="Writing">Writing & Content Creation</option>
                <option value="Social">Social & Community</option>
                <option value="Sustainability">Sustainability & Eco-Friendly</option>
              </select>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 bg-neon-pink/10 border border-neon-pink/30 rounded-lg text-neon-pink text-sm">
              {error}
            </div>
          )}

          {/* Status message */}
          {loading && pollingStatus && (
            <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-lg text-neon-purple text-sm animate-pulse">
              {pollingStatus}
            </div>
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full btn-glow text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '⏳ Analyzing Profile & Generating AI Content...' : '✨ Generate with Real AI'}
          </motion.button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Profile Info */}
          {result.influencer && (
            <div className="glass-hover p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={result.influencer.avatar}
                  alt={result.influencer.username}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">@{result.influencer.username}</h3>
                  <p className="text-slate-400 text-sm">{result.influencer.fullName}</p>
                  <p className="text-neon-purple mt-1">
                    👥 {(result.influencer.followers / 1000).toFixed(0)}K followers • 📊 {result.influencer.engagement.toFixed(1)}% engagement
                  </p>
                </div>
              </div>
              <p className="text-slate-300">{result.influencer.biography}</p>
            </div>
          )}

          {/* Generated Content */}
          {result.content && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hooks */}
              {result.content.hooks && result.content.hooks.length > 0 && (
                <div className="glass-hover p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-neon-pink mb-4">🎣 Viral Hooks (AI Generated)</h4>
                  <div className="space-y-3">
                    {result.content.hooks.map((hook, i) => (
                      <div key={i} className="p-3 bg-dark-700 rounded-lg text-sm text-slate-200 border-l-2 border-neon-pink">
                        {hook}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hashtags */}
              {result.content.hashtags && result.content.hashtags.length > 0 && (
                <div className="glass-hover p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-neon-purple mb-4">#️⃣ Trending Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.content.hashtags.slice(0, 15).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-dark-700 text-neon-purple rounded-full text-sm border border-neon-purple/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Captions */}
              {result.content.captions && result.content.captions.length > 0 && (
                <div className="glass-hover p-6 rounded-xl md:col-span-2">
                  <h4 className="text-lg font-bold text-neon-purple mb-4">📝 AI-Generated Captions</h4>
                  <div className="space-y-4">
                    {result.content.captions.map((caption, i) => (
                      <div key={i} className="p-4 bg-dark-700 rounded-lg text-slate-200 border border-neon-purple/20">
                        <p className="text-xs text-neon-purple mb-2">Caption {i + 1}</p>
                        <p>{caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scripts */}
              {result.content.scripts && result.content.scripts.length > 0 && (
                <div className="glass-hover p-6 rounded-xl md:col-span-2">
                  <h4 className="text-lg font-bold text-neon-pink mb-4">🎬 AI Video Scripts</h4>
                  <div className="space-y-4">
                    {result.content.scripts.map((script, i) => (
                      <div key={i} className="p-4 bg-dark-700 rounded-lg text-slate-200 border border-neon-pink/20">
                        <p className="text-sm font-bold text-neon-pink mb-2">
                          {script.title} ({script.duration})
                        </p>
                        <p className="text-xs whitespace-pre-wrap text-slate-300">{script.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Scores */}
          {result.content && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-hover p-4 rounded-xl text-center">
                <p className="text-slate-400 text-sm mb-1">Trend Score</p>
                <p className="text-2xl font-bold text-neon-purple">{result.content.trendScore}/10</p>
              </div>
              <div className="glass-hover p-4 rounded-xl text-center">
                <p className="text-slate-400 text-sm mb-1">Engagement Potential</p>
                <p className="text-2xl font-bold text-neon-pink">{result.content.engagementScore}/10</p>
              </div>
              <div className="glass-hover p-4 rounded-xl text-center">
                <p className="text-slate-400 text-sm mb-1">AI Model</p>
                <p className="text-2xl font-bold text-neon-purple">HF 🤖</p>
              </div>
            </div>
          )}

          {/* Recent Posts Analysis */}
          {result.recentPosts && result.recentPosts.length > 0 && (
            <div className="glass-hover p-6 rounded-xl">
              <h4 className="text-lg font-bold text-white mb-4">📊 Recent Posts Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neon-purple/20">
                      <th className="text-left py-2 px-2 text-neon-purple">Caption</th>
                      <th className="text-right py-2 px-2 text-neon-purple">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.recentPosts.slice(0, 5).map((post, i) => (
                      <tr key={i} className="border-b border-dark-700">
                        <td className="py-3 px-2 text-slate-300 truncate">{post.caption?.substring(0, 50)}...</td>
                        <td className="py-3 px-2 text-right text-neon-pink font-semibold">{post.engagement?.toFixed(1) || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trends */}
          {result.trends && (
            <div className="glass-hover p-6 rounded-xl">
              <h4 className="text-lg font-bold text-white mb-4">📈 Trend Analysis (Real ML)</h4>
              <div className="space-y-3">
                {result.trends.trends?.slice(0, 5).map((trend, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{trend.topic}</p>
                      <p className="text-xs text-slate-400">{trend.momentum}</p>
                    </div>
                    <p className="text-xl font-bold text-neon-purple">{trend.score.toFixed(1)}</p>
                  </div>
                ))}
              </div>

              {result.trends.growthRecommendations && (
                <div className="mt-6 pt-6 border-t border-neon-purple/20">
                  <h5 className="font-semibold text-neon-purple mb-3">💡 Growth Recommendations</h5>
                  <ul className="space-y-2">
                    {result.trends.growthRecommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-neon-pink mt-1">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
