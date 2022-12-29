/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "loader-1": "#10b981",
        "loader-2": "#3d84f6"
      },
      keyframes: {
        growshrink: {
          "0%,100%": {
            transform: "scale(0.0)",
            "-webkit-transform": "scale(0.0)"
          },
          "50%": {
            transform: "scale(1.0)",
            "-webkit-transform": "scale(1.0)"
          }
        }
      },
      animation: {
        loading: "growshrink 3s infinite ease-in-out"
      }
    }
  },
  plugins: [require("tailwindcss-animation-delay")]
}
