/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1535px",
      "3xl": "1920px",
    },
    extend: {
      fontFamily: {
        tiltNeon: ["tiltNeon", "sans-serif"],
        belanosima: ["belanosima", "sans-serif"],
      },
    },
  },
  plugins: [],
};
