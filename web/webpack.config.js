const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ],
    module:{
        rules:[{
            test: /\.jsx|\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }]
    }
}