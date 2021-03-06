const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/main.ts',
  output: {
    path: resolve('./docs'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'src': resolve('./src')
    }
  }
}

module.exports = config
