const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.ts'),
    help: path.join(__dirname, 'src/help.ts'),
    'cookies-policy': path.join(__dirname, 'src/cookies-policy.ts'),
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html',
      title: 'Turbo Typing',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'help.html',
      template: 'src/template.html',
      title: 'Turbo Typing | Help',
      chunks: ['help'],
    }),
    new HtmlWebpackPlugin({
      filename: 'cookies-and-localstorage-policy.html',
      template: 'src/template.html',
      title: 'Turbo Typing | Cookies and Local Storage Policy',
      chunks: ['cookies-policy'],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkhash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: '' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        use: 'svg-url-loader',
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.ts'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
  },
};
