const fs = require("fs");
const path = require("path");

module.exports = {
	getAllFilesOfType: async(directory, extension) =>
	{
		return (await module.exports.getAllFilesInFolder(directory)).filter(file => { return file.includes(extension); });
	},

	getAllFilesInFolder: async(directory) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(directory, (err, files) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(files);
				}
			});
		});
	},

	getSubFolders: (directory) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(directory, (err, files) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(files.filter(file => { return !file.includes("."); }));
				}
			});
		});
	},

	readFile: filepath =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readFile(filepath, "utf8", (err, data) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(data);
				}
			});
		});
	},

	writeFile: (filepath, data) =>
	{
		return new Promise(resolve => fs.writeFile(filepath, data, resolve));
	},

	copyFile: (source, destination) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.copyFile(source, destination, (err) =>
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

	ensureFolderExists: (folderPath) =>
	{
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}
	},

	cleanFolder: async(directory) =>
	{
		const files = await module.exports.getAllFilesInFolder(directory);
		for (let i = 0; i < files.length; i++)
		{
			fs.unlinkSync(path.join(directory, files[i]));
		}
	}
}