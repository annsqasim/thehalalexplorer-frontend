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
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        // Brand colors - Earth + Emerald + Sand tones
        brand: {
          earth: {
            50: "#f5f3f0",
            100: "#e8e2d9",
            200: "#d4c7b8",
            300: "#b8a690",
            400: "#9d8a6f",
            500: "#8a765c",
            600: "#6f5f4d",
            700: "#5a4d40",
            800: "#4c4137",
            900: "#403730",
            950: "#221d18",
          },
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
            950: "#022c22",
          },
          sand: {
            50: "#faf9f7",
            100: "#f4f2ed",
            200: "#e8e3d9",
            300: "#d9d1c0",
            400: "#c7baa3",
            500: "#b5a588",
            600: "#a08f6f",
            700: "#85765c",
            800: "#6f6250",
            900: "#5d5244",
            950: "#302a22",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#10B981",
          foreground: "#ffffff",
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
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "'Playfair Display'", "Georgia", "serif"],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'container': '1280px',
        'container-sm': '1024px',
        'container-md': '768px',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
