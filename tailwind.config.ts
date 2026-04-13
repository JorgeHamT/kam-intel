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
          DEFAULT: "#F24D4F",
          50: "#FFF1F1",
          100: "#FFE4E4",
          200: "#FFC7C8",
          300: "#FFA3A5",
          400: "#FF7476",
          500: "#F24D4F",
          600: "#D83739",
          700: "#B72B2D",
          800: "#982528",
          900: "#7E2426",
        },
        ink: "#17181B",
        surface: "#F4F4F6",
        muted: "#6D7481",
      },
      boxShadow: {
        panel: "0 8px 24px rgba(20, 20, 24, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
