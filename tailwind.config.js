/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Ensure this path covers all your files
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Example of another folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
  themes: [
    {
      carDoctorTheme: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#FF3811",
        secondary: "teal",
        
        // Example of customizing a button class globally
        "btn-primary": {
          "background-color": "#FF3811", // Default color for primary buttons
          "color": "#ffffff", // Text color
        },
        "btn-outline": {
          "border-color": "#FF3811",
          "color": "#FF3811",
        },
        ".btn-outline.btn-primary:hover": {
          "background-color": "#FF3811",
          "color": "#ffffff",
        },
      },
    },
    "dark",  // Including dark theme support
  ],
},

};