const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const APP_DIR = path.resolve(__dirname, './src');
const devmode = process.env.NODE_ENV !== "production";
module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ],
    resolve: {
		alias: {
			"@": path.resolve("src")
		},
	},
    module:{
        rules:[{
            test: /\.jsx|\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.css|\.scss$/,
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
            },"sass-loader",{
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
        }]
    }
}