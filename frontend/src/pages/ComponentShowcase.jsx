import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GlassCard,
  AnimatedButton,
  AIStatusBadge,
  ContentCard,
  AnimatedMetric,
  PipelineNode,
  AnimatedPipeline,
  LoadingSkeleton,
} from '../components/ui';
import { Sparkles, Zap, TrendingUp, Copy } from 'lucide-react';

/**
 * ComponentShowcase - Comprehensive UI Component Demo
 * 
 * This page demonstrates all reusable components in the design system
 * Use this as a reference for implementing components in your pages
 */
export const ComponentShowcase = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1023] to-[#111827] overflow-hidden p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Component Showcase
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            Complete UI component library for Phaze AI
          </p>
        </motion.div>

        {/* Section: Glass Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Glass Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard glow hover delay={0}>
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Basic Card</h3>
                <p className="text-white/70">
                  Glassmorphic design with backdrop blur and optional glow effect
                </p>
              </div>
            </GlassCard>

            <GlassCard glow hover delay={0.1}>
              <div className="text-center">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-xl font-bold text-white mb-2">With Glow</h3>
                <p className="text-white/70">
                  Subtle purple glow effect on hover for attention
                </p>
              </div>
            </GlassCard>
          </div>
        </motion.section>

        {/* Section: Buttons */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Animated Buttons</h2>
          <GlassCard>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <AnimatedButton variant="primary" size="sm">
                  Small Primary
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="sm">
                  Small Secondary
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="sm">
                  Small Ghost
                </AnimatedButton>
              </div>

              <div className="flex flex-wrap gap-3">
                <AnimatedButton variant="primary" size="md" icon={Sparkles}>
                  Medium Primary
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="md" icon={Zap}>
                  Medium Secondary
                </AnimatedButton>
              </div>

              <div className="flex flex-wrap gap-3">
                <AnimatedButton variant="primary" size="lg" icon={TrendingUp}>
                  Large Primary Button
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="lg">
                  Large Ghost
                </AnimatedButton>
              </div>

              <div>
                <AnimatedButton
                  variant="primary"
                  size="md"
                  loading={true}
                >
                  Loading State
                </AnimatedButton>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* Section: Status Badges */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">AI Status Badges</h2>
          <GlassCard>
            <div className="flex flex-wrap gap-4">
              <AIStatusBadge status="ready" label="Ready to Process" />
              <AIStatusBadge status="processing" label="AI Processing" />
              <AIStatusBadge status="success" label="Success" />
              <AIStatusBadge status="error" label="Error Occurred" />
            </div>
          </GlassCard>
        </motion.section>

        {/* Section: Content Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Content Cards</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ContentCard
                key={i}
                title={`Hook #${i}`}
                content={`This is an AI-generated hook that captures attention and drives engagement. Hook ${i} has been optimized for maximum virality.`}
                icon={['🎣', '✨', '🚀'][i - 1]}
                tags={['AI Generated', 'Viral', `V${i}`]}
                score={8.5 + i * 0.1}
                onCopy={() => {
                  navigator.clipboard.writeText(`Hook #${i} content`);
                  setCopiedIndex(i);
                  setTimeout(() => setCopiedIndex(null), 2000);
                }}
                onRegenerate={() => alert(`Regenerating hook ${i}...`)}
                delay={0.5 + i * 0.05}
              />
            ))}
          </div>
        </motion.section>

        {/* Section: Animated Metrics */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Animated Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatedMetric
              label="Scripts Generated"
              value={127}
              icon="✏️"
              trend={12}
              format="number"
              delay={0}
            />
            <AnimatedMetric
              label="Success Rate"
              value={96.8}
              suffix="%"
              icon="✓"
              format="number"
              delay={0.1}
            />
            <AnimatedMetric
              label="Active Requests"
              value={15}
              icon="⚡"
              trend={-3}
              format="number"
              delay={0.2}
            />
            <AnimatedMetric
              label="Avg Processing"
              value={4.2}
              suffix="s"
              icon="🚀"
              format="number"
              delay={0.3}
            />
          </div>
        </motion.section>

        {/* Section: Pipeline Visualization */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Agent Pipeline</h2>
          <GlassCard glow>
            <div className="space-y-8">
              <AnimatedPipeline
                nodes={[
                  {
                    icon: '🕷️',
                    label: 'Scraper',
                    status: 'completed',
                    progress: 100,
                  },
                  {
                    icon: '📊',
                    label: 'Analyzer',
                    status: 'completed',
                    progress: 100,
                  },
                  {
                    icon: '✨',
                    label: 'Generator',
                    status: 'processing',
                    progress: 65,
                  },
                  {
                    icon: '🎯',
                    label: 'Optimizer',
                    status: 'idle',
                    progress: 0,
                  },
                ]}
              />

              <div className="text-center">
                <p className="text-white/70 text-sm">
                  Overall Progress: Step 3 of 4
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* Section: Loading States */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <div className="space-y-3">
                <p className="text-white/70 font-medium mb-4">Card Skeleton</p>
                <LoadingSkeleton type="card" count={1} />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="space-y-3">
                <p className="text-white/70 font-medium mb-4">Metric Skeleton</p>
                <LoadingSkeleton type="metric" count={1} />
              </div>
            </GlassCard>
          </div>
        </motion.section>

        {/* Section: Color Palette */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Color System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Primary Purple', color: 'bg-purple-500' },
              { name: 'Primary Pink', color: 'bg-pink-500' },
              { name: 'Secondary Blue', color: 'bg-blue-500' },
              { name: 'Accent Cyan', color: 'bg-cyan-500' },
              { name: 'Dark BG', color: 'bg-[#050816]' },
              { name: 'Glass White', color: 'bg-white/10' },
              { name: 'Success Green', color: 'bg-green-500' },
              { name: 'Error Red', color: 'bg-red-500' },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <div className={`${item.color} w-full h-24 mb-2`} />
                <p className="text-white text-sm font-medium px-3 pb-3">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Typography */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Typography</h2>
          <GlassCard>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 text-sm mb-2">Display (5xl)</p>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Heading Display
                </h1>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-2">Heading (3xl)</p>
                <h2 className="text-3xl font-bold text-white">
                  Section Heading
                </h2>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-2">Body (base)</p>
                <p className="text-white/80">
                  This is body text that appears throughout the application.
                  It maintains excellent readability on dark backgrounds.
                </p>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-2">Label (sm)</p>
                <p className="text-white/70 text-sm">
                  Small label text for secondary information
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* Section: Spacing Reference */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Spacing Guide</h2>
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-400 rounded" />
                <span className="text-white/70 text-sm">Gap 1 (4px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-purple-400 rounded" />
                <span className="text-white/70 text-sm">Gap 4 (16px) - Standard</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-purple-400 rounded" />
                <span className="text-white/70 text-sm">Gap 6 (24px) - Section</span>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center py-12 border-t border-white/10"
        >
          <p className="text-white/60">
            Phaze AI Component Showcase • Build with Modern Design System
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
