# Phaze AI - Modern UI/UX Design System

## Overview

Phaze AI has been redesigned with a premium modern SaaS aesthetic inspired by Linear, Vercel, Perplexity, and Arc Browser. The design system uses glassmorphism, smooth animations, and a futuristic AI dashboard feel.

## Design Principles

### Color Palette
- **Background**: `#050816`, `#0B1023`, `#111827` (ultra-dark)
- **Primary Accent**: Purple gradient (`#a855f7` → `#ec4899`)
- **Secondary Accent**: Blue/Cyan (`#3b82f6` → `#06b6d4`)
- **Glass Effect**: `bg-white/5` with `backdrop-blur-xl`
- **Borders**: `border-white/10` with hover to `border-white/20`

### Typography
- **Display**: Bold, gradient text for headers
- **Body**: Clean, readable white/white-80 on dark backgrounds
- **Labels**: Small, uppercase, white/60 secondary text

### Spacing & Layout
- **Card Padding**: 24px (6 in Tailwind)
- **Gap Between Elements**: 16px (4 in Tailwind)
- **Border Radius**: Generous 24px (rounded-2xl) on cards
- **Responsive Breakpoint**: 768px (md in Tailwind)

## Component Library

### 1. **GlassCard** - Base Container Component

```jsx
import { GlassCard } from './components/ui/GlassCard';

<GlassCard 
  glow={true}          // Add subtle glow effect
  hover={true}         // Lift on hover
  delay={0.2}          // Stagger animation
>
  Your content here
</GlassCard>
```

**Features:**
- Glassmorphic design with backdrop blur
- Optional glow effect and hover animations
- Staggered entrance animations
- Responsive padding

---

### 2. **AnimatedButton** - Interactive Button Component

```jsx
import { AnimatedButton } from './components/ui/AnimatedButton';
import { Sparkles } from 'lucide-react';

<AnimatedButton
  variant="primary"     // primary | secondary | ghost
  size="md"            // sm | md | lg
  loading={false}      // Shows spinner
  disabled={false}
  icon={Sparkles}      // Optional icon from lucide-react
  onClick={handleClick}
>
  Click Me
</AnimatedButton>
```

**Variants:**
- `primary`: Gradient purple-to-pink with glow
- `secondary`: Subtle white/10 background
- `ghost`: Minimal, hover only

---

### 3. **AIStatusBadge** - Status Indicator

```jsx
import { AIStatusBadge } from './components/ui/AIStatusBadge';

<AIStatusBadge 
  status="processing"   // processing | success | error | ready
  label="AI Processing"
/>
```

**Statuses:**
- `processing`: Blue with pulsing animation
- `success`: Green checkmark
- `error`: Red X
- `ready`: Purple sparkle

---

### 4. **ContentCard** - Content Display Card

```jsx
import { ContentCard } from './components/ui/ContentCard';

<ContentCard
  title="Viral Hook #1"
  content="This one feature just changed everything 🤯"
  icon="🎣"
  tags={['AI Generated', 'Viral']}
  score={8.5}
  expandable={true}
  onCopy={(content) => navigator.clipboard.writeText(content)}
  onRegenerate={() => handleRegenerate()}
/>
```

**Features:**
- Copy button (with clipboard feedback)
- Regenerate action
- Expandable content
- Score display
- Tag badges
- Smooth animations

---

### 5. **AnimatedMetric** - Dashboard Stat Card

```jsx
import { AnimatedMetric } from './components/ui/AnimatedMetric';

<AnimatedMetric
  label="Scripts Generated"
  value={127}
  suffix=""
  icon="✏️"
  trend={12}           // Positive trend percentage
  format="number"      // number | text
  delay={0.1}
/>
```

**Features:**
- Animated number counter
- Trend indicator (up/down with %)
- Progress bar
- Icon + label
- Gradient text

---

### 6. **FloatingSidebar** - Navigation

```jsx
import { FloatingSidebar } from './components/layout/FloatingSidebar';

<FloatingSidebar />
```

**Features:**
- Collapsible desktop sidebar
- Mobile drawer navigation
- Active state with glow animation
- Magnetic hover effects
- Responsive at 768px breakpoint

---

### 7. **PipelineNode & AnimatedPipeline** - Agent Visualization

```jsx
import { AnimatedPipeline, PipelineNode } from './components/ui/PipelineNode';

<AnimatedPipeline 
  nodes={[
    { icon: '🕷️', label: 'Scraper', status: 'completed', progress: 100 },
    { icon: '📊', label: 'Analyzer', status: 'processing', progress: 60 },
    { icon: '✨', label: 'Generator', status: 'idle', progress: 0 },
  ]}
/>
```

**Status States:**
- `idle`: Gray, no animation
- `processing`: Blue pulse with progress ring
- `completed`: Green with checkmark
- `error`: Red with X

---

### 8. **LoadingSkeleton** - Loading States

```jsx
import { LoadingSkeleton, ShimmerLoading } from './components/ui/LoadingSkeleton';

<LoadingSkeleton type="card" count={3} />
<ShimmerLoading />
```

---

## Page Templates

### 1. **ModernDashboard**

Main application page with:
- Animated stats grid
- Content generator form
- Generated results display
- Profile overview card
- Multi-section content cards (hooks, captions, scripts)
- Trend analysis insights

```jsx
import ModernDashboard from './pages/ModernDashboard';
```

