const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); // webpack-merge is used to merge common settings with development specific ones.
const common = require('./webpack.common.js'); // Importing common webpack config

module.exports = merge(common, {
  // Path for bundled files
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[name]-[hash:4].js', // hash is used instead of contenthash for HMR compatibility
    filename: 'js/[name]-[hash:4].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
