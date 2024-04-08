// /** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
// import plugin from 'tailwindcss/plugin';
import tailwindForms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,vue}'],
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
        zenMaru: ['"Mochiy Pop One"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'icon-check':
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg>\')',
        'icon-x':
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>\')',
        bannerImage:
          "url('https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1712510649608.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fjwGIix1PU4qyOuehOBLefHoyiLn3piN1dqh36jijVue%2BfndrMts7CKMjWeaStnvizQFX5AZHYbyYwlpT%2F0XtQd6x4vLp01aRm2aqPjh4lfCNySd2mhTdm7e6ZHbMfed9eAxM%2FZPNOP0d5zhxIEciRdMwGX7BWfGJrMjfITIBdJLTeBIainuKfCeKzN5ZgX1mweLD2x04Fl6QSPNUG5BnedZwX3myVDwu%2FyYPX3fz5KkuEJzbURtrDTKEceHAx9UPgRpMZnuc6v2eFTZ%2Bc6gQMoQFO80cKqVCw8JZBfqk6%2FJFaBC1yF0HmRWOMVFV8W9PQTIXOOEfHo%2BvbyiIxiW9A%3D%3D')",
        'bannerImage-sm':
          "url('https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1712510725102.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hkbNauCrWbYg3MMkddkcsOmNjPsMgBo5Dx%2FdbLDPfhvA4xt3kMnlktGXrVrygaDPNPbLTubEVYNSBWSvrK3T54dq%2BPTJyuDt%2BMq0oqJmN58B%2B4yH0ICY3jywrXauLqoiaWKdviBreBjYMWr2vcLQvzAr%2Bt33%2FX8YYXCt4djHAOXSBxpjXaLO0L%2B9u77TeM4z13Nv%2FtoFvJyXvEEPASLbyj7YfmlwyT5EZigWiZTSekL3XgdRfZjZVVWDHFF4cxrK6YIsfJVFPLD2nrMj9tfsMs%2Bmr2Kkjsz5Ho%2B%2BhuwZa2rOX7QY8kf6kNnpD4i8v304PctLhqM5e1wEgoQ3kRs5yg%3D%3D')",
      },
      keyframes: {
        accordionIn: {
          '0%': { height: '0' },
          '100%': { height: '376px' },
        },
      },
      animation: {
        'accordion-enter-active': 'accordionIn 0.5s ease',
        'accordion-leave-active': 'accordionIn 0.5s ease reverse',
      },
    },
  },
  plugins: [tailwindForms],
};
