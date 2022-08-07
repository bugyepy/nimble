/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
