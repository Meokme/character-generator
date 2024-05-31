/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5CC2E7',
          light: '#A1DCF1',
          dark: '#187CA0',
        },
        secondary: {
          DEFAULT: '#F3DE8A',
          light: '#F8ECBD',
          dark: '#C6A215',
        },
        white: 'var(--color-light-grey)',
        black: 'var(--color-dark-grey)',
      },
    },
  },
  plugins: [],
};
