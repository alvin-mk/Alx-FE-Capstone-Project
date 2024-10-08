module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/JSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(41, 74, 119)', // Fix here: added the closing bracket properly
      },
    },
  },
  plugins: [], // Added the missing closing bracket for the entire module.exports
}
