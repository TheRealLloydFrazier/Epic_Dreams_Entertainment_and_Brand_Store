import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a1a",
        foreground: "#f5f5f5",
        accent: {
          // Primary cosmic purple/violet palette
          violet: "#a78bfa",
          "violet-light": "#c4b5fd",
          "violet-dark": "#7c3aed",
          purple: "#8b5cf6",
          cosmic: "#1e1b4b",
          "cosmic-light": "#312e81",
          // Secondary accent (orange/amber for highlights)
          ember: "#f97316",
          "ember-light": "#fb923c",
          // Legacy gold for merchandise branding only
          gold: "#d4af37",
          "gold-light": "#f5d280"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")]
};

export default config;
