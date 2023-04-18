/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                white: "#fff",
                black: "#000",
                green: "#0d0",
            },
            container: {
                padding: "2rem",
            },
        },
    },
    plugins: [],
};
