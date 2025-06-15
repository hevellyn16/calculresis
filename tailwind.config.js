/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx', './src/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu_Regular'],
        
      },
    },
  },
  plugins: [],
};
