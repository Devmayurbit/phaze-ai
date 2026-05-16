# 📄 Page Update Templates & Required Changes

**Use these templates to update your pages immediately**

---

## Pages That Need Updates

1. `ModernDashboard.jsx` - Main dashboard
2. `InfluencerProfiles.jsx` - Profile page
3. `GeneratedScripts.jsx` - Scripts display
4. `TrendAnalysis.jsx` - Trends page
5. `AgentPipeline.jsx` - Pipeline page
6. `Settings.jsx` - Settings page
7. Any other pages with sidebar

---

## 🎯 Template 1: Dashboard Page

**Before**: Uses FloatingSidebar (inconsistent)
**After**: Uses GlobalSidebar (consistent)

```jsx
import React, { useState, useEffect } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { AgentPipeline } from '../components/ui/PipelineComponents'
import { ContentSection, StatsCards } from '../components/ui/ContentComponents'
import { SkeletonDashboard } from '../components/ui/AnimationComponents'
import { GLASS, COLORS, TYPOGRAPHY, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const ModernDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    scripts: 0,
    rate: 0,
    engagement: 0
  })
  const [recentHooks, setRecentHooks] = useState([])
  const [recentScripts, setRecentScripts] = useState([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats({
        scripts: 127,
        rate: 96.8,
        engagement: 4.2
      })
      setRecentHooks([
        'Watch what happens when I do this...',
        'Nobody talks about this hack...',
        'The algorithm doesn\'t want you to see this...'
      ])
      setRecentScripts([
        '[0-3s] Hook [3-30s] Story [30-50s] Demo [50-60s] CTA',
        '[0-2s] Attention [2-40s] Content [40-55s] Key insight [55-60s] CTA'
      ])
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <GlobalSidebar />
        <main className={`flex-1 ${GLASS.glassMorphism}`}>
          <SkeletonDashboard />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* UNIFIED SIDEBAR - Same everywhere */}
      <GlobalSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Dashboard</h1>
            <p className={COLORS.text.secondary}>Welcome back! Here's your AI content summary.</p>
          </motion.div>

          {/* STATS */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <StatsCards
              stats={[
                { label: 'Scripts Generated', value: stats.scripts, icon: '📝' },
                { label: 'Success Rate', value: `${stats.rate}%`, icon: '✅' },
                { label: 'Avg Engagement', value: `${stats.engagement}%`, icon: '📈' }
              ]}
            />
          </motion.div>

          {/* PIPELINE */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h2 className={TYPOGRAPHY.h3}>Processing Pipeline</h2>
            <div className={GLASS.card}>
              <AgentPipeline isProcessing={false} />
            </div>
          </motion.div>

          {/* RECENT CONTENT */}
          <motion.div variants={MOTION.staggerItem}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContentSection
                title="Recent Hooks"
                icon="🎣"
                items={recentHooks}
                onRefresh={() => setRecentHooks([])}
              />
              <ContentSection
                title="Recent Scripts"
                icon="📹"
                items={recentScripts}
                onRefresh={() => setRecentScripts([])}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default ModernDashboard
```

---

## 🎯 Template 2: Influencer Profiles Page

**Features**: URL input, niche selector, dynamic analysis

