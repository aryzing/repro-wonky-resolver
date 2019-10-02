import { resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import Dotenv from 'dotenv-webpack';

const config: Configuration = {
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: false,
    hot: true,
    stats: 'minimal',
    historyApiFallback: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Note that although this project uses TypeScript, modules in imported
    // third-party packages (i.e., node_modules) may be in files with different
    // extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'config/index.html',
    }),
    new Dotenv({
      safe: true,
      path: '.env.dev',
    }),
  ],
};

export default config;
