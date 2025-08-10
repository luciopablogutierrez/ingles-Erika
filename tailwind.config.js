/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./a1/*.html",
    "./a2/*.html",
    "./b1/*.html",
    "./b2/*.html",
    "./c1/*.html",
    "./assets/*.js",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores del cliente: Blanco, Amarillo, Negro
        'custom-white': '#ffffff',
        'custom-white-light': '#fafafa',
        'custom-yellow': '#ffd700',
        'custom-yellow-light': '#ffed4e',
        'custom-yellow-dark': '#e6c200',
        'custom-black': '#000000',
        'custom-black-light': '#333333',
        'custom-gray': '#666666',
        'custom-gray-light': '#f5f5f5',
        'custom-gray-dark': '#222222',
        'terracotta': '#d2691e',
        'sage-green': '#9caf88'
      },
      fontFamily: {
        'primary': ['Inter', 'Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'heading': ['Playfair Display', 'Georgia', 'serif']
      },
      fontSize: {
        'xs-mobile': '1rem',      // 16px - mínimo legible en móvil
        'sm-mobile': '1.125rem',  // 18px - base móvil mejorado
        'base-mobile': '1.125rem', // 18px - mínimo para móvil legible
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'touch': '44px', // Mínimo touch target según WCAG
        'touch-comfortable': '48px',
        'touch-large': '56px'
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'custom-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}