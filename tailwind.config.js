module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0D1B2A',
        'dark-secondary': '#1B263B',
        'dark-accent': '#415A77',
        'neon-yellow': '#FFE66D',
        'off-white': '#E0E1DD'
      },
      animation: {
        'subtle-float': 'subtle-float 6s ease-in-out infinite',
      },
      keyframes: {
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}