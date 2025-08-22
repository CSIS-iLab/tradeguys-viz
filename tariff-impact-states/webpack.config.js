// webpack v4
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? '[name].js' : '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    open: true,
    watchContentBase: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true, // v1 supports cache
        terserOptions: {
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardDuplicates: { removeAll: true },
          discardComments: { removeAll: true }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/img/TradeGuys_menu_logo.svg',
        to: './img/TradeGuys_menu_logo.svg',
        toType: 'file'
      },
      {
        from: './src/img/favicon.ico',
        to: './img/favicon.ico',
        toType: 'file'
      },
      {
        from: './src/data',
        to: './data'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
