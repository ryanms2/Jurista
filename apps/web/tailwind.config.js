/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#1e293b",
        "surface-light": "#334155",
        primary: { DEFAULT: "#6366f1", light: "#818cf8", dark: "#4f46e5" },
        secondary: { DEFAULT: "#06b6d4", light: "#22d3ee" },
        accent: "#f59e0b",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#64748b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
