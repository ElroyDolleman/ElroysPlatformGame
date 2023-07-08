import { CollidableRectangle } from "./Collidable";
import { Grid } from "../grid/Grid";
import { IRectangle } from "../geometry/IRectangle";
import { Tile } from "../grid/tiles/Tile";
import { CollisionResult } from "./CollisionResult";

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
		const cells = this._grid.getCellsInRectangle(collidable.nextHitbox, 2);
		const data = this._getDefualtData(collidable);

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

				if (result.onTop) { data.collided.onTop = result.onTop; }
				else if (result.onBottom) { data.collided.onBottom = result.onBottom; }
			}
		}

		collidable.onCollisionSolved(data);
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