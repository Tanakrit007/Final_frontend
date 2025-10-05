module.exports = {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"],
  },
};
