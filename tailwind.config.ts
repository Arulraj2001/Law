import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        navy: {
          dark: "#042C53",
          mid: "#0C447C",
          light: "#185FA5",
          tint: "#E6F1FB",
        },
        emerald: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          light: "#9FE1CB",
          tint: "#E1F5EE",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F5EDD0",
        },
        charcoal: "#2C2C2A",
        offwhite: "#F5F5F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(29, 158, 117, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(29, 158, 117, 0)" },
        },
        drawLine: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        countUp: "countUp 0.5s ease forwards",
        slideInLeft: "slideInLeft 0.6s ease forwards",
        slideInRight: "slideInRight 0.6s ease forwards",
        scaleIn: "scaleIn 0.5s ease forwards",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        drawLine: "drawLine 2s ease forwards",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
        "gradient-emerald": "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A84C 0%, #F5EDD0 100%)",
        "hero-pattern": "radial-gradient(ellipse at top, #185FA5 0%, #042C53 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
