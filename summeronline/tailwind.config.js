/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    extend: {
      colors: {
        "background": "#020202",
        "primary": "#386641",
        "secondary": "#6A994E",
        "third": "#A7C957",
        "alt": "#DEF0F7",
      },
      fontFamily: {
        'firsticle': ['Lilita One', 'cursive']
      },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
}

