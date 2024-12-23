/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "500px" },
        sm: { max: "780px" },
        md: { max: "1024px" },
        lg: { max: "1280px" },
        xl: { max: "1440px" },
      },
    },
  },
  plugins: [],
};
