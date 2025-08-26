/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}", // Scan all pages in the `src/pages` folder
    "./src/components/**/*.{js,jsx,ts,tsx}", // Scan all components in the `src/components` folder
    "./src/*", // Scan all pages in the `src` folder
  ],
  theme: {
    extend: {
      fontFamily: {
        cloudy: ["CloudySunday", "serif"],
        sunflower: ["Sunflower", "serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
