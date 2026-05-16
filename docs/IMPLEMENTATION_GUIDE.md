# Phaze AI - UI Implementation Guide

## Quick Start

### 1. Using the Component Library

```jsx
import {
  GlassCard,
  AnimatedButton,
  ContentCard,
  AnimatedMetric,
} from '../components/ui';
import { Sparkles } from 'lucide-react';

export function MyPage() {
  return (
    <GlassCard glow>
      <h2 className="text-2xl font-bold text-white mb-6">Welcome</h2>
      
      <ContentCard
        title="Example"
        content="Your content here"
        score={8.5}
      />

      <AnimatedButton 
        variant="primary" 
        icon={Sparkles}
      >
        Click Me
      </AnimatedButton>
    </GlassCard>
  );
}
```

---

## Component API Reference

### GlassCard

**Props:**
- `glow?: boolean` - Add purple glow effect
- `hover?: boolean` - Enable lift animation on hover
- `delay?: number` - Stagger entrance (in seconds)
- `onClick?: function` - Click handler
- `className?: string` - Additional Tailwind classes
- `children: ReactNode` - Card content

**Usage:**
```jsx
<GlassCard glow delay={0.2}>
  <p>Your content</p>
</GlassCard>
```

---

### AnimatedButton

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `loading?: boolean` - Show loading spinner
- `disabled?: boolean` - Disable button
- `icon?: ComponentType` - Lucide icon component
- `children: ReactNode` - Button text
- `onClick?: function` - Click handler

**Usage:**
```jsx
<AnimatedButton 
  variant="primary"
  size="lg"
  icon={Sparkles}
  onClick={handleClick}
>
  Generate
</AnimatedButton>
```

---

### ContentCard

**Props:**
- `title: string` - Card title
- `content: string` - Main content text
- `icon?: string` - Emoji or icon
- `tags?: string[]` - Tag badges
- `score?: number` - Score display (0-10)
- `expandable?: boolean` - Allow expand/collapse
- `onCopy?: function` - Copy handler
- `onRegenerate?: function` - Regenerate handler
- `delay?: number` - Entrance animation delay

**Usage:**
```jsx
<ContentCard
  title="Viral Hook"
  content="This one feature changed everything 🤯"
  icon="🎣"
  tags={['AI', 'Viral']}
  score={8.5}
  onCopy={(content) => navigator.clipboard.writeText(content)}
/>
```

---

### AnimatedMetric

**Props:**
- `label: string` - Metric label
- `value: number | string` - Metric value
- `suffix?: string` - Unit suffix (e.g., "%", "s")
- `icon?: string` - Emoji icon
- `trend?: number` - Percentage change (positive/negative)
- `format?: 'text' | 'number'` - Value format
- `delay?: number` - Animation delay

**Usage:**
```jsx
<AnimatedMetric
  label="Scripts Generated"
  value={127}
  trend={12}
  icon="✏️"
  format="number"
/>
```

---

### AnimatedPipeline

**Props:**
- `nodes: Array<{icon, label, status, progress}>` - Pipeline nodes

**Node Status:**
- `'idle'` - Not started (gray)
- `'processing'` - In progress (blue, pulsing)
- `'completed'` - Finished (green)
- `'error'` - Failed (red)

**Usage:**
```jsx
<AnimatedPipeline
  nodes={[
    { icon: '🕷️', label: 'Scraper', status: 'completed', progress: 100 },
    { icon: '📊', label: 'Analyzer', status: 'processing', progress: 60 },
  ]}
/>
```

---

## Design Patterns

### Pattern 1: Stats Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {stats.map((stat, i) => (
    <AnimatedMetric
      key={i}
      label={stat.label}
      value={stat.value}
      icon={stat.icon}
      trend={stat.trend}
      delay={i * 0.1}
    />
  ))}
</div>
```

### Pattern 2: Content Showcase

```jsx
<div className="space-y-4">
  {contents.map((content, i) => (
    <ContentCard
      key={i}
      title={content.title}
      content={content.text}
      score={content.score}
      onCopy={() => copyToClipboard(content.text)}
      delay={0.3 + i * 0.05}
    />
  ))}
</div>
```

### Pattern 3: Form Section

```jsx
<GlassCard glow>
  <h2 className="text-2xl font-bold text-white mb-6">Generate Content</h2>
  
  <div className="space-y-4 mb-6">
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        Instagram URL
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:border-white/30"
      />
    </div>
  </div>

  <AnimatedButton variant="primary" size="lg">
    Generate
  </AnimatedButton>
</GlassCard>
```

### Pattern 4: Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <GlassCard key={item.id} hover>
      {/* Content */}
    </GlassCard>
  ))}
</div>
```

---

## Animation Best Practices

### Entrance Animations

