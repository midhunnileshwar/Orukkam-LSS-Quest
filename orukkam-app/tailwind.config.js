module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        chembakam: ['"Baloo Chettan 2"', 'cursive'],
      },
      colors: {
        'candy-purple': '#d946ef', // Fuchsia 500
        'candy-pink': '#ec4899',   // Pink 500
        'candy-blue': '#3b82f6',   // Blue 500
        'candy-green': '#22c55e',  // Green 500
        'candy-yellow': '#eab308', // Yellow 500
        'candy-red': '#ef4444',    // Red 500
        'candy-orange': '#f97316', // Orange 500
        // Specific Lands (Vibrant)
        'land-maths': '#fbbf24', // Amber
        'land-malayalam': '#84cc16', // Lime
        'land-english': '#6366f1', // Indigo
        'land-evs': '#10b981', // Emerald
        'land-gk': '#f43f5e', // Rose
      },
      boxShadow: {
        'cartoon': '0 6px 0 0 rgba(0,0,0,0.2)',
        'cartoon-sm': '0 3px 0 0 rgba(0,0,0,0.2)',
        'cartoon-lg': '0 10px 0 0 rgba(0,0,0,0.2)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-Gentle': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
