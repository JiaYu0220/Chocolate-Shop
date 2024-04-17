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
        Mochiy: ['"Mochiy Pop One"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'icon-check':
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg>\')',
        'icon-x':
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>\')',
        bannerImage:
          "url('https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713285199978.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Su%2F%2FxMDorCrcFgxbrxrCU7%2FN24pv9m5TWrr0kwtC8FraYIS8YT6PGHFbuIrcjqbs7ao%2Baan1Yqh1QYmgAvOe9PnvmB7EKykPEF57lug8zMkMJnmHVKcJdda7OU4gpXA9zG8HAx39pVwe8fps3YMWMWGyWIxAM%2B7kKd1hRemqLko3zXBjxoErfTAczO4bqtUxCpTjiM3%2FR2O9ExnHJJIQvcMHKfRwLW8zxJSkpTDhqljm8D%2Ft%2FPVqdrsUom3cZT3Y1r4WWp%2BnAadVjlk8VP%2BaHs%2BlTrV%2F%2BsHwVU3dwZwiHVqjSq6EwLrca6%2FLrXAZHNWmn%2FouW8rZj9s8GLZxdQk0iw%3D%3D')",
        'bannerImage-sm':
          "url('https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713285197695.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Sc60H0ZdRmtjWpg%2FYpDdBTyYKUDImaM6SJB%2FRW0D69RSflvuEFQYlYx3%2Fi28ahFUY0hyPkQJxf3z%2BZyH3YX0%2FdrAOk%2B5Wam%2FM76yAnj3b639RHkKvxui5BGODaU%2F%2BmkOjXWjtlTO1vSe7SWO9Z0CxYxC6BhJpZJQqDqvswKYXNQG9rongq%2BCYNDb8acRIO0ayIOcNrvgOBGfUjtBV1K2RYjmm2ShtiFHUaemyagoZvwuVCAbn%2BXtE%2FgMQapvvt9zx1kDJOUibGdAEGnUAWH2RmST8wQ2rJwPjyqv7N4kF0gDZKn7e1uusJzHMYkG5SvqCN7%2BeJ6mRBfZWQynoU5uEA%3D%3D')",
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