```jsx
// Simple fade-in and slide-up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  Content
</motion.div>

// Scale and fade
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### Hover Animations

```jsx
<motion.button
  whileHover={{ 
    scale: 1.05,
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  Click Me
</motion.button>
```

### Stagger Children

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
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

---

## Responsive Design Patterns

### Mobile-First Approach

```jsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

### Responsive Sidebar

```jsx
// The FloatingSidebar component handles this automatically
// But manual approach:

<div className="flex">
  {/* Hidden on mobile */}
  <aside className="hidden md:flex w-64 bg-white/5 border-r border-white/10">
    {/* Sidebar content */}
  </aside>

  <main className="flex-1 md:ml-6">
    {/* Main content */}
  </main>
</div>
```

### Adaptive Typography

```jsx
// Responsive text sizes
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Heading
</h1>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>

// Responsive gaps
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  Items
</div>
```

---

## Performance Optimization

### 1. Avoid Over-Animation

```jsx
// ❌ Bad: Too many animations
<motion.div animate={{ x: 100, y: 100, rotate: 360 }}>
  Content
</motion.div>

// ✅ Good: Subtle, purposeful
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### 2. Use WhileInView for Scroll Animations

```jsx
// Only animate when in viewport
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### 3. Optimize Images

```jsx
// Use optimized images
<img
  src="optimized-image.webp"
  alt="Description"
  loading="lazy"
  className="rounded-xl"
/>
```

### 4. Lazy Load Components

```jsx
// Code split heavy components
import { lazy, Suspense } from 'react';
const ComponentShowcase = lazy(() => import('./ComponentShowcase'));

export function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ComponentShowcase />
    </Suspense>
  );
}
```

---

## Accessibility Guidelines

### 1. Color Contrast

```jsx
// Text contrast ratio should be at least 4.5:1
// ✅ White (#FFFFFF) on dark background (#050816) - HIGH CONTRAST
// ❌ Light gray on light background - LOW CONTRAST

<p className="text-white">Good contrast</p>
<p className="text-white/50">Reduced visibility</p>
```

### 2. Focus States

```jsx
<button className="
  px-4 py-2 rounded-lg
  focus:outline-none
  focus:ring-2 focus:ring-purple-400
  focus:ring-offset-2 focus:ring-offset-transparent
">
  Accessible Button
</button>
```

### 3. ARIA Labels

```jsx
<motion.button
  aria-label="Generate AI content"
  onClick={handleGenerate}
>
  <Sparkles className="w-5 h-5" />
</motion.button>
```

### 4. Semantic HTML

```jsx
// ✅ Good: Semantic
<section>
  <h2>AI Insights</h2>
  <article>Content</article>
</section>

// ❌ Bad: Non-semantic
<div>
  <div>AI Insights</div>
  <div>Content</div>
</div>
```

---

## Common Mistakes to Avoid

### ❌ Overusing Animations

Don't animate every single element. Keep it purposeful.

### ❌ Poor Contrast

Never sacrifice readability for aesthetics. Always check WCAG standards.

### ❌ Ignoring Mobile

Always test on mobile devices. Use responsive utilities.

### ❌ Too Many Fonts

Stick to 1-2 font families. Use weight and size for hierarchy.

### ❌ Cluttered Layout

Use whitespace generously. Don't cram content together.

---

## Color Utility Classes

### Gradient Text

```html
<!-- Purple to Pink -->
<span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
  Gradient Text
</span>

<!-- Blue to Cyan -->
<span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
  Gradient Text
</span>
```

### Background Opacity

```html
<!-- Very subtle -->
<div class="bg-white/5 backdrop-blur-xl">Content</div>

<!-- Subtle -->
<div class="bg-white/10 backdrop-blur-xl">Content</div>

<!-- Moderate -->
<div class="bg-white/20 backdrop-blur-xl">Content</div>
```

### Border Opacity

```html
<!-- Subtle border -->
<div class="border border-white/10">Content</div>

<!-- Highlighted border -->
<div class="border border-white/30">Content</div>

<!-- Glow effect -->
<div class="border border-purple-500/50 shadow-lg shadow-purple-500/20">Content</div>
```

---

## Testing Components

### Visual Testing

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on different screen sizes (mobile, tablet, desktop)
3. Test animations with reduced motion preference
4. Test with dark mode enabled/disabled

### Functional Testing

```jsx
// Example test using React Testing Library
import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

test('GlassCard renders children', () => {
  render(<GlassCard>Test Content</GlassCard>);
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
```

---

## Deployment Checklist

- [ ] All components properly exported
- [ ] No console errors or warnings
- [ ] Mobile responsive tested
- [ ] Animations smooth on all devices
- [ ] Images optimized and lazy-loaded
- [ ] Accessibility standards met
- [ ] Performance metrics acceptable
- [ ] Cross-browser testing complete
- [ ] Environment variables configured
- [ ] Build process verified

---

## Troubleshooting

### Issue: Animations not smooth

**Solution:**
- Check if element is being re-rendered
- Use `whileInView` only when necessary
- Reduce animation complexity
- Check GPU acceleration with DevTools

### Issue: Components not responding to clicks

**Solution:**
- Check if overlay divs are blocking clicks
- Verify z-index layers
- Check pointer-events CSS property
- Ensure onClick handlers are attached

### Issue: Text blurry with blur effect

**Solution:**
- Use `backdrop-blur-xl` instead of `blur`
- Test on high-DPI displays
- Consider reducing blur amount
- Use proper font rendering hints

### Issue: Layout shifts during animation

**Solution:**
- Set fixed dimensions for animated elements
- Use `layout` prop in Framer Motion (expensive)
- Avoid animating height/width on large elements

---

## Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/
- **Web Accessibility**: https://www.w3.org/WAI/

---

## Support

For component-specific issues:
1. Check the component props documentation above
2. Review example usage in ComponentShowcase.jsx
3. Check console for error messages
4. Verify all dependencies are installed

---

**Implementation Guide Version:** 1.0
**Last Updated:** 2024
**Maintained By:** Phaze AI Team
