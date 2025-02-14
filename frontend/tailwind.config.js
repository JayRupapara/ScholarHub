/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#226597",          // Deep blue
          "secondary": "#87C0CD",        // Light blue
          "accent": "#113F67",           // Navy blue
          "neutral": "#F3F9FB",          // Light gray/white
          "base-100": "#FFFFFF",         // White
          "base-200": "#F3F9FB",         // Very light blue
          "base-300": "#87C0CD",         // Light blue
          "info": "#87C0CD",            
          "success": "#226597",          
          "warning": "#113F67",          
          "error": "#113F67",            
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
