/**
 * PHAZE AI - Premium Glassmorphism Design System
 * Global tokens for consistent luxury minimalist UI across all pages
 * Inspired by: Linear, Vercel, Perplexity, Arc Browser
 */

export const GLASS = {
  // Base glass effects
  base: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg',
  premium: 'bg-white/8 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300',
  card: 'bg-white/6 backdrop-blur-md border border-white/15 hover:bg-white/8 hover:border-white/25 transition-all duration-300',
  cardLight: 'bg-white/8 backdrop-blur-lg border border-white/20 shadow-lg',
  cardDark: 'bg-white/3 backdrop-blur-xl border border-white/8 shadow-lg',
  
  // Sidebar - Ultra premium
  sidebar: 'bg-white/3 backdrop-blur-2xl border border-white/10 shadow-2xl',
  sidebarCompact: 'bg-white/2 backdrop-blur-2xl border-r border-white/5',

  // Input styling - All variants
  input: 'bg-white/5 backdrop-blur-md border border-white/15 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300',
  select: 'bg-white/5 backdrop-blur-md border border-white/15 focus:bg-white/10 focus:border-purple-500/50 text-white placeholder-gray-400 appearance-none cursor-pointer transition-all duration-300',
  textarea: 'bg-white/5 backdrop-blur-md border border-white/15 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300',
  inputError: 'border-red-500/50 bg-red-500/5 focus:border-red-500/70',
  inputSuccess: 'border-green-500/50 bg-green-500/5 focus:border-green-500/70',

  // Button styling
  button: 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-md hover:shadow-lg',
  buttonPrimary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-2xl border-0 text-white font-semibold',
  buttonGhost: 'bg-transparent border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300',
  buttonDanger: 'bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 hover:border-red-500/70 text-red-300 transition-all duration-300',
  buttonSuccess: 'bg-green-600/20 border border-green-500/50 hover:bg-green-600/30 hover:border-green-500/70 text-green-300 transition-all duration-300',

  // Glow effects - Multiple intensities
  glow: 'shadow-lg shadow-purple-500/30',
  glowXl: 'shadow-2xl shadow-purple-500/40',
  glowPink: 'shadow-lg shadow-pink-500/30',
  glowBlue: 'shadow-lg shadow-blue-500/30',
  glowGreen: 'shadow-lg shadow-green-500/30',
  
  // Neon focus states
  neon: 'shadow-lg shadow-purple-500/50 border-purple-500/50',
  neonPink: 'shadow-lg shadow-pink-500/50 border-pink-500/50',

  // Base glassmorphism variants
  glassMorphism: 'bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/10',
  glassMorphismLight: 'bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20',
  glassMorphismDark: 'bg-gradient-to-br from-white/3 via-black/10 to-white/2 backdrop-blur-2xl border border-white/5',

  // Hover states
  hover: 'hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer',
  hoverGlow: 'hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300',

  // Dividers
  divider: 'border-b border-white/10',
  dividerLight: 'border-b border-white/5',
}

export const SPACING = {
  // Container padding
  containerXs: 'px-3 py-3 md:px-4 md:py-4',
  containerSm: 'px-4 md:px-6 py-4 md:py-6',
  containerMd: 'px-4 md:px-8 py-6 md:py-8',
  containerLg: 'px-6 md:px-12 py-8 md:py-12',
  
  // Sections
  section: 'mb-8 md:mb-10 lg:mb-12',
  sectionSm: 'mb-4 md:mb-6 lg:mb-8',
  sectionLg: 'mb-12 md:mb-16 lg:mb-20',

  // Card padding
  card: 'p-6',
  cardSm: 'p-4',
  cardMd: 'p-6',
  cardLg: 'p-8',
  cardXl: 'p-10',

  // Gaps
  gap: 'gap-6 md:gap-8 lg:gap-10',
  gapSm: 'gap-3 md:gap-4 lg:gap-6',
  gapMd: 'gap-6 md:gap-8',
  gapLg: 'gap-8 md:gap-12 lg:gap-16',
  gapXl: 'gap-12 md:gap-16 lg:gap-20',

  // Margins
  mb: {
    xs: 'mb-2',
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
    xl: 'mb-10',
  },
}

export const COLORS = {
  // Gradients
  primary: 'from-purple-600 to-pink-600',
  secondary: 'from-blue-600 to-purple-600',
  tertiary: 'from-pink-600 to-red-600',
  success: 'from-green-600 to-emerald-600',
  warning: 'from-yellow-600 to-orange-600',
  danger: 'from-red-600 to-pink-600',
  neon: 'from-purple-500 to-pink-500',

  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    tertiary: 'text-gray-400',
    muted: 'text-gray-500',
    inverted: 'text-gray-900',
  },

  // Background colors
  bg: {
    dark: 'bg-slate-950',
    darker: 'bg-slate-900',
    darkest: 'bg-black',
    light: 'bg-gray-50',
  },

  // Border colors
  border: {
    light: 'border-white/5',
    medium: 'border-white/10',
    heavy: 'border-white/20',
    accent: 'border-purple-500/50',
  },

  // Status
  status: {
    success: 'text-green-400 bg-green-500/10 border-green-500/30',
    warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    error: 'text-red-400 bg-red-500/10 border-red-500/30',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
}

export const TYPOGRAPHY = {
  // Headings - Responsive
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight',
  h4: 'text-lg sm:text-xl md:text-2xl font-semibold tracking-tight',
  h5: 'text-base sm:text-lg md:text-xl font-semibold',
  h6: 'text-sm sm:text-base md:text-lg font-semibold',

  // Body text
  body: 'text-sm sm:text-base md:text-base leading-relaxed',
  bodySm: 'text-xs sm:text-sm md:text-sm leading-relaxed',
  bodyXs: 'text-xs leading-tight',

  // Special
  label: 'text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400',
  code: 'font-mono text-xs sm:text-sm bg-gray-900/50 rounded px-2 py-1',
  
  // Gradients
  gradientHeading: 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent',
  gradientSubheading: 'bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent',
}

export const ANIMATIONS = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',

  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',

  // Glow animations
  pulse: 'animate-pulse',
  pulseGlow: 'animate-pulse-glow',
  glow: 'animate-glow',
  shimmer: 'animate-shimmer',
  bounce: 'animate-bounce',
}

export const LAYOUT = {
  // Responsive sidebar
  sidebarWidth: 'w-64',
  sidebarWidthCollapsed: 'w-20',
  sidebarMobile: 'max-w-xs w-64',

  // Container widths
  containerMax: 'max-w-7xl',
  containerLarge: 'max-w-6xl',
  containerMedium: 'max-w-4xl',
  containerSmall: 'max-w-2xl',
  
  // Grid layouts
  grid2Cols: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  grid3Cols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  grid4Cols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',

  // Transitions
  transition: 'transition-all duration-300',
  transitionFast: 'transition-all duration-150',
  transitionSlow: 'transition-all duration-500',
}

export const SHADOW = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  glow: 'shadow-lg shadow-purple-500/30',
  glowLg: 'shadow-2xl shadow-purple-500/40',
  glowPink: 'shadow-lg shadow-pink-500/30',
  glowBlue: 'shadow-lg shadow-blue-500/30',
  glowGreen: 'shadow-lg shadow-green-500/30',
}

export const MOTION = {
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },

  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  },

  hoverLift: {
    whileHover: { y: -4, transition: { duration: 0.3 } },
  },

  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
}

