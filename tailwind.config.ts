import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dental-white": "#FAFAF8",
        "dental-cream": "#F0EDE8",
        "dental-teal": "#1E3A4A",
        "dental-teal-light": "#2D4A5A",
        "dental-gold": "#C9A96E",
        "dental-muted": "#6B7280",
        "dental-text": "#1A1A1A",
        cream: {
          50: "#FAFAF8",
          100: "#F5F2ED",
          200: "#F0EDE8",
          300: "#E8E2D8",
        },
        teal: {
          DEFAULT: "#2D4A5A",
          deep: "#1E3A4A",
          dark: "#142A38",
          light: "#3D5C6E",
        },
        gold: {
          DEFAULT: "#C9A96E",
          light: "#D9BC85",
          dark: "#A88A52",
          muted: "#B8975C",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
          muted: "#6B7280",
          subtle: "#9CA3AF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(20, 42, 56, 0.06)",
        "soft-lg": "0 10px 40px -5px rgba(20, 42, 56, 0.08)",
        "premium": "0 20px 60px -15px rgba(20, 42, 56, 0.15)",
        "gold-glow": "0 0 30px -5px rgba(201, 169, 110, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
