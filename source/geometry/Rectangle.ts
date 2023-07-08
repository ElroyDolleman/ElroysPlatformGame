import { Rectangle as PIXIRectangle } from "pixi.js";
import { IPoint } from "./IPoint";
import { IRectangle } from "./IRectangle";

export class Rectangle extends PIXIRectangle implements IRectangle
{
	public get centerX(): number { return this.x + this.width / 2; }
	public get centerY(): number { return this.y + this.height / 2; }
	public get center(): IPoint { return { x: this.centerX, y: this.centerY }; }

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

	public intersectsX(other: Rectangle): boolean
	{
		return this.right > other.left && this.left < other.right;
	}

	public intersectsY(other: Rectangle): boolean
	{
		return this.bottom > other.top && this.top < other.bottom;
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