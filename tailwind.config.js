module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
