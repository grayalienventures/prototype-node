// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const { resolve } = require('path');
module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    `webpack-hot-middleware/client`,
    'webpack/hot/only-dev-server',

    './index.tsx' // the entry point of our app
  ],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    port: process.env.PORT,
    open: true,
    hot: true, // enable HMR on the server
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        // pathRewrite: { '^/api': '' },
        ws: true // important
      },
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
});
