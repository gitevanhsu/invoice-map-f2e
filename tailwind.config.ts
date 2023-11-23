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
        primary: { blue: "#0F172A", red: "#E11D48", bgMain: "#475569" },
        green: { light: "#22C55E", dark: "#166534", DEFAULT: "#16A34A" },
        blue: { light: "#3B82F6", dark: "#1E40AF", DEFAULT: "#2563EB" },
        orange: { light: "#F97316", dark: "#9A3412", DEFAULT: "#EA580C" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
