/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ipad: '900px',
        phone: '450px',
      }
    },
  },
  plugins: [],
}

