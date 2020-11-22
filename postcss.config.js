module.exports =
  process.env.NODE_ENV === "production"
    ? {
        plugins: {
          autoprefixer: {},
          cssnano: {}, // Only minimize css in production
          "rucksack-css": {},
        },
      }
    : {
        plugins: {
          autoprefixer: {},
          "rucksack-css": {},
        },
      };
