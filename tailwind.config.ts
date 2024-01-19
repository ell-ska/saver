import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/toast.tsx',
  ],
  theme: {
    fontFamily: {
      primary: 'var(--font-primary)',
      branding: 'var(--font-branding)',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#AAC9FF',
          light: '#C2D8FF',
          dark: '#0F67FF',
        },
        secondary: {
          DEFAULT: '#CDC3FF',
          light: '#E1DBFF',
          dark: '#4D29FF',
        },
        complementary: {
          DEFAULT: '#CDF463',
          light: '#DCF791',
          dark: '#84B00C',
        },
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '100' },
        },
        'fade-out': {
          from: { opacity: '100' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 75ms',
        'fade-out': 'fade-out 75ms',
      },
      screens: {
        smh: { raw: '(min-height: 580px)' },
        'touch-device': { raw: '(pointer: coarse) and (hover: none)' },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
export default config
