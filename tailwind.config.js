/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '80rem',
      },
      colors: {
        primary: {
          50: '#e8f4ff',
          100: '#d1e7ff',
          200: '#b3d9ff',
          300: '#85c5ff',
          400: '#56a3ff',
          500: '#1646A2',
          600: '#1446A2',
          700: '#123e91',
          800: '#0f3376',
          900: '#0d2a61',
          950: '#091a3a'
        },
        accent: {
          DEFAULT: '#EF5350',
          red: '#EF5350'
        },
        gray: {
          50: '#F7F7F7',
          900: '#212121',
          700: '#3B3B3B'
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['Montserrat', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}