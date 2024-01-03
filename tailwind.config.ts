import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
export default config
