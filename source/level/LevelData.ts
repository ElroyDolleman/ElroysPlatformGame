export interface EntityData {
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface TilesData {
	tiles: number[];
}

export interface LevelData {
	layers: { [key: string]: TilesData; };
	objects: EntityData[];
	tilesetName: string;
	tileWidth: number;
	tileHeight: number;
	width: number;
	height: number;
}