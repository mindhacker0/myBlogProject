const path = require("path");
const webpack = require("webpack");
const devmode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//编辑器不适用css modules
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    mode:process.env.NODE_ENV,
    output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].[fullhash].js",
		chunkFilename: "chunks/[name].[fullhash].js",
	},
    devServer: {
		open: true,
        static: {
            directory: path.join(__dirname, '/static/'),
        },
		port: process.env.PORT || 8095,
		historyApiFallback: true
	},
    resolve: {
		alias: {
			"@": path.resolve("src")
		},
	},
    plugins:[
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
    new CopyWebpackPlugin({
        patterns:[{
            from: "static",
            to: "static",
        }]
    }),
    new MonacoWebpackPlugin({//配置语法高亮和内置插件
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // languages: ["json", "javascript", "html", "css"],
        // features:["contextmenu","find","wordHighlighter","folding","colorPicker"]
    })],
    module:{
        rules:[{
            test: /\.jsx|\.js$/,
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
            }]
        },
        {
            test: /\.(ico|png|jpg|jpeg|gif|svg|cur|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader",
            options: {
                name: path.posix.join("static/assets/", "[name].[hash:7].[ext]"),
            },
        },
        {
            test: /\.css$/,
            include: APP_DIR,
            use:['style-loader',{
                loader: "css-loader",
                options: { 
                    modules: {
                        localIdentName: "[name]_[local]_[hash:base64:5]",
                        exportLocalsConvention:"camelCase"
                    },
                    importLoaders: 1,
                    sourceMap: devmode
                },
            },{
                loader:"postcss-loader",
                options: {
                    postcssOptions: {
                      plugins: [
                        [
                          'autoprefixer',
                          {
                            overrideBrowserslist: [
                                "last 3 versions",
                                "Safari >= 8",
                                "iOS >= 8",
                            ],
                          },
                        ],
                      ],
                    },
                },
            }]
        },{
            test: /\.css$/,
            include: MONACO_DIR,
            use: ['style-loader','css-loader'],
        }]
    }
}