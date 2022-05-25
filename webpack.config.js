require("dotenv").config();
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRY_DIR = path.join(__dirname, "/client/src/index.jsx");
const OUTPUT_DIR = path.join(__dirname, "/client/dist");
const TEMPLATE_DIR = path.join(__dirname, "/client/src/index.html");
const ESLintPlugin = require('eslint-webpack-plugin');

//test

module.exports = {
  mode: 'development',
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
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE_DIR,
    }),
    new ESLintPlugin(),
  ]
};