import { Container, DisplayObject } from "pixi.js";
import { Tile } from "../grid/tiles/Tile";
import { Grid } from "../grid/Grid";
import { LevelData } from "./LevelData";

export class Level
{
	public readonly grid: Grid<Tile>;

	public constructor(tiles: Tile[], levelData: LevelData)
	{
		this.grid = new Grid(tiles, {
			gridCellsX: levelData.width,
			gridCellsY: levelData.height,
			cellWidth: levelData.tileWidth,
			cellHeight: levelData.tileHeight
		});
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