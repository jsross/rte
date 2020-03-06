const path = require('path');

module.exports = {
  entry: './src/export',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
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
    library: 'MojjRte',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: [path.join(__dirname, './dist'), path.join(__dirname, './node_modules')],
    compress: true,
    hot: true,
    port: 8007
  },
};