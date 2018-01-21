'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: {
        app: './app.module.js',
        vendor: ['angular']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            exclude: ['vendor.bundle.js']
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({template: '../index.html'})
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
				test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                include: path.resolve(__dirname, 'app'),
				exclude: /node_modules/, // exclude any and all files in the node_modules folder
				use: [
					{
						loader: "jshint-loader"
					}
				]
			},
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}