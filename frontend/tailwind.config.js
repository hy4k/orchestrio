/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1d21', 'dark-card': '#24282e', 'teal-accent': '#00a99d',
        'light-text': '#e1e1e1', 'medium-text': '#a0a0a0',
        'status-online': '#28a745', 'status-offline': '#dc3545', 'status-error': '#ffc107',
      },
      fontFamily: { mono: ['Roboto Mono', 'monospace'] },
    },
  },
  plugins: [],
}
