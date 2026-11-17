/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        brand: token('brand'),
        'brand-deep': token('brand-deep'),
        night: token('night'),
        gold: token('gold'),
        'gold-deep': token('gold-deep'),
        paper: token('paper'),
        mist: token('mist'),
        sky: token('sky'),
        line: token('line'),
        success: token('success'),
        danger: token('danger'),
        pastel: {
          blue: token('pastel-blue'),
          cream: token('pastel-cream'),
          mint: token('pastel-mint'),
          lilac: token('pastel-lilac'),
          periwinkle: token('pastel-periwinkle'),
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        script: ['var(--font-script)'],
        deva: ['var(--font-deva)'],
      },
      fontSize: {
        eyebrow: ['0.78rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--ink) / 0.04), 0 10px 30px -12px rgb(var(--ink) / 0.14)',
        lift: '0 2px 4px rgb(var(--ink) / 0.05), 0 26px 50px -18px rgb(var(--ink) / 0.28)',
        gold: '0 10px 24px -10px rgb(var(--gold-deep) / 0.7)',
        panel: '0 30px 80px -30px rgb(var(--night) / 0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(28px,-6px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        drift: 'drift 26s ease-in-out infinite',
        'drift-slow': 'drift 38s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
