/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
   
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
          fontFamily: {
            sans: ["var(--font-inter)"],
            playfair: ["var(--font-playfair)"],
          },
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
            // Warm color palette for custom elements
            warm: {
              50: "hsl(40, 100%, 97%)",
              100: "hsl(40, 100%, 94%)",
              200: "hsl(35, 90%, 88%)",
              300: "hsl(30, 85%, 80%)",
              400: "hsl(25, 80%, 70%)",
              500: "hsl(20, 80%, 60%)",
              600: "hsl(15, 75%, 55%)",
              700: "hsl(10, 70%, 45%)",
              800: "hsl(5, 65%, 35%)",
              900: "hsl(0, 60%, 30%)",
            },
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
          keyframes: {
            "accordion-down": {
              from: { height: 0 },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: 0 },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
          },
          typography: ({ theme }) => ({
            DEFAULT: {
              css: {
                color: 'hsl(var(--foreground))',
                a: {
                  color: 'hsl(var(--primary))',
                  '&:hover': {
                    color: 'hsl(var(--primary) / 0.8)',
                  },
                  textDecoration: 'none',
                  fontWeight: '500',
                },
                h1: {
                  fontFamily: 'var(--font-playfair)',
                  color: 'hsl(var(--foreground))',
                  fontWeight: '700',
                },
                h2: {
                  fontFamily: 'var(--font-playfair)',
                  color: 'hsl(var(--foreground))',
                  fontWeight: '700',
                },
                h3: {
                  fontFamily: 'var(--font-playfair)',
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                h4: {
                  fontFamily: 'var(--font-playfair)',
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                blockquote: {
                  fontStyle: 'italic',
                  borderLeftColor: 'hsl(var(--primary) / 0.5)',
                  color: 'hsl(var(--muted-foreground))',
                },
                strong: {
                  color: 'hsl(var(--foreground))',
                  fontWeight: '600',
                },
                code: {
                  color: 'hsl(var(--foreground))',
                  backgroundColor: 'hsl(var(--muted))',
                  borderRadius: '0.25rem',
                  padding: '0.15rem 0.3rem',
                },
                pre: {
                  backgroundColor: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                  borderRadius: 'var(--radius)',
                  padding: theme('spacing.4'),
                  code: {
                    backgroundColor: 'transparent',
                    padding: '0',
                  },
                },
                hr: {
                  borderColor: 'hsl(var(--border))',
                },
                ul: {
                  li: {
                    '&::marker': {
                      color: 'hsl(var(--primary))',
                    },
                  },
                },
                ol: {
                  li: {
                    '&::marker': {
                      color: 'hsl(var(--primary))',
                    },
                  },
                },
                table: {
                  thead: {
                    borderBottomColor: 'hsl(var(--border))',
                  },
                  tbody: {
                    tr: {
                      borderBottomColor: 'hsl(var(--border))',
                    },
                  },
                },
              },
            },
          }),
        },
      },
      plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
    }