const path = require('path');

module.exports = {
  entry: './src/export',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader?exportAsEs6Default"
      }    
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
  },
};