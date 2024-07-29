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
        'title': ['turquoise-inline'],
        'title2': ['latienne-pro'],
        'content': ['']
      },
      rotate: {
        '200': '200deg',
        '60': '60deg',
        '20': '20deg',
        '30': '30deg',
        '240': '240deg',
      },
      height: {
        '128': '40rem',
        'double': '200%',
      },
      width: {
        '128': '40rem',
        'double': '200%',
      },
      spacing: {
        '45': '11.5rem',
      },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
}

