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
                // BazarExpress Brand Colors - Enhanced with proper HSL values
                brand: {
                    primary: "hsl(28, 100%, 45%)", // Rich Orange
                    secondary: "hsl(195, 85%, 35%)", // Deep Teal
                    accent: "hsl(280, 65%, 60%)", // Purple Accent
                    success: "hsl(142, 76%, 36%)", // Green
                    warning: "hsl(45, 93%, 47%)", // Amber
                    error: "hsl(0, 84%, 60%)", // Red
                    info: "hsl(217, 91%, 60%)", // Blue
                },
                surface: {
                    primary: "hsl(0, 0%, 100%)", // White
                    secondary: "hsl(210, 40%, 98%)", // Light Gray
                    tertiary: "hsl(210, 40%, 95%)", // Lighter Gray
                    hover: "hsl(210, 40%, 92%)", // Hover Gray
                    active: "hsl(210, 40%, 88%)", // Active Gray
                },
                text: {
                    primary: "hsl(222, 84%, 5%)", // Dark Blue Gray
                    secondary: "hsl(215, 16%, 47%)", // Medium Gray
                    tertiary: "hsl(215, 20%, 65%)", // Light Gray
                    inverse: "hsl(0, 0%, 100%)", // White
                    accent: "hsl(28, 100%, 45%)", // Brand Primary
                },
                border: {
                    primary: "hsl(214, 32%, 91%)", // Light Border
                    secondary: "hsl(214, 32%, 85%)", // Medium Border
                    accent: "hsl(28, 100%, 45%)", // Accent Border
                },
                // Add flat border color for Tailwind utility class
                border: "hsl(214, 32%, 91%)",
                // Original BazarExpress colors for backward compatibility
                codGray: "#070706",
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
    plugins: [require("tailwindcss-animate")],
}