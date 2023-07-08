import { Point } from "pixi.js";

export class Vector2 extends Point
{
	public static get zero(): Vector2 { return new Vector2(0, 0); }
	public static get one(): Vector2 { return new Vector2(1, 1); }
	public static get unitX(): Vector2 { return new Vector2(1, 0); }
	public static get unitY(): Vector2 { return new Vector2(0, 1); }

	public add(other: Vector2): Vector2
	{
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	public subtract(other: Vector2): Vector2
	{
		return new Vector2(this.x - other.x, this.y - other.y);
	}

	public multiply(scalar: number): Vector2
	{
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	public divide(scalar: number): Vector2
	{
		if (scalar === 0)
		{
			throw "Attempt to divide by zero";
		}
		return new Vector2(this.x / scalar, this.y / scalar);
	}

	public isEqual(other: Vector2): boolean
	{
		return this.x === other.x && this.y === other.y;
	}

	public distance(other: Vector2): number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	public distanceSquared(other: Vector2): number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx * dx + dy * dy;
	}

	public dot(other: Vector2): number
	{
		return this.x * other.x + this.y * other.y;
	}
}