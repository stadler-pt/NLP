const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: "./src/client/index.js",
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {
        hot: true,
        port: 8000,
        proxy: {
            "/addData": {
              target: "http://localhost:8080",
              bypass: function(req, res, proxyOptions) {
                if (req.headers.accept.indexOf("html") !== -1) {
                  console.log("Skipping proxy for browser request.");
                  return "/index.html";
                }
              }
            },
            "/getData": {
                target: "http://localhost:8080",
                bypass: function(req, res, proxyOptions) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/html/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}