/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-primary': 'var(--accent-primary)',
        'bg-dark': 'var(--bg-dark)',
        'bg-panel': 'var(--bg-panel)',
      },
    },
  },
  plugins: [],
}
