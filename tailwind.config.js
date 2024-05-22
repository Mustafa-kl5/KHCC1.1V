/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hussein: {
          100: "#EDECEC",
          200: "#FFFFFF",
          300: "gray",
          400: "",
          500: "",
        },
        button: {
          100: "#0B6BCB",
        },
      },
    },
  },
  plugins: [],
};
