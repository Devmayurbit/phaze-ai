import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Influencers', value: '3', icon: '👥', color: 'from-neon-purple' },
  { label: 'Scripts Generated', value: '127', icon: '✏️', color: 'from-neon-blue' },
  { label: 'Active Requests', value: '2', icon: '⚡', color: 'from-neon-pink' },
  { label: 'Success Rate', value: '96.8%', icon: '✓', color: 'from-neon-cyan' },
]

export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass-hover p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className="text-3xl font-bold text-gradient">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
