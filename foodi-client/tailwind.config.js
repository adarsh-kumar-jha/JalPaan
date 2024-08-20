/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "red1":"#00FF00",
        "green": "#FF4F00",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#FCFCFC",
        "new1":"#EDF0F2",
        "green1":"#0C9448",
        "green2":"#5CEE72",
        "golf":"#313738",
        "WhatsApp":"#25d366"
      },
      fontFamily:
      {
        hindi: ['Tiro Devanagari Hindi', 'sans-serif'],
        // "hindi": ["Tiro Devanagari Hindi", "serif"],
        "patrick":["Patrick Hand", "cursive"],
      },
    },
    keyframes: {
      sparkle: {
        '0%, 100%': {
          'text-shadow': '0 0 5px #fff, 0 0 10px #ff8, 0 0 15px #ff8, 0 0 20px #ff8, 0 0 25px #ff8, 0 0 30px #ff8, 0 0 35px #ff8',
        },
        '50%': {
          'text-shadow': '0 0 10px #fff, 0 0 20px #ff8, 0 0 30px #ff8, 0 0 40px #ff8, 0 0 50px #ff8, 0 0 60px #ff8, 0 0 70px #ff8',
        },
      },
    },
    animation: {
      sparkle: 'sparkle 2s infinite',
    },
  },
  plugins: [require("daisyui")],
};

