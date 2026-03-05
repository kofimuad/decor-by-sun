/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1B4332',
          mid: '#2D6A4F',
          light: '#52796F',
          dark: '#0f2a1f',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C97E',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE6D6',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}
