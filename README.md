##### 这是一个万中无一的项目 :relaxed::relaxed::relaxed:

:heart:  详细配置了 webpack 

:heart:  项目采用了严格的 eslint (开发过程中的eslint, 乃至commit提交过程中的 eslint强制检测,让人有一种脑壳疼的感觉),为了更好的团队协作

###### webpack 配置详解  :relaxed:
```
	// webpack.config.client 运行在web 端
   
    // 判断是否为开发环境
	const isDev = process.env.NODE_ENV === 'development'

	const config = {
		// 项目入口文件 主 app.js
		entry: {
			app: path.join(__dirname, '../client/app.js')
		},
		// 项目打包文件
		output: {
			filename: '[name].[hash].js',
			path: path.join(__dirname, '../dist'),
			publicPath: '/public/'
		},
		// 项目运行规则 可以适配 jsx,js文件
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
		},
		// 项目运行在web端
		plugins: [
			new HTMLPlugin({
				template: path.join(__dirname, '../client/template.html')
			})
		]
	};

	if(isDev) {
		config.entry = {
			app: [
				'react-hot-loader/patch',
	            path.join(__dirname, '../client/app.js')
			]
		};
		config.devServer = {
			host: '0.0.0.0', // 匹配 127.0.0.1, localhost, 本机IP
			port: '8888',
			contentBase: path.join(__dirname, '../dist'),
			hot: true,
			overlay: {  // 出现错误,然后在网页中显示错误(黑色弹框)
				errors: true
			},
			publicPath: '/public/',
			historyApiFallback: { // 所有404请求都返回 index.html
				index: '/public/index.html'
			}
		};
		config.plugins.push(new webpack.HotModuleReplacementPlugin())
	}

	module.exports = config
```
```
	// 运行在node端 server
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
```
###### package.json 配置详解  :relaxed:
```
	{
	  "name": "react-cnode", // 项目名称
	  "version": "1.0.0", // 项目版本号
	  "description": "", // 项目描述
	  "main": "index.js", // 主文件入口
	  "scripts": {
	    "build:client": "webpack --config build/webpack.config.client.js", // web端打包
	    "build:server": "webpack --config build/webpack.config.server.js", // server(node端)打包
	    "clear": "rimraf dist", // 删除dist文件
	    "build": "npm run clear && npm run build:client && npm run build:server" // 先删除dist文件,在依次打包
	  },
	  "keywords": [], 
	  "author": "hyyqc", // 作者
	  "license": "ISC",
	  "dependencies": {
	    "react": "^16.5.2",
	    "react-dom": "^16.5.2",
	    "webpack": "^3.9.1"
	  },
	  "devDependencies": {
	    "babel-core": "^6.26.0",  // webpack.config.client 配置
	    "babel-loader": "^7.1.2", // webpack.config.client 配置
	    "babel-preset-es2015": "^6.24.1", // .babelrc配置
	    "babel-preset-es2015-loose": "^8.0.0", // .babelrc配置
	    "babel-preset-react": "^6.24.1", // .babelrc配置
	    "html-webpack-plugin": "^2.30.1", // webpack.config.client 配置
	    "rimraf": "^2.6.2" // node小插件,作用就是删除 dist文件
	  }
	}
```
