/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        "red1":"#00FF00",
        "green": "#FF4F00",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#FCFCFC",
        "new1":"#EDF0F2"
      },
      fontFamily:
      {
        hindi: ['Tiro Devanagari Hindi', 'sans-serif'],
        // "hindi": ["Tiro Devanagari Hindi", "serif"],
        "patrick":["Patrick Hand", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
}

