const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,json}",
    ".flowbite-react\\class-list.json",
  ],
  important: false,
  darkMode: "class",
  theme: {},
  plugins: [
    require("flowbite/plugin"),
    flowbiteReact,
    // custom theme plugin
    require("./src/THME/index"),
  ],
};
