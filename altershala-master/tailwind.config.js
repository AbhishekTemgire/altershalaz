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
        'max-media': { max: '700px' },
        'min-media': { min: '700px' },
        'post-trend': { min: '655px' },

        'sec-media': { max: '1023px' },
        'sec-media-min': { min: '1637px' },
        'third-media': { max: '850px' },
        'third-min-media': { min: '750px' },
        'post-media' : { max: '600px'},
        'post-min-media': { min: '1240px'},
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
