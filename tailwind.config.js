/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: "hsl(var(--primary))",
          secondary: "hsl(var(--secondary))",
          muted: "hsl(var(--muted))",
          border: "hsl(var(--border))",
          card: "hsl(var(--card))",
        },
        borderRadius: {
          xl: "1rem",
        },
      },
    },
    plugins: [],
  };
  