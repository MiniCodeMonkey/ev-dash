'use strict'

const webpack = require('webpack');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  entry: [
    './resources/assets/js/app.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: './public/js/',
    publicPath: '/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
}

if (devBuild) {
  console.log('Webpack dev build');
  config.devtool = '#eval-source-map';
} else {
  console.log('Webpack production build');

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  );
}

module.exports = config;
