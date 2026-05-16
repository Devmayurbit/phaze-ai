import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { GlassCard } from '../components/ui/GlassCard';
import { Sparkles, Zap, TrendingUp, BarChart3 } from 'lucide-react';

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 100, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-1 h-1 bg-purple-500/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const ModernLanding = () => {
  const features = [
    {
      icon: '🎣',
      title: 'Viral Hook Generation',
      description: 'AI-powered hooks that stop scrolls and drive engagement',
    },
    {
      icon: '📝',
      title: 'Smart Caption Writing',
      description: 'Context-aware captions optimized for your niche and audience',
    },
    {
      icon: '🎬',
      title: 'Video Script Studio',
      description: 'Complete video scripts with structure, pacing, and CTAs',
    },
    {
      icon: '📈',
      title: 'Trend Analysis',
      description: 'Real-time trend analysis and growth recommendations',
    },
    {
      icon: '⚡',
      title: 'Agent Pipeline',
      description: 'Automated workflow with intelligent agents processing your content',
    },
    {
      icon: '🤖',
      title: 'AI Models',
      description: 'Powered by state-of-the-art LLaMA and NLP models',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Content Generated', icon: '✨' },
    { number: '98%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '5sec', label: 'Generation Time', icon: '⚡' },
    { number: '24/7', label: 'Always Available', icon: '🌙' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1023] to-[#111827] overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Phaze AI
            </motion.h1>
            <Link to="/dashboard">
              <AnimatedButton variant="primary" size="sm">
                Get Started
              </AnimatedButton>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-sm text-purple-300 font-medium">
                  ✨ Powered by AI & Machine Learning
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Turn Instagram Profiles
                </span>
                <br />
                <span className="text-white">Into Viral Content</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
                Generate AI-powered hooks, captions, scripts, and trend analysis in seconds. 
                Powered by Hugging Face and real-time Instagram data.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/dashboard">
                  <AnimatedButton variant="primary" size="lg" icon={Sparkles}>
                    Start Creating
                  </AnimatedButton>
                </Link>
                <AnimatedButton variant="secondary" size="lg">
                  Watch Demo
                </AnimatedButton>
              </div>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all"
                >
                  <p className="text-2xl mb-1">{stat.icon}</p>
                  <p className="text-2xl font-bold text-purple-400">{stat.number}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-white/60">
                Everything you need to create viral content
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <GlassCard
                  key={i}
                  glow
                  delay={0.4 + i * 0.05}
                  className="group cursor-default"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                How It Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Input Profile', desc: 'Enter an Instagram URL' },
                { num: '02', title: 'AI Analysis', desc: 'Our agents analyze content' },
                { num: '03', title: 'Generate Content', desc: 'AI creates viral content' },
                { num: '04', title: 'Get Results', desc: 'Copy and post instantly' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                      <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                        {step.num}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {step.desc}
                      </p>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                        <div className="text-2xl text-purple-500">→</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl" />
              <GlassCard glow className="relative text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Create Viral Content?
                </h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                  Join creators using Phaze AI to generate unlimited viral content
                </p>
                <Link to="/dashboard">
                  <AnimatedButton variant="primary" size="lg" icon={Sparkles}>
                    Start Free Today
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-xl bg-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center text-white/60 text-sm">
            <p>© 2024 Phaze AI. Powered by Hugging Face & Real Instagram Data.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernLanding;