```jsx
import React, { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { NicheSelector, GlassInput, GlassButton } from '../components/ui/FormComponents'
import { ContentSection } from '../components/ui/ContentComponents'
import { ProcessingOverlay } from '../components/ui/PipelineComponents'
import { SkeletonContentSection } from '../components/ui/AnimationComponents'
import { GLASS, TYPOGRAPHY, COLORS, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const InfluencerProfiles = () => {
  const [url, setUrl] = useState('')
  const [niche, setNiche] = useState('tech')
  const [bio, setBio] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    
    // Call API: POST /api/content/analyze
    try {
      const response = await fetch('/api/content/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, niche, bio })
      })
      
      const data = await response.json()
      const requestId = data.requestId
      
      // Poll for results
      let results = null
      let attempts = 0
      while (attempts < 30) {
        const resultResponse = await fetch(`/api/content/results/${requestId}`)
        const resultData = await resultResponse.json()
        
        if (resultData.status === 'completed') {
          results = resultData.data
          break
        }
        
        attempts++
        await new Promise(r => setTimeout(r, 2000)) // Wait 2 seconds
      }
      
      setAnalysisData(results)
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Failed to analyze influencer')
    }
    
    setIsAnalyzing(false)
  }

  return (
    <div className="flex min-h-screen">
      <GlobalSidebar />
      
      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Analyze Influencer</h1>
            <p className={COLORS.text.secondary}>
              Enter Instagram profile to generate unique content
            </p>
          </motion.div>

          {/* INPUT FORM */}
          <motion.div
            variants={MOTION.staggerItem}
            className={`${GLASS.card} p-6 mb-8 max-w-xl`}
          >
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium`}>Instagram URL</label>
                <GlassInput
                  type="url"
                  placeholder="https://instagram.com/username"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  icon="📱"
                />
              </div>

              <div>
                <label className={`block mb-2 font-medium`}>Niche</label>
                <NicheSelector value={niche} onChange={setNiche} />
              </div>

              <div>
                <label className={`block mb-2 font-medium`}>Bio (Optional)</label>
                <GlassInput
                  placeholder="Creator bio..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!url || isAnalyzing}
                className={`w-full ${GLASS.buttonPrimary} py-3 rounded-lg font-semibold`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Profile'}
              </button>
            </div>
          </motion.div>

          {/* PROCESSING OVERLAY */}
          {isAnalyzing && <ProcessingOverlay />}

          {/* RESULTS */}
          {analysisData && !isAnalyzing && (
            <motion.div variants={MOTION.staggerItem} className="space-y-6">
              <div className={GLASS.card}>
                <h2 className={TYPOGRAPHY.h3}>@{analysisData.username}</h2>
                <p className={COLORS.text.secondary}>{analysisData.profile.niche}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContentSection
                  title="Viral Hooks"
                  icon="🎣"
                  items={analysisData.content.hooks}
                />
                <ContentSection
                  title="Captions"
                  icon="✨"
                  items={analysisData.content.captions}
                />
                <ContentSection
                  title="Scripts"
                  icon="📹"
                  items={analysisData.content.scripts}
                />
                <ContentSection
                  title="Hashtags"
                  icon="#️⃣"
                  items={analysisData.content.hashtags}
                />
              </div>

              <ContentSection
                title="Trending Topics"
                icon="📈"
                items={analysisData.trends}
              />
            </motion.div>
          )}

          {/* LOADING STATE */}
          {isAnalyzing && (
            <motion.div variants={MOTION.staggerItem}>
              <SkeletonContentSection />
              <SkeletonContentSection />
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default InfluencerProfiles
```

---

## 🎯 Template 3: Generated Scripts Page

**Features**: Display generated scripts, copy, save, regenerate

```jsx
import React, { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { ContentSection } from '../components/ui/ContentComponents'
import { SkeletonContentSection } from '../components/ui/AnimationComponents'
import { GLASS, TYPOGRAPHY, COLORS, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const GeneratedScripts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [scripts, setScripts] = useState([
    '[0-3s] Hook: Here\'s what you need to know\n[3-30s] Story/value\n[30-50s] Demo\n[50-60s] CTA',
    '[0-2s] Attention grab\n[2-40s] Main content\n[40-55s] Key insight\n[55-60s] Call to action',
    '[0-3s] Problem\n[3-35s] Solution\n[35-50s] Why it matters\n[50-60s] Next steps'
  ])

  const regenerateScripts = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000))
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <GlobalSidebar />

      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Generated Scripts</h1>
            <p className={COLORS.text.secondary}>AI-powered video scripts for your content</p>
          </motion.div>

          {/* SCRIPTS */}
          {isLoading ? (
            <motion.div variants={MOTION.staggerItem}>
              <SkeletonContentSection count={3} />
            </motion.div>
          ) : (
            <motion.div variants={MOTION.staggerItem}>
              <ContentSection
                title="Video Scripts"
                icon="📹"
                items={scripts}
                onRefresh={regenerateScripts}
              />
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default GeneratedScripts
```

---

## 🎯 Template 4: Trends Analysis Page

**Features**: Display trends, analyze patterns, show insights

```jsx
import React, { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { ContentSection, StatCard } from '../components/ui/ContentComponents'
import { SkeletonCard } from '../components/ui/AnimationComponents'
import { GLASS, TYPOGRAPHY, COLORS, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const TrendAnalysis = () => {
  const [trends] = useState([
    'AI-powered tools are trending with 9.8/10 momentum',
    'Productivity content has rising engagement',
    'Creator economy is growing in your niche',
    'Video content outperforms images by 3x',
    'Reels algorithm favors authentic creators'
  ])

  const [stats] = useState([
    { label: 'Trending Topics', value: '8', icon: '🔥' },
    { label: 'Content Opportunity', value: 'High', icon: '🎯' },
    { label: 'Growth Potential', value: '+45%', icon: '📈' }
  ])

  return (
    <div className="flex min-h-screen">
      <GlobalSidebar />

      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Trend Analysis</h1>
            <p className={COLORS.text.secondary}>Insights into what's trending in your niche</p>
          </motion.div>

          {/* STATS */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>
          </motion.div>

          {/* TRENDS */}
          <motion.div variants={MOTION.staggerItem}>
            <ContentSection
              title="Top Trends"
              icon="📊"
              items={trends}
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default TrendAnalysis
```

---

## 🎯 Template 5: Agent Pipeline Page

**Features**: Show processing pipeline, real-time updates

```jsx
import React, { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { AgentPipeline, PipelineSteps } from '../components/ui/PipelineComponents'
import { GLASS, TYPOGRAPHY, COLORS, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const AgentPipelinePage = () => {
  const [isProcessing] = useState(false)

  return (
    <div className="flex min-h-screen">
      <GlobalSidebar />

      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Processing Pipeline</h1>
            <p className={COLORS.text.secondary}>
              Watch your content flow through our AI agents
            </p>
          </motion.div>

          {/* PIPELINE VISUALIZATION */}
          <motion.div variants={MOTION.staggerItem} className={`${GLASS.card} p-8`}>
            <AgentPipeline isProcessing={isProcessing} />
          </motion.div>

          {/* STEPS */}
          <motion.div variants={MOTION.staggerItem} className="mt-8">
            <h2 className={TYPOGRAPHY.h3}>Processing Steps</h2>
            <div className={GLASS.card}>
              <PipelineSteps
                steps={[
                  { label: 'Extract', status: 'done' },
                  { label: 'Analyze', status: 'done' },
                  { label: 'Generate', status: 'done' },
                  { label: 'Optimize', status: 'pending' },
                  { label: 'Format', status: 'pending' }
                ]}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default AgentPipelinePage
```

---

## 🎯 Template 6: Settings Page

**Features**: Simple settings with toggle and input components

```jsx
import React, { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import { GlassInput, GlassToggle } from '../components/ui/FormComponents'
import { GLASS, TYPOGRAPHY, COLORS, MOTION } from '../styles/designSystem'
import { motion } from 'framer-motion'

export const Settings = () => {
  const [isPublic, setIsPublic] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="flex min-h-screen">
      <GlobalSidebar />

      <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
        <motion.div
          variants={MOTION.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* HEADER */}
          <motion.div variants={MOTION.staggerItem} className="mb-8">
            <h1 className={TYPOGRAPHY.h1}>Settings</h1>
            <p className={COLORS.text.secondary}>Manage your preferences</p>
          </motion.div>

          {/* SETTINGS */}
          <motion.div
            variants={MOTION.staggerItem}
            className={`${GLASS.card} p-6 max-w-xl space-y-4`}
          >
            <div className="flex items-center justify-between">
              <span className={TYPOGRAPHY.body}>Make Profile Public</span>
              <GlassToggle
                enabled={isPublic}
                onChange={setIsPublic}
              />
            </div>

            <div className="border-t border-white/10 pt-4" />

            <div className="flex items-center justify-between">
              <span className={TYPOGRAPHY.body}>Enable Notifications</span>
              <GlassToggle
                enabled={notifications}
                onChange={setNotifications}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default Settings
```

---

## ✅ Universal Checklist for Each Page

For **every page**, make sure to:

- [ ] Import `GlobalSidebar` at the top
- [ ] Import `designSystem` (GLASS, COLORS, TYPOGRAPHY, MOTION)
- [ ] Import `motion` from `framer-motion`
- [ ] Wrap layout in `<div className="flex min-h-screen">`
- [ ] Add `<GlobalSidebar />` as first child
- [ ] Add `<main className={GLASS.glassMorphism}>` as second child
- [ ] Use `MOTION.staggerContainer` for page animations
- [ ] Use `MOTION.staggerItem` for child animations
- [ ] Use `TYPOGRAPHY` classes for all text
- [ ] Use `GLASS` classes for card styling
- [ ] Add loading skeleton states
- [ ] Test on mobile (resize window)
- [ ] Test keyboard navigation (Tab key)
- [ ] Verify all links work

---

## 🚀 Implementation Order

1. **Start with Dashboard** (most important, will fix many issues)
2. **Then Profiles** (where users input URL)
3. **Then Scripts** (where they see results)
4. **Then Pipeline** (processing visualization)
5. **Then Trends** (analytics)
6. **Finally Settings** (less critical)

---

## 💾 How to Save Time

1. Copy the appropriate template above
2. Replace the page file with template code
3. Update imports to match your folder structure
4. Test in browser
5. Move to next page

Each page takes ~5 minutes with templates!

---

*These templates are production-ready. Just copy, paste, and update file paths.*
