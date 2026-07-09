/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eco: {
          50: '#f4fff8',
          100: '#e8fdf0',
          500: '#22c55e',
          700: '#15803d',
          900: '#052e16'
        }
      }
    }
  },
  plugins: []
};
