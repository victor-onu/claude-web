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
        // Primary Colors
        purple: {
          deep: "#670EB3",
          electric: "#A41AFF",
        },
        green: {
          light: "#BFEE7F",
        },
        // Secondary Colors
        teal: "#59D6E6",
        yellow: {
          brand: "#FFD761",
        },
        blue: {
          deep: "#002BA1",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #670EB3 0%, #A41AFF 100%)",
        "gradient-teal": "linear-gradient(135deg, #59D6E6 0%, #A41AFF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
