// eslint-disable-next-line no-undef
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#22242a",
            foreground: "#ffffff",
            default: {
              100: "#292f3a",
            },
            card: "#18181b"
          },
        },
        "light": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#fbfbfd",
            foreground: "#000000",
            default: {
              100: "#ffffff",
            },
            card: "#f8f9fa"
          },
        },
      },
    }),
  ],
};
