var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./webpack.helpers.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const UGLIFY = false;

let prodConfig = {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: './',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
};

if (UGLIFY) {
  prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
    mangle: {
      keep_fnames: true
    },
    sourceMap: true
  }));
}

module.exports = webpackMerge(commonConfig, prodConfig);
