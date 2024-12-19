module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customyellow: "EEC643",
        customblack: "141414",
        customdull: "EEF0F2",
        customblue: "0D21A1",
        customDarkBlue: "011638",
      },
    },
  },
  plugins: [],
};
