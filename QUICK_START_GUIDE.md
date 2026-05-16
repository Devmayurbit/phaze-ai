# ⚡ Phaze AI Platform - Quick Start Developer Guide

**Start here to implement the refactor in your pages**

---

## 🎯 5-Minute Setup

### 1. Import the Design System
```jsx
// At the top of any component file:
import { GLASS, COLORS, TYPOGRAPHY, MOTION, SPACING } from '../styles/designSystem'
```

### 2. Use GlobalSidebar on Every Page
```jsx
// Replace this:
import { FloatingSidebar } from '../components/layout/FloatingSidebar'
export const Dashboard = () => (
  <div className="flex">
    <FloatingSidebar />
    ...

// With this:
import GlobalSidebar from '../components/layout/GlobalSidebar'
export const Dashboard = () => (
  <div className="flex min-h-screen">
    <GlobalSidebar />
    <main className={`flex-1 p-8 ${GLASS.glassMorphism}`}>
      ...
    </main>
  </div>
)
```

### 3. Replace Your Form Elements
```jsx
// Before:
<select value={niche} onChange={e => setNiche(e.target.value)}>
  <option>Tech</option>
</select>

// After:
import { NicheSelector } from '../components/ui/FormComponents'
<NicheSelector value={niche} onChange={setNiche} />
```

### 4. Add Loading States
```jsx
// Before:
{isLoading && <p>Loading...</p>}

// After:
import { SkeletonCard } from '../components/ui/AnimationComponents'
{isLoading && <SkeletonCard count={3} />}
```

### 5. Display Content Beautifully
```jsx
// Before:
{hooks.map(hook => <div key={hook}>{hook}</div>)}

// After:
import { ContentSection } from '../components/ui/ContentComponents'
<ContentSection title="Viral Hooks" icon="🎣" items={hooks} />
```

---

## 🛠️ Common Component Usage

### Glass Dropdown (Fixes Visibility Bug)
```jsx
import { GlassDropdown } from '../components/ui/FormComponents'

<GlassDropdown
  options={[
    { value: 'tech', label: 'Tech & Innovation', icon: '🚀' },
    { value: 'lifestyle', label: 'Lifestyle', icon: '✨' }
  ]}
  value={selectedNiche}
  onChange={setSelectedNiche}
  placeholder="Select your niche..."
  label="Creator Niche"
  searchable={true}
/>
```

### Content Cards (Modular Display)
```jsx
import { ContentCard } from '../components/ui/ContentComponents'

<ContentCard
  title="Hooks"
  icon="🎣"
  content="Watch what happens when I do this one thing..."
  index={0}
  onCopy={() => navigator.clipboard.writeText(content)}
  onRegenerate={regenerateHook}
  onSave={saveHook}
  isSaved={false}
/>
```

### Content Section (Organized)
```jsx
import { ContentSection } from '../components/ui/ContentComponents'

<ContentSection
  title="AI Captions"
  icon="✨"
  items={captions}
  isLoading={isGenerating}
  onRefresh={regenerateAllCaptions}
/>
```

### Agent Pipeline (Processing Visualization)
```jsx
import { AgentPipeline } from '../components/ui/PipelineComponents'

<AgentPipeline isProcessing={isAnalyzing} />
```

### Skeleton Loaders (Loading States)
```jsx
import { 
  SkeletonCard, 
  SkeletonContentSection, 
  SkeletonDashboard 
} from '../components/ui/AnimationComponents'

// Single card skeleton
{isLoading && <SkeletonCard count={3} />}

// Section skeleton
{isLoading && <SkeletonContentSection />}

// Full dashboard skeleton
{isLoading && <SkeletonDashboard />}
```

### Glass Form Components
```jsx
import { GlassInput, GlassTextarea, GlassToggle } from '../components/ui/FormComponents'

<GlassInput
  type="text"
  placeholder="Enter username..."
  value={username}
  onChange={e => setUsername(e.target.value)}
  icon="👤"
  label="Instagram Username"
/>

<GlassTextarea
  placeholder="Bio..."
  value={bio}
  onChange={e => setBio(e.target.value)}
  rows={3}
/>

<GlassToggle 
  enabled={isPublic}
  onChange={setIsPublic}
  label="Make Public"
/>
```

---

## 🎨 Styling Quick Reference

### Using GLASS for Styling
```jsx
// Glass card
<div className={GLASS.card}>Content</div>

// Premium glass with glow
<div className={GLASS.premium}>Premium content</div>

// Glass button
<button className={GLASS.buttonPrimary}>Click me</button>

// Glass input
<input className={GLASS.input} />

// Glass with hover and animation
<div className={`${GLASS.card} ${GLASS.hover} transition-all`}>
  Hover me!
</div>
```

### Using COLORS
```jsx
// Text colors
<p className={COLORS.text.primary}>Primary text</p>
<p className={COLORS.text.secondary}>Secondary text</p>
<p className={COLORS.text.tertiary}>Tertiary text</p>

// Status colors
<div className={COLORS.status.success}>✓ Success</div>
<div className={COLORS.status.error}>✗ Error</div>
<div className={COLORS.status.warning}>⚠ Warning</div>
```

### Using TYPOGRAPHY
```jsx
<h1 className={TYPOGRAPHY.h1}>Large Heading</h1>
<h3 className={TYPOGRAPHY.h3}>Medium Heading</h3>
<p className={TYPOGRAPHY.body}>Body text</p>
<p className={TYPOGRAPHY.bodySm}>Small text</p>
```

### Using SPACING
```jsx
<div className={SPACING.containerMd}>
  <div className={`flex ${SPACING.gapMd}`}>
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</div>
```

---

## 🎬 Animation Usage

