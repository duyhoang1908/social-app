/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        inputColor: "#F0F2F5",
        textColor: "#333333",
        primaryBg: "#F0F2F5",
      },
    },
  },
  plugins: [],
};
