// /** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
// import plugin from 'tailwindcss/plugin';
import tailwindForms from '@tailwindcss/forms';

export default {
  content: [
    './index.html',
    './src/**/*.{js,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#FFFFF9',
          100: '#FFF1CD',
          200: '#FFE1A8',
          300: '#F5D098',
          700: '#914E1A',
          800: '#5C270D',
          900: '#361707',
          950: '#261005',
        },
        secondary: {
          light: '#FF8B8B',
          DEFAULT: '#F27979',
          dark: '#D96C6C',
        },
      },
      fontFamily: {
        zenMaru: ['"Zen Maru Gothic"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    tailwindForms,
  ],
};
