const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
      historyApiFallback: true
  },
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/index')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  // target: 'node',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css"),
    new Dotenv({
      path: './.env', // if not simply .env
      safe: false // lets load the .env.example file as well
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      //include: path.join(__dirname, 'client')
      query: {
        presets: ['es2015', 'react']
      }
    },{
      test: /\.json$/,
      loader: 'json-loader'
    },{
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader?config=otherSassLoaderConfig"]
      //loaders: ["style",ExtractTextPlugin.extract('style', 'css!resolve-url!sass')]
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
  ]
  }
};
