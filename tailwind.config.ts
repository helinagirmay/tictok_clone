import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#7e96fa",
          500: "#5b72f5",
          600: "#4353e8",
          700: "#3640d0",
          800: "#2e35a8",
          900: "#2a3185",
          950: "#1c2054",
        },
      },
    },
  },
  plugins: [],
};

export default config;
