/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c1420",
        panel: "#131e2d",
        raised: "#1b2b40",
        phosphor: {
          DEFAULT: "#FF6FAE",
          bright: "#FFB3D1",
          dim: "#C94F83",
        },
        parchment: "#dce8f5",
        muted: "#7c93ad",
        posi: "#7fd4a3",
        neg: "#e0768a",
      },
      fontFamily: {
        display: ["'Space Mono'", "monospace"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 18px rgba(77, 178, 255, 0.25)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.98" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
