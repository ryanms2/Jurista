/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark theme palette
        background: "#0f172a",
        surface: "#1e293b",
        "surface-light": "#334155",
        primary: "#6366f1",
        "primary-light": "#818cf8",
        secondary: "#06b6d4",
        accent: "#f59e0b",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#64748b",
        "text-primary": "#f8fafc",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        border: "#334155",
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
