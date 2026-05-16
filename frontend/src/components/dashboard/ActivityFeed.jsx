import { motion } from 'framer-motion'
import { mockDashboardData } from '../../mock/data'

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-hover p-8 rounded-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {mockDashboardData.stats.recentActivity.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-4 rounded-lg bg-dark-700/50 border border-neon-purple/10 hover:border-neon-purple/30 transition-all"
          >
            <div className="flex-1">
              <p className="text-white font-medium">{activity.action}</p>
              <p className="text-slate-400 text-sm mt-1">{activity.platform}</p>
            </div>
            <span className="text-slate-400 text-sm whitespace-nowrap ml-4">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
