/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  darkMode:"class",
  
  theme: {
    
    extend: {
      colors: {
        custoBg: '#111017',
        antiquewhite:'antiquewhite',
        platformAccount: '#333131',
      },
    },
  },
  plugins: [],
}

// import('tailwindcss').Config 
// module.exports = {
//   bg : {
//     bl: '#111017'

//   }
// }
