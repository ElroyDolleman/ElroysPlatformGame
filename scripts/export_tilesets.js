const IO = require("./IO");
const commands = require("./commands");
const path = require("path");

const tilesetsPath = "./assets/leveleditor/tilesets/";
const tempBuildPath = "./build_assets/";
const buildPath = "./build/dev/tilesets/";

let exportTilesets = async() =>
{
	const tilesetFiles = await IO.getAllFilesOfType(tilesetsPath, '.tsx');
	IO.ensureFolderExists(buildPath);

	for (let i = 0; i < tilesetFiles.length; i++)
	{
		const fileName = tilesetFiles[i].replace(".tsx", "");
		const tilesetData = await getTilesetData(fileName);

		const jsonString = JSON.stringify(tilesetData);
		await IO.writeFile(path.join(buildPath, `${fileName}.json`), jsonString);

		await IO.copyFile(path.join(tilesetsPath, `${fileName}.png`), path.join(buildPath, `${fileName}.png`));
	}
}

let getTilesetData = async(fileName) =>
{
	const sourceFilePath = path.join(tilesetsPath, `${fileName}.tsx`);
	const outputFilePath = path.join(tempBuildPath, `${fileName}.json`);

	await commands.exportTiledTileset(sourceFilePath, outputFilePath);
	const fileData = await IO.readFile(outputFilePath);
	const tiledJSONData = JSON.parse(fileData);

	let tilesData = {};

	tiledJSONData.tiles.forEach(element => {
		tilesData[element.id] = {};

		element.properties.forEach(prop => {
			tilesData[element.id][prop.name] = prop.value;
		});
	});

	return {
		tileWidth: tiledJSONData.tilewidth,
		tileHeight: tiledJSONData.tileheight,
		tilesData,
		tilesPerRow: tiledJSONData.imagewidth / tiledJSONData.tilewidth
	};
}

exportTilesets();