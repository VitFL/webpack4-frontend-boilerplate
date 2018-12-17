/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
// Base variables
const path = require('path');

// Importing plugins that do not come by default in webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pages = require('./src/pages');

// Populating htmlPlugins array with HtmlWebpackPlugin instances for each page from ./src/pages.js
const htmlPlugins = [];
pages.forEach(page => {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: page.template,
      filename: page.output,
      title: page.content.title,
      description: page.content.description,
    })
  );
});

module.exports = {
  entry: {
    // JS and scss entry points
    main: [
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
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            query: {
              helperDirs: [path.join(__dirname, 'src', 'helpers')],
              partialDirs: [path.join(__dirname, 'src', 'partials')],
            },
          },
          'extract-loader',
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
        exclude: /node_modules/, // excluding images in node_modules
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
    ...htmlPlugins,
    new CleanWebpackPlugin(['dist']),
  ],
};
