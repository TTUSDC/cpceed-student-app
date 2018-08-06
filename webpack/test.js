const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./base.js');


const test = webpackMerge(base, {
  mode: 'development',
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('test'),
    }),
  ],
});

module.exports = test;
