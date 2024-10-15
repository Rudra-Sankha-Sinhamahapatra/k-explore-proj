/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          700: "#9333ea",
          800: "#2b145a",
          900: "#0F172A",
        },
      }
    },
  },
  plugins: [],
}

