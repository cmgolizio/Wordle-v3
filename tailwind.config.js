/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        correct: "#0BDA51",
        // correct: "#50C878",
        almost: "#FFDB58",
        // almost: "#FCF75E",
        error: "#404040",
        // error: "#1B1B1B",
        initial: "#91A3B0",
        // initial: "#2F4F4F",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        flip: "flip 0.6s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
