const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Code splitting: multiple entries
  entry: {
    // key is file name
    index: { import: "./src/js/index.js" },
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

  optimization: {
    // Split every chunk into own file
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    // To recognize html files
    new HtmlWebpackPlugin({
      // Specify template html to auto include js & css with contenthash name
      template: "./src/template.html",
    }),
  ],

  output: {
    filename: "[name].[contenthash].bundle.js", // [contenthash] -> cache busting
    path: path.resolve(__dirname, "dist"), // absolue path resolver
  },
};
