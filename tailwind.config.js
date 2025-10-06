/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        circular: ["Circular Std", "Inter", "sans-serif"],
      },
      colors: {
        spotify: {
          green: "#1DB954",
          black: "#191414",
        },
      },
    },
  },
  plugins: [],
};
