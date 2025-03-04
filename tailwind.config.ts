import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terpel: {
          red: "#FF0818",
          white: "#FFFFFF",
          yellow: "#FFE500",
          "yellow-2": "#FDB913"
        },
      },
      fontFamily: {
        terpel: ['TerpelSans', 'sans-serif'],
        'terpel-condensed': ['TerpelSans-Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;