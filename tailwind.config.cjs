/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      colors: {
        primary: "#010c2a",
        secondary: "#a6afc3ff",
        tertiary: "#001836",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};