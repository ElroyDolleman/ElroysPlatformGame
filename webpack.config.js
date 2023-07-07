const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const packageJson = require('./package.json');

// const buildFilesPath = helperFuncs.getBuildFilesFolder();
// const assetsPath = helperFuncs.getAssetsOutputFolder();
const htmlPath = './html/';
const entryFile = './source/app.ts';

const gameTitle = '"My Awesome Game"';

module.exports = env => {
	if (env.type === undefined)
	{
		throw new Error("No environment type: " + env.toString());
	}

	const buildFolder = './build/' + env.type + '/';

	return {
		mode: 'development',
		devtool: 'inline-source-map',
		entry: entryFile,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
		extensions:
			['.tsx', '.ts', '.js'],
		},
		output: {
			filename: 'index.js',
			path: path.resolve(__dirname, buildFolder),
		},
		plugins: [
			new CopyPlugin({
				patterns: [
					{ 
						from: path.resolve(__dirname, htmlPath),
						to: path.resolve(__dirname, buildFolder)
					},
					// {
					// 	from: path.resolve(__dirname, assetsPath),
					// 	to: path.resolve(__dirname, buildFolder + 'assets')
					// },
				],
			}),
			new DefinePlugin({
				DEV: "false",
				PROD: "false",
				[env.type.toUpperCase()]: "true",
				GAME_TITLE: gameTitle,
				GAME_VERSION: JSON.stringify(packageJson.version),
			}),
		]
	}
};