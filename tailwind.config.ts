import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nav-light': '#81977E',
        'body-light': '#F5F5DC',
        'text-light': '#333333',
        'accent-orange': '#FF9900',
        'accent-green': '#4CAF50',
        'nav-dark': '#32519A',
        'body-dark': '#1A1A2E',
        'text-dark': '#FFFFFF',
      },
      fontFamily: {
        system: ['system-ui', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        mono: ['Noto Sans Mono', 'monospace'],
      },
    },
  },
  plugins: [addVariablesForColors, nextui()],
};

export default config;
