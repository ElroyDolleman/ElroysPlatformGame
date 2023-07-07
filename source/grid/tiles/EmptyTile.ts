import { CollidableRectangle } from "../../collision/Collidable";
import { CollisionResult } from "../../collision/CollisionResult";
import { IRectangle } from "../../geometry/IRectangle";
import { Tile } from "./Tile";

export class EmptyTile extends Tile
{
	public solveHorizontalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		return {};
	}

	public solveVerticalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		return {};
	}
}