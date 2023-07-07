import { Assets, Rectangle, Sprite, Texture } from "pixi.js";
import { TileTypes, createTile } from "../grid/tiles/CreateTile";
import { LevelData } from "./LevelData";
import { TileData, TilesetData } from "./TilesetData";
import { Tile } from "../grid/tiles/Tile";
import { game } from "../app";
import { Level } from "./Level";

export class LevelLoader
{
	private _levelCache: { [key: string]: LevelData; } = {};
	private _tilesetCache: { [key: string]: TilesetData; } = {};

	private get _defaultTileData(): TileData { return {}; }

	public constructor()
	{

	}

	public async loadLevel(name: string): Promise<Level>
	{
		const tiles: Tile[] = [];
		const lvlData: LevelData = await this._loadLevelData(name);

		const tilesetName = lvlData.tilesetName;
		const tilesetData = await this._loadTilesetData(tilesetName);
		const tilesArray = lvlData.layers["mainTiles"].tiles;

		for (let i = 0; i < tilesArray.length; i++)
		{
			const tileValue: number = tilesArray[i];
			const tileData = tilesetData.tilesData[tileValue] || this._defaultTileData;
			const tileType = TileTypes[tileData.type] || TileTypes.Empty;

			const gridX = i % lvlData.width;
			const gridY = Math.floor(i / lvlData.width);
			const posX = gridX * tilesetData.tileWidth;
			const posY = gridY * tilesetData.tileHeight;

			let sprite: Sprite;
			if (tileValue >= 0)
			{
				sprite = new Sprite(new Texture(tilesetData.texture.baseTexture));
				sprite.texture.frame = new Rectangle(
					(tileValue % tilesetData.tilesPerRow) * tilesetData.tileWidth,
					Math.floor(tileValue / tilesetData.tilesPerRow) * tilesetData.tileHeight,
					tilesetData.tileWidth,
					tilesetData.tileHeight
				);
			}

			const tile = createTile(tileType, { x: posX, y: posY, width: 16, height: 16 }, sprite);
			tiles.push(tile);
		}

		return new Level(tiles, lvlData);
	}

	public async _loadTilesetData(name: string): Promise<TilesetData>
	{
		if (this._tilesetCache[name])
		{
			return this._tilesetCache[name];
		}

		let tilesetData = await Assets.load(`./tilesets/${name}.json`);
		tilesetData.texture = await Assets.load(`./tilesets/${name}.png`);
		return this._tilesetCache[name] = tilesetData;
	}

	private async _loadLevelData(name: string): Promise<LevelData>
	{
		if (this._levelCache[name])
		{
			return this._levelCache[name];
		}
		return this._levelCache[name] = await Assets.load(`./maps/${name}.json`);
	}
}