### Stagger Animation (Multiple Items)
```jsx
import { motion } from 'framer-motion'
import { MOTION } from '../styles/designSystem'

<motion.div
  variants={MOTION.staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item, idx) => (
    <motion.div key={idx} variants={MOTION.staggerItem}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Fade In Animation
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content fades in
</motion.div>
```

### Slide Up Animation
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content slides up
</motion.div>
```

### Hover Lift Animation
```jsx
<motion.div
  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
  transition={{ duration: 0.3 }}
  className="cursor-pointer"
>
  Hover me to lift!
</motion.div>
```

---

## 📋 Page Integration Checklist

**For each page, do this:**

- [ ] Import GlobalSidebar
- [ ] Import design system (GLASS, COLORS, etc)
- [ ] Update page layout (sidebar + main content)
- [ ] Replace form inputs with new components
- [ ] Add loading skeleton states
- [ ] Update content display sections
- [ ] Add animations to important elements
- [ ] Test on mobile (resize browser)
- [ ] Test keyboard navigation
- [ ] Verify all links still work

---

## 🐛 Troubleshooting

### "Component not found" Error
```
Solution: Make sure you're importing from the correct path
✓ Correct: import { ContentCard } from '../components/ui/ContentComponents'
✗ Wrong:  import { ContentCard } from '../components/ContentCard'
```

### Styling not applying
```
Solution: Make sure you're using className, not style prop
✓ Correct: <div className={GLASS.card}>
✗ Wrong:  <div style={GLASS.card}>

Solution: Check Tailwind CSS is enabled in your project
```

### Animations not working
```
Solution: Make sure Framer Motion is imported
import { motion } from 'framer-motion'

Solution: Use motion. prefix for animated elements
<motion.div> ✓
<div>        ✗
```

### Dropdown not showing selected value
```
Solution: Use new GlassDropdown component
Old: <select> ✗ (has visibility issues)
New: <GlassDropdown> ✓ (fixed)
```

---

## 📊 Component Tree Reference

```
App.jsx
├── GlobalSidebar (unified, on every page)
└── Routes
    ├── Dashboard.jsx
    │   ├── AgentPipeline (from PipelineComponents)
    │   ├── ContentSection (from ContentComponents)
    │   │   └── ContentCard (from ContentComponents)
    │   ├── StatsCards (from ContentComponents)
    │   └── ProcessingOverlay (from PipelineComponents)
    │
    ├── Profiles.jsx
    │   ├── NicheSelector (from FormComponents)
    │   ├── GlassInput (from FormComponents)
    │   └── ContentSection (from ContentComponents)
    │
    ├── Scripts.jsx
    │   ├── SkeletonCard (from AnimationComponents)
    │   └── ContentSection (from ContentComponents)
    │
    └── [Other Pages]
        └── All use GlobalSidebar
```

---

## ⚡ Performance Tips

1. **Lazy load components** for large lists
```jsx
const ContentCard = React.lazy(() => import('./ContentCard'))
<Suspense fallback={<SkeletonCard />}>
  <ContentCard />
</Suspense>
```

2. **Memoize components** that don't change often
```jsx
export const StatCard = React.memo(({ stat }) => ...)
```

3. **Use proper image optimization**
```jsx
// Bad: Regular img
<img src={url} />

// Good: Lazy loading
<img src={url} loading="lazy" />
```

4. **Debounce search/input**
```jsx
import { useCallback } from 'react'

const handleSearch = useCallback(
  debounce((term) => search(term), 300),
  []
)
```

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Test all pages on mobile
- [ ] Test all pages on tablet
- [ ] Test all pages on desktop
- [ ] Test loading states
- [ ] Test error states
- [ ] Verify animations are smooth
- [ ] Check keyboard navigation
- [ ] Run Lighthouse audit
- [ ] Test in production build
- [ ] Verify API integration
- [ ] Check error logging

---

## 📚 File Reference

| File | Purpose | Import |
|------|---------|--------|
| `designSystem.js` | All styling tokens | `import { GLASS, COLORS, ... }` |
| `GlobalSidebar.jsx` | Navigation sidebar | `import GlobalSidebar from '...'` |
| `ContentComponents.jsx` | Content display | `import { ContentCard, ... }` |
| `FormComponents.jsx` | Form elements | `import { GlassDropdown, ... }` |
| `AnimationComponents.jsx` | Loading/animations | `import { SkeletonCard, ... }` |
| `PipelineComponents.jsx` | Processing UI | `import { AgentPipeline, ... }` |

---

## 💡 Pro Tips

1. **Always use the design system** - Don't create custom styles
2. **Use GlobalSidebar** - It's used on every single page
3. **Add loading states** - Always show skeleton during data fetch
4. **Test responsiveness** - Mobile-first approach
5. **Check accessibility** - Keyboard navigation, contrast
6. **Use proper animations** - Don't overdo it
7. **Keep components small** - Easier to reuse and maintain
8. **Follow naming conventions** - Consistency matters
9. **Document complex logic** - JSDoc comments help
10. **Test before shipping** - No surprises in production

---

## 🎓 Learning Path

1. **Day 1**: Understand design system (designSystem.js)
2. **Day 2**: Implement GlobalSidebar on all pages
3. **Day 3**: Replace form components with new versions
4. **Day 4**: Add loading states and animations
5. **Day 5**: Update content display sections
6. **Day 6**: Test everything (mobile, tablet, desktop)
7. **Day 7**: Deploy and monitor

---

## 🆘 Need Help?

1. Check component JSDoc comments
2. Look for usage examples in this guide
3. Review component files for props
4. Search existing code for examples
5. Read IMPLEMENTATION_GUIDE_COMPLETE.md for detailed info

---

**You've got this! Start with one page and work through the checklist.**

*Last Updated: May 15, 2026*
