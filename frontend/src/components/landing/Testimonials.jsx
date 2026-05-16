import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Instagram Creator',
    avatar: 'https://i.pravatar.cc/150?img=1',
    quote:
      'Phaze AI saved me 20 hours a week. I can now focus on creating instead of brainstorming.',
  },
  {
    name: 'Sarah Smith',
    role: 'YouTube Creator',
    avatar: 'https://i.pravatar.cc/150?img=2',
    quote: 'The scripts are so good, my audience thinks I doubled my editing team. Best investment.',
  },
  {
    name: 'Mike Johnson',
    role: 'TikTok Creator',
    avatar: 'https://i.pravatar.cc/150?img=3',
    quote: 'My engagement went up 45% in just two weeks. This tool is an absolute game-changer.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-neon-pink opacity-10 rounded-full blur-3xl" />
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
            Loved by Creators Worldwide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-hover p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-neon-purple">
                    ⭐
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
