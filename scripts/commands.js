const cmd = require("node-cmd");

module.exports = {
	run: (command) =>
	{
		return new Promise((resolve, reject) =>
		{
			cmd.run(command, err =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve();
				}
			});
		});
	},

	exportTiledMap: (sourceFilePath, outputFilePath) =>
	{
		return module.exports.run(`Tiled --export-map ${sourceFilePath} ${outputFilePath}`);
	},

	exportTiledTileset: (sourceFilePath, outputFilePath) =>
	{
		return module.exports.run(`Tiled --export-tileset ${sourceFilePath} ${outputFilePath}`);
	},

	exportAsepriteFile: (sourceFilePath, outputFilePath) =>
	{
		return module.exports.run(`aseprite -b ${sourceFilePath} --save-as ${outputFilePath}`);
	}
}