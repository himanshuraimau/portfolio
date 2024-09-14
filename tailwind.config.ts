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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-light'),
            a: {
              color: theme('colors.accent-orange'),
              '&:hover': {
                color: theme('colors.accent-green'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text-dark'),
            a: {
              color: theme('colors.accent-orange'),
              '&:hover': {
                color: theme('colors.accent-green'),
              },
            },
          },
        },
      }),
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    nextui(),
    require('@tailwindcss/typography'),
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '15px 15px 30px rgba(0, 0, 0, 0.11)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
};

export default config;