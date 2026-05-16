export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          '900': '#050816',
          '800': '#0B1023',
          '700': '#111827',
          '600': '#1a1f3a'
        },
        'neon': {
          'purple': '#a855f7',
          'blue': '#3b82f6',
          'pink': '#ec4899',
          'cyan': '#06b6d4'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-purple': 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        'glow-pink': 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
        'glow-blue': 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168,85,247,0.4)',
        'glow-lg': '0 0 40px rgba(168,85,247,0.6)',
        'glow-pink': '0 0 20px rgba(236,72,153,0.4)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.4)',
        'inner-glow': 'inset 0 0 20px rgba(168,85,247,0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '20px',
        '2xl': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.8)' },
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      }
    }
  },
  plugins: []
}
