/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // BazarExpress Brand Colors - Matched to Logo
                brand: {
                    primary: "hsl(275, 56%, 60%)",     // Soft Violet (from top-right wing)
                    'primary-dark': "hsl(275, 56%, 40%)", // Darker shade of primary
                    secondary: "hsl(186, 43%, 45%)",   // Teal Green (from top-left wing)
                    accent: "hsl(269, 45%, 50%)",      // Rich Purple (bottom wings)
                    success: "hsl(142, 76%, 36%)",     // Keep for positive actions
                    warning: "hsl(39, 100%, 50%)",     // Slightly softer amber
                    error: "hsl(0, 84%, 60%)",         // Red (default)
                    info: "hsl(217, 91%, 60%)",        // Blue (default)
                },
                surface: {
                    primary: "hsl(0, 0%, 100%)",       // White
                    secondary: "hsl(240, 20%, 97%)",   // Light lavender gray
                    tertiary: "hsl(240, 20%, 93%)",
                    'tertiary-dark': "hsl(240, 2.80%, 79.00%)",    // Lighter lavender gray
                    hover: "hsl(240, 20%, 89%)",       // Hover lavender
                    active: "hsl(240, 20%, 85%)",      // Active lavender
                },
                text: {
                    primary: "hsl(252, 15%, 15%)",     // Deep purple gray
                    secondary: "hsl(252, 12%, 35%)",   // Soft medium purple gray
                    tertiary: "hsl(252, 10%, 55%)",    // Light text gray
                    inverse: "hsl(0, 0%, 100%)",       // White
                    accent: "hsl(275, 56%, 60%)",      // Brand Primary for highlights
                },
                border: {
                    primary: "hsl(252, 20%, 85%)",     // Light lavender border
                    secondary: "hsl(252, 20%, 75%)",   // Medium lavender border
                    accent: "hsl(269, 45%, 50%)",      // Accent border
                },
                border: "hsl(252, 20%, 85%)",          // Flat border color
                codGray: "#070706",                    // Dark base
                amethystSmoke: "#a38ea6",
                bismark: "#477d82",
                mobster: "#857a96",
                martinique: "#393357",
                spectra: "#315657",
                elm: "#1b6e69",
                neptune: "#7eb4be",
                mountbattenPink: "#9c7484",
                gulfStream: "#7cacac",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
                "bounce-gentle": "bounceGentle 2s infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                bounceGentle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};