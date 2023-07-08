import { Collidable } from "../collision/Collidable";
import { IPoint } from "../geometry/IPoint";
import { IRectangle } from "../geometry/IRectangle";
import { Rectangle } from "../geometry/Rectangle";
import { Vector2 } from "../geometry/Vector2";

export abstract class Entity extends Collidable<Rectangle>
{
	public constructor(hitbox: IRectangle, position: IPoint)
	{
		super();
		this.hitbox = new Rectangle(
			position.x + hitbox.x,
			position.y + hitbox.y,
			hitbox.width,
			hitbox.height
		);
		this.speed = new Vector2();
	}

	public setPosition(position: IPoint): void
	{
		this.hitbox.x = position.x;
		this.hitbox.y = position.y;
	}
}