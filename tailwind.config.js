/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hindi: ['Tiro Devanagari Hindi', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pan: {
          '0%': { transform: 'scale(1.2) translateX(0)' },
          '100%': { transform: 'scale(1.2) translateX(-10%)' },
        },
        pageFlip: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(20deg)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        slideUp: 'slideUp 1s ease-out',
        pan: 'pan 8s ease-in-out infinite alternate',
        pageFlip: 'pageFlip 2s ease-in-out infinite',
        rain: 'rain 1s linear infinite',
      },
    },
  },
  plugins: [],
}
