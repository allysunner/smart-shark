const { keyframes } = require("@emotion/react");

module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "button-smsh": "#3586ff",
        "button-bluest": "#0059df",
        "button-enem": "#003d76",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "slide-left": "animate 10s linear infinite",
        "slide-right": "animate2 10s linear infinite",
      },
      keyframes: {
        animate: {
          "0%": { "background-position": "1000px 0" },
          "100%": { "background-position": "0 0" },
        },
        animate2: {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "1000px 0" },
        },
      },
      backgroundPosition: {
        "1000px": "1000px 0",
      },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
};
