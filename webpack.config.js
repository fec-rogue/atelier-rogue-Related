require("dotenv").config();
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRY_DIR = path.join(__dirname, "/client/src/index.jsx");
const OUTPUT_DIR = path.join(__dirname, "/client/dist");
const TEMPLATE_DIR = path.join(__dirname, "/client/src/index.html");

module.exports = {
  entry: ENTRY_DIR,
  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE_DIR,
    }),
  ],
}