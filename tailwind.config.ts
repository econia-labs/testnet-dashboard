import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      '4xs': '.375rem',   // 6px
      '3xs': '.5rem',     // 8px
      '2xs': '.625rem',   // 10px
      'xs': '.75rem',     // 12px
      'sm': '.875rem',    // 14px
      'base': '1rem',     // 16px
      'lg': '1.125rem',   // 18px
      'xl': '1.25rem',    // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem',      // 64px
    },
    // spacing: {
    //   1: '0.24rem', // 3.84px
    // },
    colors: {
      'white': '#FFFFFF',
      'blue': '#086CD9',
      'pink': '#CD2F8D',
      'green': '#2FA90F',
      '100': '#FFFFFF',
      '200': '#F9F9F9',
      '300': '#F1F1F1',
      '400': '#DADADA',
      '500': '#AAAAAA',
      '600': '#565656',
      '700': '#161616',
      '800': '#020202',
    },
    extend: {
      backgroundImage: {
        noise: 'url("/bg-noise.png")',
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
      },
      lineHeight: {
        '18': '18px',
      },
      spacing: {
        '35': '2.20625rem', // 35.3px
        '46': '2.87125rem', // 45.94px
        '105': '6.55875rem', // 104.94px
      },
    },
  },
  plugins: [],
}
export default config