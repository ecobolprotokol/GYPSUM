import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '3/4': '3 / 4',
        '1/1': '1 / 1',
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'slide-left': 'slideLeft 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '220 14% 10%',
          '--muted': '220 14% 96%',
          '--muted-foreground': '220 9% 46%',
          '--border': '220 13% 91%',
          '--accent': '18 50% 45%',
          '--accent-foreground': '0 0% 100%',
          '--primary': '220 14% 10%',
          '--primary-foreground': '0 0% 100%',
          '--ring': '18 50% 45%',
          '--radius': '0.5rem',
        },
        '.dark': {
          '--background': '220 14% 6%',
          '--foreground': '220 14% 96%',
          '--muted': '220 14% 14%',
          '--muted-foreground': '220 9% 60%',
          '--border': '220 13% 22%',
          '--accent': '18 50% 52%',
          '--accent-foreground': '0 0% 100%',
          '--primary': '220 14% 96%',
          '--primary-foreground': '0 0% 6%',
          '--ring': '18 50% 52%',
        },
      });
    }),
  ],
} satisfies Config;
