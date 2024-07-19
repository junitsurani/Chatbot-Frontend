module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'blue-500': '#4299E1',
        'white': '#ffffff',
        'gray-300': '#D1D5DB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
