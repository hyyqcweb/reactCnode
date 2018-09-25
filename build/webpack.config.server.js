const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base') // 引入公共module

module.exports = webpackMerge(baseConfig, {
  // node 环境下运行
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server.entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  }
})
