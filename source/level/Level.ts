import { Container, DisplayObject } from "pixi.js";
import { Tile } from "../grid/tiles/Tile";
import { Grid } from "../grid/Grid";
import { LevelData } from "./LevelData";
import { IDrawable } from "../entities/IDrawable";
import { TileCollisionManager } from "../collision/TileCollisionManager";

export class Level implements IDrawable
{
	public readonly grid: Grid<Tile>;
	public readonly collisionManager: TileCollisionManager;

	public constructor(tiles: Tile[], levelData: LevelData)
	{
		this.grid = new Grid(tiles, {
			gridCellsX: levelData.width,
			gridCellsY: levelData.height,
			cellWidth: levelData.tileWidth,
			cellHeight: levelData.tileHeight
		});

		this.collisionManager = new TileCollisionManager(this.grid);
	}

	public loadAssets(): Promise<void>
	{
		return Promise.resolve();
	}

	public addToContainer(container: Container<DisplayObject>): void
	{
		this.grid.forEachCell(tile =>
		{
			if (tile.sprite)
			{
				container.addChild(tile.sprite);
			}
		});
	}
}