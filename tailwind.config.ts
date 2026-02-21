import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#8B1A1A",
          dark: "#5C0A0A",
          950: "#2D0505",
        },
        gray: {
          50: "#FFFFFF",
          100: "#F5F5F5",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          900: "#333333",
          950: "#0F0F0F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: [
          "var(--font-playfair)",
          "Playfair Display",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(220, 20, 60, 0.08)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
