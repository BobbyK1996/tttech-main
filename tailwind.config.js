/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '4k': '2200px',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)'],
      },
      colors: {
        primary: {
          50: '#e9fffe',
          100: '#c9fffe',
          200: '#99ffff',
          300: '#54fbff',
          400: '#07edff',
          500: '#00cfef',
          600: '#00a4c9',
          700: '#0082a1',
          800: '#086882',
          900: '#0c556d',
          950: '#00171f',
        },
        accent: {
          50: '#f2fbf9',
          100: '#d4f3ee',
          200: '#a9e6dd',
          300: '#76d2c9',
          400: '#49b8b0',
          500: '#2f9a94',
          600: '#247d7a',
          700: '#206563',
          800: '#1e5151',
          900: '#1d4443',
          950: '#0b2728',
        },

        // primary: {
        //   50: '#E1E8EF',
        //   100: '#D4DEE7',
        //   200: '#B7C7D7',
        //   300: '#99B0C7',
        //   400: '#7C99B6',
        //   500: '#5E82A6',
        //   600: '#4C6B8A',
        //   700: '#3C546C',
        //   800: '#2C3D4F',
        //   900: '#1B2631',
        //   950: '#141C24',
        // },
        // accent: {
        //   50: '#FAF5F0',
        //   100: '#F4ECE1',
        //   200: '#E8D6BF',
        //   300: '#DDC2A2',
        //   400: '#D2AF84',
        //   500: '#C69963',
        //   600: '#B78343',
        //   700: '#926835',
        //   800: '#6C4D28',
        //   900: '#4B351B',
        //   950: '#382814',
        // },
      },
    },
  },
  plugins: [],
};
