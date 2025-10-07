/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#B393D3',
        gold: '#F5C16C',
        dark: '#0C0C0C'
      },
      fontFamily: {
        rowland: ['Rowland', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(179,147,211,0.4)',
      },
    },
  },
  plugins: [],
}
