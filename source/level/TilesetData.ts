import { Texture } from "pixi.js";

export interface TileData {
	type?: string;
}

export interface TilesetData {
	texture: Texture;
	tileHeight: number;
	tileWidth: number;
	tilesPerRow: number;
	tilesData: { [key: string]: TileData; };
}