const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const APP_DIR = path.resolve(__dirname, './src');
const devmode = process.env.NODE_ENV !== "production";
module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ],
    devServer: {
        client: {
          overlay: false // 确保设置为true以在浏览器中显示警告
        }
    },
    resolve: {
		alias: {
			"@": path.resolve(__dirname,"src")
		},
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
	},
    module:{
        rules:[
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true   //类型错误警告
                  }
                }
            ]
        },{
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        },   
        {
            test: /\.(ico|png|jpg|jpeg|gif|svg|cur|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader",
            exclude: /node_modules/,
            options: {
                name: path.posix.join("static/assets/", "[name].[hash:7].[ext]"),
            },
        },
        {
            test: /\.css|\.less$/,
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
            },"less-loader",{
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