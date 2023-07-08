import { CollidableRectangle } from "./Collidable";
import { Grid } from "../grid/Grid";
import { IRectangle } from "../geometry/IRectangle";
import { Tile } from "../grid/tiles/Tile";
import { CollisionResult } from "./CollisionResult";
import { GraphicsShapes } from "../assets/GraphicsShapes";

export interface ICollisionData {
	previousHitbox: IRectangle;
	tiles: Tile[];
	collided: CollisionResult<Tile>;
}

export class TileCollisionManager
{
	private _grid: Grid<Tile>;

	public constructor(grid: Grid<Tile>)
	{
		this._grid = grid;
	}

	public moveCollidable(collidable: CollidableRectangle): ICollisionData
	{
		const cells = this._grid.getCellsInRectangle(collidable.nextHitbox, 8);
		const data = this._getDefualtData(collidable);
		data.tiles = cells;

		collidable.moveX();
		for (let i = 0; i < cells.length; i++)
		{
			if (cells[i].intersects(collidable))
			{
				const result = cells[i].solveHorizontalCollision(collidable);

				if (result.onLeft) { data.collided.onLeft = result.onLeft; }
				else if (result.onRight) { data.collided.onRight = result.onRight; }
			}
		}

		collidable.moveY();
		for (let i = 0; i < cells.length; i++)
		{
			if (cells[i].intersects(collidable))
			{
				const result = cells[i].solveVerticalCollision(collidable);
				console.log(result);

				if (result.onTop) { data.collided.onTop = result.onTop; }
				else if (result.onBottom) { data.collided.onBottom = result.onBottom; }
			}
		}

		collidable.onCollisionSolved(data);

		// let test = this._grid.getCellsInRectangle(collidable.nextHitbox, 2);
		// test.forEach(element =>
		// {
		// 	GraphicsShapes.drawRectangle(element.hitbox.x, element.hitbox.y, element.hitbox.width, element.hitbox.height, 0x00FF00, 0.1);
		// });
		// GraphicsShapes.drawRectangle(collidable.hitbox.x, collidable.hitbox.y, collidable.hitbox.width, collidable.hitbox.height, 0xFFFFFF, 0.7);
		// GraphicsShapes.drawRectangle(collidable.nextHitbox.x, collidable.nextHitbox.y, collidable.nextHitbox.width, collidable.nextHitbox.height, 0x0, 0.4);

		return data;
	}

	private _getDefualtData(collidable: CollidableRectangle): ICollisionData
	{
		return {
			tiles: [],
			previousHitbox: collidable.hitbox.clone(),
			collided: {}
		};
	}
}