const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",

  module: {
    rules: [
      {
        // Process sass files
        test: /\.scss$/,
        use: [
          {
            // Extract css into own bundle,
            loader: MiniCssExtractPlugin.loader,
          },
          // "style-loader", // 3. Injecting styles into the DOM
          "css-loader", // 3. css -> js
          "postcss-loader", // 2. Add vendor prefix to css
          "sass-loader", // 1. scss -> css
        ],
      },
    ],
  },

  plugins: [
    // To recognize html files
    new HtmlWebpackPlugin({
      // Specify template html to auto include js & css with contenthash name
      template: "./src/template.html",
      // Minify html
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      // Extract css out to own file from bunble.js
      filename: "[name].[contenthash].bundle.css",
    }),
    new CleanWebpackPlugin(), // Clean ./dist folder each build
  ],
});
