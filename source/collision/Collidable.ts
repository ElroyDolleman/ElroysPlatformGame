import { Rectangle } from "../geometry/Rectangle";
import { Vector2 } from "../geometry/Vector2";
import { ICollisionData } from "./TileCollisionManager";

type CollidableHitbox<T> = { x: number, y: number, clone: () => T };

export type CollidableRectangle = Collidable<Rectangle>;

export abstract class Collidable<T extends CollidableHitbox<T>>
{
	public hitbox: T;
	public get nextHitbox(): T
	{
		const nextHitbox = this.hitbox.clone();
		nextHitbox.x + this.speed.x;
		nextHitbox.y + this.speed.y;
		return nextHitbox;
	}
	public speed: Vector2;

	public moveX(): void
	{
		this.hitbox.x += this.speed.x;
	}
	public moveY(): void
	{
		this.hitbox.y += this.speed.y;
	}

	public abstract onCollisionSolved(result: ICollisionData): void;
}