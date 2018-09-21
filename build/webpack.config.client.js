const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
	// 项目入口文件 主 app.js
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	// 项目打包文件
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public'
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
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
};

if(isDev) {
	config.devServer = {
		host: '0.0.0.0', // 匹配 127.0.0.1, localhost, 本机IP
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		// hot: true,
		overlay: {  // 出现错误,然后在网页中显示错误(黑色弹框)
			errors: true
		},
		publicPath: '/public',
		historyApiFallback: { // 所有404请求都返回 index.html
			index: '/public/index.html'
		}
	}
}

module.exports = config;