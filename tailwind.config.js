/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
const { red } = require('next/dist/lib/picocolors');

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
              light: '#1D1E2A',
              dark: '#020206',
              DEFAULT: '#020206',
            },
            text: {
              secondary: '#0B0C1B',
              grey: '#8E8E94',
              DEFAULT: '#FFFFFF',
            },
            border: {
              DEFAULT: '#11121A',
            },
          },
        },
      },
    }),
  ],
};
