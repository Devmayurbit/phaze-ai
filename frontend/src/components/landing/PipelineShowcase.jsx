import { motion } from 'framer-motion'

const pipelineSteps = [
  { label: 'Influencer URL', icon: '🔗' },
  { label: 'Scraper Agent', icon: '🕷️' },
  { label: 'Validator', icon: '✓' },
  { label: 'Writer', icon: '✏️' },
  { label: 'Hook Gen', icon: '✨' },
  { label: 'Results', icon: '🎯' },
]

export default function PipelineShowcase() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            4-Agent Content Pipeline
          </h2>
          <p className="text-lg text-slate-400">
            From raw data to ready-to-post content — fully automated
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <div className="overflow-x-auto mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center min-w-max md:min-w-full gap-4 md:gap-2"
          >
            {pipelineSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="glass-hover w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl text-2xl md:text-3xl"
                >
                  {step.icon}
                </motion.div>
                <p className="hidden md:block text-sm font-medium text-slate-300 w-20">
                  {step.label}
                </p>
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-neon-purple to-transparent" />
                )}
                {index < pipelineSteps.length - 1 && (
                  <div className="md:hidden w-4 h-0.5 bg-gradient-to-r from-neon-purple to-transparent" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Results preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: 'Hooks', count: '5+', color: 'from-neon-purple' },
            { title: 'Scripts', count: '3+', color: 'from-neon-blue' },
            { title: 'Captions', count: '10+', color: 'from-neon-pink' },
            { title: 'Hashtags', count: '20+', color: 'from-neon-cyan' },
          ].map((item, index) => (
            <div
              key={index}
              className={`glass-hover p-6 rounded-xl border-l-4 border-gradient`}
              style={{
                borderImageSource: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              <p className="text-slate-400 text-sm mb-2">{item.title}</p>
              <p className="text-3xl font-bold text-neon-purple">{item.count}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
