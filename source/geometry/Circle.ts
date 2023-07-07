import { ICircle } from "./ICircle";
import { IPoint } from "./IPoint";

export class Circle implements ICircle
{
	public get diameter(): number { return this.radius * this.radius; }

	public x: number;
	public y: number;
	public radius: number;

	public constructor(x: number = 0, y: number = 0, radius: number = 0)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	public contains(x: number, y: number): boolean
	{
		const dx = x - this.x;
		const dy = y - this.y;
		return dx * dx + dy * dy <= this.radius * this.radius;
	}

	public containsPoint(point: IPoint): boolean
	{
		return this.contains(point.x, point.y);
	}

	public intersects(circle: ICircle): boolean
	{
		const dx = circle.x - this.x;
		const dy = circle.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		return distance < this.radius + circle.radius;
	}
}