/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            accent: '#F9F93E',
            background: {
              light: 'rgba(255, 255, 255, 0.05)',
              dark: '#020206',
              DEFAULT: '#11121A',
            },
            text: {
              secondary: '#0B0C1B',
              grey: 'rgba(0, 0, 0, 0.60)',
              test: '#FFFFFF',
              DEFAULT: '#FFFFFF',
            },
          },
        },
      },
    }),
  ],
};
