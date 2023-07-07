export interface Entity {
	class: string;
	gid: number;
	height: number;
	id: number;
	name: string;
	rotation: number;
	visible: boolean;
	width: number;
	x: number;
	y: number;
}

export interface TilesData {
	tiles: number[];
}

export interface LevelData {
	height: number;
	layers: { [key: string]: TilesData; };
	tilesetName: string;
	tileWidth: number;
	tileHeight: number;
	width: number;
}