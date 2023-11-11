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
      animation: {
        "flip-reveal":
          "animate-rotate-x animate-once animate-duration-[225ms] animate-delay-[50ms] animate-ease-linear animate-normal animate-fill-forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
