/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7289DA',    
        secondary: '#2C2F33',    
        background: '#23272A',    
        accent: '#99AAB5',        
      },
    },
  },
  variants: {},
  plugins: [],
};