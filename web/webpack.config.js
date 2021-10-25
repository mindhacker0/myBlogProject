const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devmode = process.env.NODE_ENV !== "production";
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// PostCss 浏览器css兼容
const autoprefixer = require("autoprefixer");
const postcssVars = require("postcss-simple-vars");
const postcssImport = require("postcss-import");
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].[hash].js",
		chunkFilename: "chunks/[name].[hash].js",
	},
	devServer: {
		open: true,
		port: process.env.PORT || 8095,
		historyApiFallback: true
	},
	resolve: {
		alias: {
			"@": path.resolve("src")
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				baseUrl: devmode ? "'http://localhost:8099'" : "''",
			},
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html', //指定模板路径
			filename: 'index.html', //指定文件名
		}),
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[hash].css",
			chunkFilename: "static/css/[id].css",
		}),
		new OptimizeCssAssetsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				productionSourceMap: true
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx|\.js$/, ///\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
					options: {
						plugins: [
							"@babel/plugin-syntax-dynamic-import",
							"@babel/plugin-transform-runtime",
							"@babel/plugin-transform-async-to-generator",
						],
						compact: true,
					},
				},
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|cur|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader",
				options: {
					name: path.posix.join("static/assets/", "[name].[hash:7].[ext]"),
				},
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "resolve-url-loader",
						options: {},
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 3,
							modules: {
								getLocalIdent: getCSSModuleLocalIdent,
							},
						},
					},
					{
						loader: "less-loader",
						options: { sourceMap: true, },
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: devmode,
						},
					},
					{
						loader: "css-loader",
						options: { 
							modules: {
								localIdentName: "[name]_[local]_[hash:base64:5]",
							},
							importLoaders: 1,
							localsConvention: "camelCase",
							sourceMap: devmode
						},
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: function () {
								return [
									postcssImport,
									postcssVars,
									autoprefixer({
										overrideBrowserslist: [
											"last 3 versions",
											"Safari >= 8",
											"iOS >= 8",
										],
									}),
								];
							},
						},
					},
				],
			},
		]
	}
}