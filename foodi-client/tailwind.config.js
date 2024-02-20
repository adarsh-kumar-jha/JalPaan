/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
           extend: {
               colors: {
                // international-orange
                "green": "#FF4F00",
                "red": "#FF6868",
                "secondary": "#555",
                "prigmayBG": "#FCFCFC"
        
               },
               fontFamily:{
                 "primary": ['Inter','sans-serif'],
                 // "hindi": ["Tiro Devanagari Hindi", "serif"],
                 "patrick":["Patrick Hand", "cursive"],
         
               }
           },
  },
  plugins: [require("daisyui")],
}

