import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for solo creators',
    features: [
      'Up to 50 content generations/month',
      '1 influencer profile',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Creator Pro',
    price: '$99',
    description: 'Most popular for professionals',
    features: [
      'Unlimited generations',
      'Up to 10 influencer profiles',
      'Advanced analytics',
      'Priority support',
      'Custom scripts',
    ],
    highlighted: true,
  },
  {
    name: 'Agency',
    price: 'Custom',
    description: 'For teams and agencies',
    features: [
      'Unlimited everything',
      'Unlimited profiles',
      'Team collaboration',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
    ],
  },
]

export default function Pricing() {
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400">
            Choose the perfect plan for your content needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-hover p-8 rounded-xl transition-all ${
                plan.highlighted ? 'ring-2 ring-neon-purple scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple text-xs font-semibold rounded-full mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-neon-purple">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-slate-400">/month</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-neon-purple mt-1">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'btn-glow text-white'
                    : 'border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
