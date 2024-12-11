/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        font1: 'Manrope', //for headers, body, etc
        font2: 'quintessential' //for design bits
      },
      colors: {
        primary: {
          1: "#FFFFFF",
          2: "#efefef"
        },
        secondary: {
          1: "#1B1818",
          2 : "#1c1d1b"
        },
        cardColor: {
          1: '#333333',
          2: '#262626',
          3: '#888888'
        },
        border: "#404040",
        logout:{
          1: 'rgb(239 68 68)',
          2: "rgb(185 28 28)"
        },
        text: "#FFFFFF",
        darkBackground: "#1B1818"
    },
  },
  plugins: [],
  }
}