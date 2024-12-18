import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'dark-green-main': '#0D423F',
        'dark-green-light': '#1A6759',
        'dark-green-dark': '#073027',
        'vibrant-green-main': '#69E470',
        'vibrant-green-light': '#8EF6A3',
        'vibrant-green-dark': '#2DA949',
        'lime-green-main': '#F1FDC1',
        'lime-green-light': '#FAFEDA',
        'lime-green-dark': '#C2CE98',
        'soft-green-main': '#E2E7C7',
        'soft-green-light': '#F4F7EF',
        'soft-green-dark': '#ADB29B',
        'yellow-main': '#FFD15C',
        'yellow-light': '#FFEBB5',
        'yellow-dark': '#CCAA49',
        'orange-main': '#F4933B',
        'orange-light': '#F9C189',
        'orange-dark': '#C3722D',
        'blue-main': '#84A0FF',
        'blue-light': '#B5C9FF',
        'blue-dark': '#5A78CC',
        'light-pink-main': '#F2B8F4',
        'light-pink-light': '#F8D0F8',
        'light-pink-dark': '#B288B2',
        'soft-white-main': '#F9F9F9',
        'soft-white-light': '#FFFFFF',
        'soft-white-dark': '#C7C7C7',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
