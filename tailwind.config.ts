import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xsm: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      30: '30px',
      32: '32px',
      36: '36px',
      48: '48px',
      64: '64px',
    },
    lineHeight: {
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      30: '30px',
      36: '36px',
      48: '48px',
      52: '52px',
      64: '64px',
    },
    gap: {
      6: '6px',
      8: '8px',
      10: '10px',
      '11.55': '11.55px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      '23.68': '23.68px',
      24: '24px',
      30: '30px',
      36: '36px',
      40: '40px',
      42: '42px',
      48: '48px',
      64: '64px',
    },
    colors: {
      'transparent': 'transparent',
      'black': '#000000',
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
      backgroundOpacity: {
        20: '0.2',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'sans-serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
      },
      borderWidth: {
        1: '1px',
      },
      spacing: {
        '11.53': '11.53px',
        '5.64': '5.64px',
        '31.79': '31.79px',
        '33.71': '33.71px',
        '35': '35.3px',
        '36': '36px',
        '42': '42px',
        '44': '44.85px',
        '46': '45.94px',
        '52': '52px',
        '58': '58.12px',
        '67': '67.42px',
        '81': '81.4px',
        '96': '96px',
        '105': '104.94px',
        '149': '149px',
        '224': '224.27px',
        '230.63': '230.63px',
        '261.28': '261.28px',
        '287.87': '287.87px',
        '290': '290.376px',
        '317': '317.41px',
        '437': '437.22px',
        '605': '605.88px',
        '757': '757.44px',
        '599.21': '599.21px'
      },
      rotate: {
        '135': '135deg',
      },
      translate: {
        '-3.25': '-12.5px',
      },
      lineHeight: {
        '18': '18px',
      },
      boxShadow: {
        '4': ' 0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeBorder: {
          '0%': { borderColor: '#565656' },
          '50%': { borderColor: '#086CD9' },
          '100%': { borderColor: '#086CD9' },
        },
        fadeText: {
          '0%': { color: '#565656' },
          '50%': { color: '#086CD9' },
          '100%': { color: '#086CD9' },
        },
        fadeBg: {
          '0%': {
            backgroundColor: 'transparent',
            borderColor: '#565656'
          },
          '50%': {
            backgroundColor: '#086CD9',
            borderColor: '#086CD9'
          },
          '100%': {
            backgroundColor: '#086CD9',
            borderColor: '#086CD9'
          },
        },
        flash: {
          '0%': {
            backgroundColor: '#fff',
            color: '#000'
          },
          '50%': {
            backgroundColor: '#000',
            color: '#fff'
          },
          '100%': {
            backgroundColor: '#fff',
            color: '#000'
          },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s linear 1',
        'fadeOut': 'fadeOut 0.3s linear 1',
        'fadeBorder': 'fadeBorder 2s linear infinite',
        'fadeBg': 'fadeBg 2s linear infinite',
        'fadeText': 'fadeText 2s linear infinite',
        'flash': 'flash 1s linear 1',
      },
      zIndex: {
        '-1': '-1',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      scale: {
        '96': '.96',
        '101': '1.01',
      },
    },
  },
  plugins: [],
}
export default config