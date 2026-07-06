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
        "tem-dark-1": "#0B1524",
        "tem-dark-2": "#142536",
        "tem-dark-3": "#1C3244",
        "tem-accent": "#13C7C4",
        "tem-accent-soft": "#55D5D1",
        "tem-accent-deep": "#267B87",
        "tem-neutral-light": "#E1E7EA",
        "tem-neutral-muted": "#8DA7B3",
        "tem-cream": {
          50: "#FAF9F7",
          100: "#F5F3F0",
          200: "#E8E5DF",
        },
        "tem-grey": {
          50: "#F7F8F9",
          100: "#E8EAED",
          200: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "tem-hero": "linear-gradient(135deg,#0B1524 0%,#142536 60%,#1C3244 100%)",
        "tem-light": "linear-gradient(180deg,#E1E7EA,#FFFFFF)",
        "tem-accent-gradient": "linear-gradient(90deg,#13C7C4,#55D5D1)",
      },
      boxShadow: {
        "tem-glow": "0 0 40px rgba(19,199,196,0.45)",
      },
      borderRadius: {
        "xl2": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;


