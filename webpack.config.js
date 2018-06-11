const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');
const underscoreLoader = require('underscore-template-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH = {
	app: path.resolve(__dirname, "app"),
	dist: path.resolve(__dirname, "dist")
}
module.exports = {
	entry: { app: PATH.app + '/main.js'},
	output: {
		path: PATH.dist,
		filename: 'js/main-[name].js',
		chunkFilename: 'js/main-[name].js',
	},
	watch: false,
	devServer: {
		stats: 'errors-only',
		contentBase: PATH.app
	},
	plugins: [
		new ExtractTextPlugin('css/main-[name].css'),
		new CopyWebpackPlugin([
			{from: "app/img/", to: "img/"},
			{from: "app/video/", to: "video/"},
			{from: "app/music/", to: "music/"},
			{from: "app/fonts/", to: "fonts/"}
		]),
		// new RemoveWebpackPlugin("./img", 'show'),
		new FaviconsWebpackPlugin({
			logo: PATH.app + '/img/favicon.png',
			prefix: 'icons/',
			emitStats: false,
			statsFilename: 'iconstats.json',
			persistentCache: true,
			inject: true,
			background: 'transparent',
			title: 'favicon',
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		new webpack.ProvidePlugin({
		  $: 'jquery',
		  jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: PATH.app + '/index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['es2015'] }
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: [
						'css-loader?url=false',
						{
						    loader: 'postcss-loader',
						    options: {
						        plugins: [
						            autoprefixer({
						                browsers:['ie >= 8', 'last 4 version']
						            })
						        ]
						    }
						},
						{
						    loader: 'sass-loader'
						}
						]

					}
					
				)
			},
			{ test: /\.html$/, loader: "underscore-template-loader", query:{attributes: []}},			
			// { test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?name=../fonts/[name].[ext]' },
			// { test: /\.gif$/, loader: 'file-loader'},
			// { test: /\.jpg$/, loader: 'file-loader'},
			// { test: /\.png$/, loader: 'file-loader'},
			// { test: /\.svg/, loader: 'file-loader'}
		]
	}
}
