/* eslint-disable import/no-extraneous-dependencies */
// Base variables
// const path = require('path');

// Importing plugins that do not come by default in webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // JS and scss entry points for main/index page
    index: [
      './src/js/main.js', // Javascript entry point
      './src/scss/main.scss', // scss entry point
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // excluding js files in node_modules from transformation
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // configuration in postcss.config.js
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', ':data-src'],
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpe?g|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../', // fonts folder is outside scss/css folder, thats why we need to go one folder up.
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // uncomment to enable jQuery
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:4].css',
      chunkFilename: 'css/[id]-[contenthash:4].css',
    }),
    new HtmlWebpackPlugin({
      title: 'My awesome index page',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
};
