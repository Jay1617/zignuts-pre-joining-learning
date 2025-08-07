/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        "google-sans": ['"Google Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        volkhov: ["Volkhov", "serif"],
      },
      colors: {
        "primary-orange": "#DF6951",
        "primary-yellow": "#F1A501",
        "primary-blue": "#181E4B",
        "text-gray": "#5E6282",
      },
    },
  },
  plugins: [],
};
