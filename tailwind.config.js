module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      // display: ['group-hover'],
      visibility: ['hover', 'group-hover'],
    },
  },
  theme: {
    extend: {
      minHeight: {
        '44-w-screen': '44vw',
      },
      width: {
        ss: '1920px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        ss: '1920px',
      },
      screens: {
        ss: '1920px',
      },
      minWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        ss: '1920px',
      },
    },
    // screens: {
    //   ss: '1920px',
    // },
  },
  plugins: [],
};
