/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { color: { primary: "#F8F5F0" } },
  },
  plugins: [],
};
