import { CollidableRectangle } from "../../collision/Collidable";
import { CollisionResult } from "../../collision/CollisionResult";
import { Tile } from "./Tile";

export class EmptyTile extends Tile
{
	public intersects(collidable: CollidableRectangle): boolean
	{
		return false;
	}

	public solveHorizontalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		return {};
	}

	public solveVerticalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		return {};
	}
}