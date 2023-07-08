import { Sprite } from "pixi.js";
import { CollidableRectangle } from "../../collision/Collidable";
import { IRectangle } from "../../geometry/IRectangle";
import { CollisionResult } from "../../collision/CollisionResult";
import { Rectangle } from "../../geometry/Rectangle";

export abstract class Tile
{
	public readonly hitbox: Rectangle;
	public readonly sprite?: Sprite;

	public constructor(hitbox: IRectangle, sprite?: Sprite)
	{
		this.hitbox = new Rectangle(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
		this.sprite = sprite;

		if (this.sprite)
		{
			this.sprite.x = hitbox.x;
			this.sprite.y = hitbox.y;
		}
	}

	public abstract intersects(collidable: CollidableRectangle): boolean;
	public abstract solveHorizontalCollision(collidable: CollidableRectangle): CollisionResult<Tile>;
	public abstract solveVerticalCollision(collidable: CollidableRectangle): CollisionResult<Tile>;
}