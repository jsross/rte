const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const assets = [
  {
    from: 'src/img',
    to: 'img/'
  }
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: ['.DS_Store']
  })
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      entry: './src/export.ts',
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader'
            }
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }         
        ]
      },
      plugins,
      resolve: {
        extensions: ['.ts', '.js']
      }
    },
    modeConfig({ mode, presets })
  );
};
