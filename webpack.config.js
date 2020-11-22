const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  devServer: {
    // Development server
    contentBase: "./dist",
  },

  module: {
    rules: [
      {
        // Process javascript files with Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // Process sass files
        test: /\.scss$/,
        use: [
          {
            // Extract css into own bundle,
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Enable hot module reloading in development
              hmr: process.env.NODE_ENV === "development", // injecting styles into the DOM
            },
          },
          // "style-loader", // 3. Injecting styles into the DOM
          "css-loader", // 3. css -> js
          "postcss-loader", // 2. Add vendor prefix to css
          "sass-loader", // 1. scss -> css
        ],
      },
      {
        // Required to use file-loader
        test: /\.html$/,
        use: ["html-loader"], // Copy assets needed for html
      },
      {
        // Process assets
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader", // Emits files into dist/imgs
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
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

  output: {
    filename: "[name].[contenthash].bundle.js", // [contenthash] -> cache busting
    path: path.resolve(__dirname, "dist"), // absolue path resolver
  },
};
