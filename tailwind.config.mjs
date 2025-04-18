/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pastoral-gradient":
          "linear-gradient(to right, #A63B1D 0%, #8D2E11 50%, #75240D 100%)",
      },
      colors: {
        "pastoral-theme-color": "#892D0F",
        "pastoral-light-black": "#222222",
        "pastoral-light-gray": "#717171",
      },
      gridTemplateRows: {
        "new-listing": "auto 1fr auto",
      },
    },
  },
  plugins: [],
};

export default config;
