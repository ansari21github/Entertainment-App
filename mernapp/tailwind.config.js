/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      height: {
          header: '560px',
          rate: '400px'
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      },
      textColor: ['active'],
      colors: {
        // main: '#080A1A',
        main: "#10141F",
        subMain: '#d42020',
        dry: '#0B0F29',
        star: '#FFB000',
        text: '#C0C0C0',
        border: '#4b5563',
        dryGray: '#E0D5D5',
        // form: '#343a61',
        form:"#161d2f",
        glass:'#856a6a',
        brown: "#343a61"
        
      }
      
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
