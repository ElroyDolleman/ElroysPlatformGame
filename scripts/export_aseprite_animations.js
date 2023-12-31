const fs = require("fs");
const IO = require("./IO");
const commands = require("./commands");
const path = require("path");
const packer = require('free-tex-packer-core');

const animationsPath = "./assets/aseprite/animations/";
const tempBuildPath = "./build_assets/animations/";
const assetsBuildPath = "./build/dev/assets/";

let animations = [];

let exportAnimations = async() =>
{
	IO.ensureFolderExists(assetsBuildPath);

	const folders = await IO.getSubFolders(animationsPath);

	for (let i = 0; i < folders.length; i++)
	{
		const fullPath = path.join(tempBuildPath, folders[i]);
		IO.ensureFolderExists(fullPath);
		await IO.cleanFolder(fullPath);

		await exportFolder(folders[i]);
	}

	await generateTSFile();
}

let exportFolder = async(folderToExport) =>
{
	const asepriteFiles = await IO.getAllFilesOfType(path.join(animationsPath, folderToExport), ".aseprite");

	for (let i = 0; i < asepriteFiles.length; i++)
	{
		const fileName = asepriteFiles[i].replace(".aseprite", "");

		await commands.exportAsepriteFile(
			path.join(animationsPath, folderToExport, asepriteFiles[i]),
			path.join(tempBuildPath, folderToExport, `${fileName}_00.png`)
		);
	}

	await packFiles(path.join(tempBuildPath, folderToExport), folderToExport);
}

let packFiles = async(sourceFolder, assetName) =>
{
	const pngFiles = await IO.getAllFilesOfType(sourceFolder, '.png');

	// Setup images data
	let images = [];
	for (let i = 0; i < pngFiles.length; i++)
	{
		images.push({
			path: path.join(sourceFolder, pngFiles[i]),
			contents: fs.readFileSync(path.join(sourceFolder, pngFiles[i]))
		});
	}

	const packerOptions = getPackerOptions(assetName);
	const resultFiles = await packer.packAsync(images, packerOptions);

	// Retrieve the JSON Data
	const jsonResult = resultFiles[0];
	let jsonString = jsonResult.buffer.toString();
	jsonString = jsonString.replaceAll(`${sourceFolder.replace("\\", "/")}/`, '');
	const jsonOutput = JSON.parse(jsonString);

	// Storing animation data
	let animationData = {
		textureName: assetName,
		frames: {},
	};
	const textureData = jsonOutput.textures[0];
	const frames = textureData.frames;

	frames.forEach(frameData => {
		let animName = getStringAfterLastSlash(frameData.filename);
		animName = animName.replace(/_\d+$/, "");

		if (!animationData.frames[animName]) {
			animationData.frames[animName] = [];
		}
		animationData.frames[animName].push(frameData.frame);
	});
	animations.push(animationData);

	// Export the images
	const imageOutput = resultFiles[1];
	await IO.writeFile(path.join(assetsBuildPath, imageOutput.name), imageOutput.buffer);
}

let getStringAfterLastSlash = str => {
	const lastSlashIndex = str.lastIndexOf("/");
	if (lastSlashIndex === -1 || lastSlashIndex === str.length - 1) {
		return "";
	}
	return str.substring(lastSlashIndex + 1);
}

let generateTSFile = async() =>
{
	let fileContent = `//
// This code is generated by export_aseprite_animations.js
// Don't edit by hand. Or do, it's your life, I don't care.
//

import { Rectangle } from "../geometry/Rectangle";
import { AnimationData } from "./AnimationData";\n\n`;

	fileContent += "export class Animations\n{\n"
	animations.forEach(animationData => {

		fileContent += `	public static readonly ${animationData.textureName.toUpperCase()}: AnimationData = {\n`;
		Object.keys(animationData.frames).forEach(animName => {
			fileContent += `		"${animName}": [\n`;
			animationData.frames[animName].forEach(frame => {
				fileContent += `			new Rectangle(${frame.x}, ${frame.y}, ${frame.w}, ${frame.h}),\n`;
			});
			fileContent += "		],\n"
		});
		fileContent +=  "	};\n";
	});

	// Write the file
	fileContent += "}";
	await IO.writeFile("source/assets/Animations.ts", fileContent);
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

exportAnimations();