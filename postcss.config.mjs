/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // This ensures proper browser compatibility
  },
};

export default config; // If using ES Modules
