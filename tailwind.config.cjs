/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#010c2a",
        secondary: "#a6afc3ff",
        tertiary: "#001836",
        "black-100": "#100d25",
        "black-200": "#030b25ff",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/background.png')",
      },
    },
  },
  plugins: [],
};