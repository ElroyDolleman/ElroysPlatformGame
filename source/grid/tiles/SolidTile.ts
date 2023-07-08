import { CollidableRectangle } from "../../collision/Collidable";
import { CollisionResult } from "../../collision/CollisionResult";
import { Tile } from "./Tile";

export class SolidTile extends Tile
{
	public canStandOn(): boolean { return true; }

	public intersects(collidable: CollidableRectangle): boolean
	{
		return collidable.hitbox.intersects(this.hitbox);
	}

	public solveHorizontalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		if (collidable.speed.x > 0)
		{
			collidable.hitbox.x = this.hitbox.x - collidable.hitbox.width;
			return { onRight: this };
		}
		else if (collidable.speed.x < 0)
		{
			collidable.hitbox.x = this.hitbox.right;
			return { onLeft: this };
		}
		return {};
	}

	public solveVerticalCollision(collidable: CollidableRectangle): CollisionResult<Tile>
	{
		if (collidable.speed.y > 0)
		{
			collidable.hitbox.y = this.hitbox.y - collidable.hitbox.height;
			return { onBottom: this };
		}
		else if (collidable.speed.y < 0)
		{
			collidable.hitbox.y = this.hitbox.bottom;
			return { onTop: this };
		}
		return {};
	}
}