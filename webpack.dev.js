const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  // Enable source map for javascript
  devtool: "inline-source-map",

  // Development server
  devServer: { contentBase: "./dist" },

  module: {
    rules: [
      {
        // Process sass files
        test: /\.scss$/,
        use: [
          // Enable source map for css
          { loader: "style-loader" }, // 4. Injecting styles into the DOM
          { loader: "css-loader", options: { sourceMap: true } }, // 3. css -> js
          { loader: "postcss-loader", options: { sourceMap: true } }, // 2. Add vendor prefix to css
          { loader: "sass-loader", options: { sourceMap: true } }, // 1. scss -> css
        ],
      },
    ],
  },
});
