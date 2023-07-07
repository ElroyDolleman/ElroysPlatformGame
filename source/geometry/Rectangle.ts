import { IPoint } from "./IPoint";
import { IRectangle } from "./IRectangle";

export class Rectangle implements IRectangle
{
	public get centerX(): number { return this.x + this.width / 2; }
	public get centerY(): number { return this.y + this.height / 2; }
	public get center(): IPoint { return { x: this.centerX, y: this.centerY }; }

	public get top(): number { return this.y; }
	public get left(): number { return this.x; }
	public get right(): number { return this.x + this.width; }
	public get bottom(): number { return this.y + this.height; }

	public x: number;
	public y: number;
	public width: number;
	public height: number;

	public constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public contains(x: number, y: number): boolean
	{
		return x >= this.x && x <= this.x + this.width &&  y >= this.y && y <= this.y + this.height;
	}

	public containsPoint(point: IPoint): boolean
	{
		return this.contains(point.x, point.y);
	}

	public containsRectangle(rect: IRectangle): boolean
	{
		const rectARight = this.x + this.width;
		const rectABottom = this.y + this.height;
		const rectBRight = rect.x + rect.width;
		const rectBBottom = rect.y + rect.height;

		return (
			this.x <= rect.x &&
			this.y <= rect.y &&
			rectARight >= rectBRight &&
			rectABottom >= rectBBottom
		);
	}

	public intersects(rect: IRectangle): boolean
	{
		return (
			this.left < rect.x + rect.width &&
			this.right > rect.x &&
			this.top < rect.y + rect.height &&
			this.bottom > rect.y
		);
	}

	public isOnRightOf(rect: IRectangle): boolean
	{
		return this.left === rect.x + rect.width;
	}

	public isOnLeftOf(rect: IRectangle): boolean
	{
		return this.right === rect.x;
	}

	public isOnTopOf(rect: IRectangle): boolean
	{
		return this.bottom === rect.y;
	}

	public isOnBottomOf(rect: IRectangle): boolean
	{
		return this.top === rect.y + rect.height;
	}

	public clone(): Rectangle
	{
		return new Rectangle(this.x, this.y, this.width, this.height);
	}
}