const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    worker: './src/worker.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html'})
  ]
}