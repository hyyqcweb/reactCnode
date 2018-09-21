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
            // eslint 规则
            {
                enforce: "pre",
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.resolve(__dirname,'../node_modules')
                ]
            },
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