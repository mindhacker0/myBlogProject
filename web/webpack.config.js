const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const APP_DIR = path.resolve(__dirname, './src');
module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    mode:process.env.NODE_ENV,
    plugins:[
      new HtmlWebpackPlugin({
          template: './src/index.html', //指定模板路径
          filename: 'index.html', //指定文件名
      }),
      new webpack.ProgressPlugin(),
      new BundleAnalyzerPlugin()
    ],
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      version: '1.0',
      cacheDirectory: path.resolve(__dirname, '.webpack_cache') // 自定义缓存目录
    },
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
        },
        {
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader',{
              loader:"postcss-loader",
              options: {
                  postcssOptions: {
                    plugins: [
                      ['autoprefixer']
                    ],
                  },
              },
          }]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use:['style-loader',"css-loader","less-loader",{
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
        }
      ]
    }
}