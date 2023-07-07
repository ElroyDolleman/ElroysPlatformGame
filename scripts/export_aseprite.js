const fs = require("fs");
const IO = require("./IO");
const commands = require("./commands");
const path = require("path");
const packer = require('free-tex-packer-core');

const assetsPath = "./assets/aseprite/";
const tempBuildPath = "./build_assets/";
const assetsBuildPath = "./build/dev/assets/";

let animationsData = {};

let exportAsepriteAssets = async() =>
{
	IO.ensureFolderExists(assetsBuildPath);

	const folders = await IO.getSubFolders(assetsPath);

	for (let i = 0; i < folders.length; i++)
	{
		const fullPath = path.join(tempBuildPath, folders[i]);
		IO.ensureFolderExists(fullPath);
		await IO.cleanFolder(fullPath);

		await exportFolder(folders[i]);
	}

	await IO.writeFile(path.join(assetsBuildPath, "animation_data.json"), JSON.stringify(animationsData));
}

let exportFolder = async(folder) =>
{
	const asepriteFiles = await IO.getAllFilesOfType(path.join(assetsPath, folder), ".aseprite");

	for (let i = 0; i < asepriteFiles.length; i++)
	{
		let fileName = asepriteFiles[i].replace(".aseprite", "");

		const isAnimation = fileName.startsWith("anim_");
		if (isAnimation) {
			fileName = fileName.replace("anim_", "");
		}
		const outputName = isAnimation ? `${fileName}_00.png` : `${fileName}.png`;

		await commands.exportAsepriteFile(
			path.join(assetsPath, folder, asepriteFiles[i]),
			path.join(tempBuildPath, folder, outputName)
		);

		await packFiles(path.join(tempBuildPath, folder), folder, isAnimation);
	}
}

let packFiles = async(folder, textureName, isAnimation) =>
{
	const pngFiles = await IO.getAllFilesOfType(folder, '.png');

	let images = [];
	for (let i = 0; i < pngFiles.length; i++)
	{
		images.push({
			path: path.join(folder, pngFiles[i]),
			contents: fs.readFileSync(path.join(folder, pngFiles[i]))
		});
	}

	const packerOptions = getPackerOptions(textureName);
	const resultFiles = await packer.packAsync(images, packerOptions);

	// JSON
	let jsonResult = resultFiles[0];
	let jsonString = jsonResult.buffer.toString();
	jsonString = jsonString.replaceAll(`${folder.replace("\\", "/")}/`, '');
	console.log(folder);

	let jsonOutput = JSON.parse(jsonString);

	if (isAnimation) {
		setupAnimation(jsonOutput.textures[0].frames, textureName);
	}

	await IO.writeFile(path.join(assetsBuildPath, jsonResult.name), JSON.stringify(jsonOutput));

	// IMAGE
	const imageOutput = resultFiles[1];
	await IO.writeFile(path.join(assetsBuildPath, imageOutput.name), imageOutput.buffer);
}

let setupAnimation = (frames, textureName) =>
{
	// Setup Animations
	frames.forEach(element =>
	{
		if (!element.filename.includes('_00')) {
			return;
		}

		const animName = element.filename.replace("_00", "");

		let copyArray = frames.filter(f => {
			return f.filename.includes(animName);
		});

		animationsData[animName] = {
			name: animName,
			frames: copyArray.length,
			isSingleFrame: copyArray.length === 1,
			texture: textureName
		};

		if (copyArray.length === 1) {
			element.filename = animName;
		}
	});
}

let getPackerOptions = (textureName) =>
{
	return {
		textureName,
		width: 1024,
		height: 1024,
		fixedSize: false,
		padding: 2,
		allowRotation: false,
		detectIdentical: true,
		allowTrim: true,
		exporter: "Phaser3",
		removeFileExtension: true,
		prependFolderName: true
	};
}

exportAsepriteAssets();