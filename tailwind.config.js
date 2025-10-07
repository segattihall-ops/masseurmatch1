/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grok-black': '#050505',
        'grok-darkest': '#0A0A0B',
        'grok-dark': '#111118',
        'grok-card': '#16161D',
        'grok-gray': '#1A1A22',
        'grok-border': '#2E2E3B',
        'grok-muted': '#5B5F72',
        'grok-text': '#8A8FA3',
        'grok-light': '#E6E8EE',
        'grok-white': '#F7F7FA',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'grok-glow': '0 0 40px rgba(255, 255, 255, 0.06)',
        'grok-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
