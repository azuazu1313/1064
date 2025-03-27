/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        optima: ['Optima', 'sans-serif'],
        'optima-italic': ['Optima Italic', 'serif'],
        'optima-bold': ['Optima Bold', 'sans-serif'],
        unna: ['Unna', 'serif'],
        'unna-italic': ['Unna Italic', 'serif'],
        'unna-bold': ['Unna Bold', 'serif'],
        'unna-bold-italic': ['Unna Bold Italic', 'serif'],
        birthstone: ['Birthstone', 'serif'],
        nunitosans: ['NunitoSans', 'sans-serif'],
        'nunitosans-italic': ['NunitoSans Italic', 'serif'],
      },
    },
  },
  plugins: [],
};