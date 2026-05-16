import { motion } from 'framer-motion'
import { useState } from 'react'
import StatsCards from './StatsCards'
import GeneratorSection from './GeneratorSection'
import ActivityFeed from './ActivityFeed'

export default function DashboardContent() {
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [niche, setNiche] = useState('')

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark-800/80 backdrop-blur border-b border-neon-purple/10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Ready to create some viral content?</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <StatsCards />

        {/* Generator Section */}
        <GeneratorSection url={url} setUrl={setUrl} platform={platform} setPlatform={setPlatform} niche={niche} setNiche={setNiche} />

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  )
}
