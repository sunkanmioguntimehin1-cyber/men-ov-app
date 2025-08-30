/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        // Mobile-first custom breakpoints for RN + web parity
        xs: "360px", // small phones
        sm: "400px", // large phones
        md: "768px", // small tablets
        lg: "1024px", // tablets / small desktop
        xl: "1280px", // large desktop (web only)
      },
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        primaryLight: "var(--primaryLight)",
        secondary: "var(--secondary)",
        titleText: "var(--titleText)",
        blackbright: "var(--blackbright)",
        errorline: "var(--errorline)",
        white: "var(--white)",
        black: "var(--black)",
      },
    },
  },
  plugins: [],
};
