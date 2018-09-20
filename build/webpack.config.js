const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
	// 项目入口文件 主 app.js
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	// 项目打包文件
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: ''
	},
	// 项目运行规则 可以适配 jsx,js文件
	module: {
		rules : [
			{
				test: /.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: [
					path.join(__dirname,'../node_modules')
				]
			}
		]
	},
	// 项目运行在web端
	plugins: [
		new HTMLPlugin()
	]
}