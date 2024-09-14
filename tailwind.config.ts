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
        mono: ['DM Mono', 'Input Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-light'),
            a: {
              color: theme('colors.accent-orange'),
              textDecoration: 'none',
              borderBottom: '1px solid rgba(125, 125, 125, 0.3)',
              transition: 'border 0.3s ease-in-out',
              '&:hover': {
                borderBottom: `1px solid ${theme('colors.text-light')}`,
              },
            },
            'a code': {
              color: 'inherit',
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              lineHeight: '1.6em',
              padding: '0.5em 1em',
              marginLeft: '-1.1em',
              opacity: 0.7,
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
              color: theme('colors.text-dark'),
              fontSize: '1.05em',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
              margin: '0.5em 0',
              padding: '1em',
              backgroundColor: '#fafafa',
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
                borderBottom: `1px solid ${theme('colors.text-dark')}`,
              },
            },
            pre: {
              backgroundColor: '#0e0e0e',
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