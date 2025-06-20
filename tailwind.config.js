/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx', './src/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu_Regular'],
        
      },
      colors: {
        resistor: {
          'brown': '#CC3300',
          'gold': '#F4EE00',
          'silver': '#B4B4B4',
          'tableDisplay': '#D2AE6D',
          'gray': '#B4B4B4',
        }
      },
    },
  },
  plugins: [],
};
