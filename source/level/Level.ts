import { Container, DisplayObject } from "pixi.js";
import { Tile } from "../grid/tiles/Tile";
import { Grid } from "../grid/Grid";
import { EntityData, LevelData } from "./LevelData";
import { TileCollisionManager } from "../collision/TileCollisionManager";
import { Necky } from "../character/necky/Necky";
import { Entity } from "../entities/Entity";

export class Level
{
	public readonly grid: Grid<Tile>;
	public readonly collisionManager: TileCollisionManager;
	public readonly entities: Entity[] = [];

	public constructor(tiles: Tile[], levelData: LevelData)
	{
		this.grid = new Grid(tiles, {
			gridCellsX: levelData.width,
			gridCellsY: levelData.height,
			cellWidth: levelData.tileWidth,
			cellHeight: levelData.tileHeight
		});

		this.collisionManager = new TileCollisionManager(this.grid);

		levelData.objects.forEach(data => { this.spawnEntity(data); });
	}

	public addTilesToContainer(container: Container<DisplayObject>): void
	{
		this.grid.forEachCell(tile =>
		{
			if (tile.sprite)
			{
				container.addChild(tile.sprite);
			}
		});
	}

	public addEntitiesToContainer(container: Container<DisplayObject>): void
	{
		this.entities.forEach(entity => entity.addToContainer(container));
	}

	public spawnEntity(data: EntityData): void
	{
		switch(data.name)
		{
		case "necky":
			this.entities.push(new Necky({ x: data.x + data.width / 2, y: data.y + data.height }));
			break;
		default:
			throw `Unhandeld case for entity "${data.name}"`;
		}
	}

	public updateEntities(deltaTime: number): void
	{
		this.entities.forEach(entity => entity.update(deltaTime));
	}

	public updateCollidables(): void
	{
		this.entities.forEach(entity =>
		{
			this.collisionManager.moveCollidable(entity);
		});
	}

	public lateUpdateEntities(deltaTime: number): void
	{
		this.entities.forEach(entity => entity.lateUpdate(deltaTime));
	}
}