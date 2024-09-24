import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

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
        nav: 'var(--color-nav)',
        body: 'var(--color-body)',
        text: 'var(--color-text)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        subtle: 'var(--color-subtle)',
      },
      fontFamily: {
        system: ['system-ui', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        mono: ['DM Mono', 'Input Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: {
              color: theme('colors.accent-primary'),
              textDecoration: 'none',
              borderBottom: '1px solid rgba(125, 125, 125, 0.3)',
              transition: 'border 0.3s ease-in-out, color 0.3s ease-in-out',
              '&:hover': {
                color: theme('colors.accent-secondary'),
                borderBottom: `1px solid ${theme('colors.accent-secondary')}`,
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
              borderLeftColor: theme('colors.accent-primary'),
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
              color: theme('colors.accent-secondary'),
              fontSize: '1.05em',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
              backgroundColor: theme('colors.subtle'),
              color: theme('colors.accent-primary'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.92em',
              lineHeight: 1.4,
              margin: '1em 0',
              padding: '1em',
              backgroundColor: theme('colors.subtle'),
              color: theme('colors.text'),
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
      }),
    },
  },
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
  ],
};

export default config;