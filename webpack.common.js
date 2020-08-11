const path = require('path');// pathモジュール
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSrcWebpack = require('hard-source-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const public = path.resolve(__dirname, 'public');

module.exports = {
  // エントリーポイントの設定
  entry: src + '/index.jsx',
  // 出力の設定
  output: {
    path: public,
    publicPath: '/',
    filename: 'bundle.js'
  },
  // modules
  module: {
    rules: [
      {// html
        test: /\.html$/,
        use: ['html-loader']
      },
      {// js
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options : {
              presets: [['@babel/preset-env', {modules: false}]]
            }
          },
        ],
      },
      {// css
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'sass-loader'
        ]
      },
      {// img
        test: /\.(jpg|JPG|jpeg|png|PNG|PING|gif|mp3|svg|ttf|woff2|woff|eot)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]'
            }
          },
        ]
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: src + '/index.html',
      filename: 'index.html'
    }),
    new HardSrcWebpack()
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'json']
  },
};