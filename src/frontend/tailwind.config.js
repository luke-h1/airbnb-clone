module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {},
  plugins: [],
};
