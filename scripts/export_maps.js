const IO = require("./IO");
const commands = require("./commands");
const path = require("path");

const levelsPath = "./assets/leveleditor/maps/";
const tempBuildPath = "./build_assets/";
const buildPath = "./build/dev/maps/";

let exportMaps = async() =>
{
	IO.ensureFolderExists(buildPath);

	const tmxFiles = await IO.getAllFilesOfType(levelsPath, ".tmx");
	for (let i = 0; i < tmxFiles.length; i++)
	{
		const fileName = tmxFiles[i].replace(".tmx", "");

		const jsonData = await getMapData(fileName);
		const jsonString = JSON.stringify(jsonData);

		await IO.writeFile(path.join(buildPath, `${fileName}.json`), jsonString);
	}
}

let getMapData = async(mapFileName) =>
{
	const sourceFilePath = path.join(levelsPath, `${mapFileName}.tmx`);
	const outputFilePath = path.join(tempBuildPath, `${mapFileName}.json`);

	await commands.exportTiledMap(sourceFilePath, outputFilePath);

	const fileData = await IO.readFile(outputFilePath);
	const tiledJSONData = JSON.parse(fileData);

	const tilesetName = tiledJSONData.tilesets[0].source.match(/\/([^/]+)\.tsx$/)[1];
	const layers = {};

	tiledJSONData.layers.forEach(element => {

		layers[element.name] = {
			tiles: element.data.map((num) => num - 1)
		}
	});

	return {
		tilesetName,
		layers,
		width: tiledJSONData.width,
		height: tiledJSONData.height,
		tileWidth: tiledJSONData.tilewidth,
		tileHeight: tiledJSONData.tileheight
	};
}

exportMaps();