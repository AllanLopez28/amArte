/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#41B6E6",
          orange: "#F28C2E",
          magenta: "#E83F8C",
          purple: "#6B2CB4",
          red: "#E11D48"
        }
      }
    }
  },
  plugins: []
}
