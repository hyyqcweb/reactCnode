const path = require('path');

module.exports = {
	// node 环境下运行
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server.entry.js')
	},
	output: {
		filename: 'server-entry.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public',
		libraryTarget: 'commonjs2'
	},
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
	}
};