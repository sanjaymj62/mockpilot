/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        'primary-dark': '#764ba2',
        surface: '#111',
        'surface-light': '#1f2937',
      },
    },
  },
  plugins: [],
};