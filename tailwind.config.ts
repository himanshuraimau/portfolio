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
        primary: {
          50: '#E6FFFA',
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C5',
          400: '#38B2AC',
          500: '#319795',
          600: '#2C7A7B',
          700: '#285E61',
          800: '#234E52',
          900: '#1D4044',
        },
        secondary: {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#38A169',
          600: '#2F855A',
          700: '#276749',
          800: '#22543D',
          900: '#1C4532',
        },
      },
      fontFamily: {
        system: ['system-ui', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        mono: ['DM Mono', 'Input Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-light'),
            a: {
              color: theme('colors.accent-orange'),
              textDecoration: 'none',
              borderBottom: '1px solid rgba(125, 125, 125, 0.3)',
              transition: 'border 0.3s ease-in-out, color 0.3s ease-in-out',
              '&:hover': {
                color: theme('colors.primary.400'),
                borderBottom: `1px solid ${theme('colors.primary.400')}`,
              },
            },
            'a code': {
              color: 'inherit',
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'italic',
              lineHeight: '1.6em',
              padding: '0.5em 1em',
              marginLeft: '-1.1em',
              opacity: 0.8,
              borderLeftColor: theme('colors.primary.500'),
            },
            'blockquote > :first-child': {
              marginTop: 0,
            },
            'blockquote > :last-child': {
              marginBottom: 0,
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:first-of-type::after': {
              content: 'none',
            },
            em: {
              color: theme('colors.primary.300'),
              fontSize: '1.05em',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.primary.700'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
              margin: '1em 0',
              padding: '1em',
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.900'),
              borderRadius: theme('borderRadius.lg'),
              overflow: 'auto',
            },
            img: {
              width: '100%',
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.lg'),
              transform: 'scale(1.05)',
              margin: '2.6em 0',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text-dark'),
            a: {
              color: theme('colors.accent-orange'),
              '&:hover': {
                color: theme('colors.primary.300'),
                borderBottom: `1px solid ${theme('colors.primary.300')}`,
              },
            },
            em: {
              color: theme('colors.primary.300'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.primary.300'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    addVariablesForColors,
    nextui(),
    require('@tailwindcss/typography'),
  ],
};

export default config;