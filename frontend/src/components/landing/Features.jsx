import { motion } from 'framer-motion'

const features = [
  {
    icon: '🕷️',
    title: 'Smart Scraper',
    description: 'Analyzes trending content and audience data in real-time',
  },
  {
    icon: '✓',
    title: 'Trend Validation',
    description: 'Scores content ideas against real engagement metrics',
  },
  {
    icon: '✏️',
    title: 'Script Writer',
    description: 'Generates tailored scripts for any platform or duration',
  },
  {
    icon: '✨',
    title: 'Hook Generator',
    description: 'Creates viral hooks and captions optimized for engagement',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Real-time performance tracking and growth insights',
  },
  {
    icon: '🚀',
    title: 'Growth Recommendations',
    description: 'AI-powered strategies to scale your audience',
  },
]

export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-40 left-10 w-64 h-64 bg-neon-purple opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Powered by Autonomous AI Agents
          </h2>
          <p className="text-lg text-slate-400">
            Six specialized agents working together to create your content
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-hover p-6 rounded-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
