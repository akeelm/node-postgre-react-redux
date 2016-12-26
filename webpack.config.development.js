var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/index')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css")
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
      loader: 'json'
    },{
      test: /\.scss$/,
      //loaders: ["style-loader", "css-loader", "sass-loader?config=otherSassLoaderConfig"]
      loaders: ["style",ExtractTextPlugin.extract('style', 'css!resolve-url!sass')]
    }]
  }
};
