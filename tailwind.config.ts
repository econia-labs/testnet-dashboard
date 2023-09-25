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
    },
  },
  plugins: [],
}
export default config