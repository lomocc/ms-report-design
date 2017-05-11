var webpack = require("webpack");
var HTMLWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
if (process.env.NODE_ENV == undefined)
    process.env.NODE_ENV = 'production';
var config = {
    entry: [
        //path.resolve("node_modules/babel-polyfill/lib/index.js"),
        //'babel-polyfill',
        path.resolve("src/index.js")
    ],
    output: {
        path: path.resolve("dist"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js",
		libraryTarget:"umd"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'" + process.env.NODE_ENV + "'",
                VERSION: "'" + new Date().toLocaleString() + "'" // 加入时间戳作为版本识别
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve("index.html"),
            minify: {
                collapseWhitespace: false
            },
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'file?name=assets/[name].[ext]'
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.css/,
            loader: 'style!css'
        }, {
            test: /\.(svg|eot|ttf|woff|woff2)$/,
            loader: 'file?name=assets/fonts/[name].[ext]'
        }, {
            test: /\.json/,
            loader: 'json'
        }],
    }
};
module.exports = config;