/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9C73F7',
        accent: '#D8F34E',
        text: '#000000',
        gray: '#595959',
        bg: '#FFFFFF',
        card: '#FFFFFF',
        violet: '#9747FF',
        border: '#E5E5E5'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      borderRadius: {
        base: '5px',
        lg: '8px'
      },
      spacing: {
        '128': '32rem',
        '64': '16rem'
      }
    },
  },
  plugins: [],
}