### 2. **ModernLanding**

Marketing landing page with:
- Particle background animations
- Hero section with gradient text
- Stats showcase
- Feature grid
- How-it-works section
- CTA section

```jsx
import ModernLanding from './pages/ModernLanding';
```

---

## Responsive Design

### Mobile First Approach

```css
/* Small screens (default) */
.grid-cols-1

/* Tablets (md: 768px) */
@media (md) {
  .md:grid-cols-2
  .md:ml-96      /* Sidebar margin */
}

/* Desktop (lg: 1024px) */
@media (lg) {
  .lg:grid-cols-3
}
```

### Layout Breakpoints

- **Mobile**: < 768px (Sidebar → Drawer)
- **Tablet**: 768px - 1024px (Full sidebar, 2-column grid)
- **Desktop**: > 1024px (Full sidebar, 3-column grid)

---

## Animation System

All animations use **Framer Motion** with these patterns:

### Entrance Animations

```jsx
motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
/>
```

### Hover Effects

```jsx
motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3 }}
/>
```

### Stagger Effect (Multiple children)

```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }}
>
```

---

## Glassmorphism Pattern

### Base Glass Card Styling

```html
<div class="
  backdrop-blur-xl           /* Strong blur effect */
  bg-white/5                 /* Very subtle background */
  border border-white/10     /* Subtle border */
  rounded-2xl                /* Generous radius */
  p-6                        /* Comfortable padding */
  shadow-lg shadow-black/20   /* Soft shadow */
  hover:bg-white/[0.08]      /* Slight highlight on hover */
  hover:border-white/20      /* Brighter border on hover */
  transition-all duration-300
"/>
```

---

## Color Usage Guidelines

### Gradients

**Primary Gradient (Purple → Pink):**
```html
class="bg-gradient-to-r from-purple-400 to-pink-400"
class="bg-gradient-to-b from-purple-500/20 to-pink-500/20"
```

**Secondary Gradient (Blue → Cyan):**
```html
class="bg-gradient-to-r from-blue-500 to-cyan-500"
```

### Opacity Usage

```
Primary Text:       text-white           (opacity: 1)
Secondary Text:     text-white/80        (opacity: 0.8)
Tertiary Text:      text-white/70        (opacity: 0.7)
Muted Text:         text-white/60        (opacity: 0.6)
Disabled Text:      text-white/40        (opacity: 0.4)
```

---

## Usage Example: Complete Component

```jsx
import { GlassCard } from './components/ui/GlassCard';
import { AnimatedButton } from './components/ui/AnimatedButton';
import { ContentCard } from './components/ui/ContentCard';
import { AnimatedMetric } from './components/ui/AnimatedMetric';
import { Sparkles } from 'lucide-react';

export function ExampleSection() {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedMetric label="Total" value={100} icon="📊" />
        <AnimatedMetric label="Growth" value={45} trend={12} icon="📈" />
      </div>

      {/* Main Card */}
      <GlassCard glow delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-4">
          Create Something Amazing
        </h2>
        
        <ContentCard 
          title="Example Hook"
          content="This changes everything"
          score={8.5}
        />

        <AnimatedButton 
          variant="primary" 
          size="lg" 
          icon={Sparkles}
          className="mt-6"
        >
          Generate Now
        </AnimatedButton>
      </GlassCard>
    </div>
  );
}
```

---

## Performance Tips

1. **Use `delay` prop sparingly** - Can cause layout jank with many elements
2. **Wrap animations in `motion.div`** - Don't over-animate static content
3. **Use `transition` prop** - Customize duration and easing
4. **Lazy load** - Use `whileInView` for scroll animations
5. **Mobile optimized** - Reduce animation complexity on smaller screens

---

## Accessibility

- All buttons have proper focus states
- Text contrast meets WCAG AA standards
- Semantic HTML maintained
- Keyboard navigation supported
- ARIA labels where needed

---

## File Structure

```
frontend/src/
├── components/
│   ├── ui/                 # Reusable components
│   │   ├── GlassCard.jsx
│   │   ├── AnimatedButton.jsx
│   │   ├── AIStatusBadge.jsx
│   │   ├── ContentCard.jsx
│   │   ├── AnimatedMetric.jsx
│   │   ├── PipelineNode.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── layout/             # Layout components
│   │   └── FloatingSidebar.jsx
│   ├── dashboard/          # Dashboard-specific
│   ├── landing/            # Landing-specific
│   └── sections/           # Reusable sections
├── pages/
│   ├── ModernDashboard.jsx
│   ├── ModernLanding.jsx
│   ├── Dashboard.jsx       # Legacy
│   └── Landing.jsx         # Legacy
├── styles/
│   ├── globals.css
│   └── animations.css
└── services/
    └── api.js
```

---

## Next Steps

1. **Customize colors** - Update brand colors in `tailwind.config.js`
2. **Add more animations** - Extend keyframes in config
3. **Create new components** - Follow the pattern of existing components
4. **Add dark mode** - Already built in via Tailwind
5. **Deploy** - Production-ready code

---

## Support & Issues

For component issues:
1. Check if Framer Motion is installed
2. Verify Lucide Icons are available
3. Check Tailwind CSS configuration
4. Review component props documentation

---

**Design System Version:** 2.0
**Last Updated:** 2024
**Created with:** React + Framer Motion + Tailwind CSS
