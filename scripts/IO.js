const fs = require("fs");

module.exports = {
	getAllFilesOfType: (directory, extension) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(directory, (err, files) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(files.filter(file => { return file.includes(extension); }));
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
	}
}