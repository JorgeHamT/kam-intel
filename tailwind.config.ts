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
        ink: "#171717",
        surface: "#FFF8F6",
        muted: "#6B7280",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(242, 77, 79, 0.08)",
      },
      backgroundImage: {
        "shell-gradient":
          "radial-gradient(circle at top right, rgba(242, 77, 79, 0.12), transparent 32%), radial-gradient(circle at left top, rgba(255, 210, 210, 0.55), transparent 22%)",
      },
    },
  },
  plugins: [],
};

export default config;
