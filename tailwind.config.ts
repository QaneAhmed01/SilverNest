import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2.5rem',
        xl: '4rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', '"Playfair Display"', 'serif'],
      },
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-panel)',
        ink: 'var(--color-ink)',
        subtle: 'var(--color-subtle)',
        border: 'var(--color-border)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          ink: 'var(--color-brand-ink)',
          100: 'color-mix(in srgb, var(--color-brand) 12%, white)',
          200: 'color-mix(in srgb, var(--color-brand) 24%, white)',
          500: 'var(--color-brand)',
          600: 'color-mix(in srgb, var(--color-brand) 6%, black)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          100: 'color-mix(in srgb, var(--color-accent) 12%, white)',
          500: 'var(--color-accent)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '1.75rem',
        '2xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 16px 40px -24px rgba(43, 43, 43, 0.3)',
        card: '0 18px 45px -30px rgba(43, 43, 43, 0.28)',
        focus: '0 0 0 4px color-mix(in srgb, var(--color-brand) 20%, transparent)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-ink)',
            a: {
              color: 'var(--color-brand)',
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '6px',
            },
            strong: {
              color: 'var(--color-brand-ink)',
            },
          },
        },
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 220ms ease-out forwards',
        'slide-up': 'slide-up 280ms ease-out forwards',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [animate, require('@tailwindcss/typography')],
};

export default config;
