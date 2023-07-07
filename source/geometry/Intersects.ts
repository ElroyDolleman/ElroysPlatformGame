import { ICircle } from "./ICircle";
import { IPoint } from "./IPoint";
import { IRectangle } from "./IRectangle";

export class Intersects
{
	public static circleToCircle(circle1: ICircle, circle2: ICircle): boolean
	{
		const distance = Math.sqrt(
			Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2)
		);
		return distance <= circle1.radius + circle2.radius;
	}

	public static circleToRectangle(circle: ICircle, rectangle: IRectangle): boolean
	{
		const deltaX = circle.x - Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
		const deltaY = circle.y - Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));
		return (deltaX * deltaX + deltaY * deltaY) <= (circle.radius * circle.radius);
	}

	public static rectangleToRectangle(rectangle1: IRectangle, rectangle2: IRectangle): boolean
	{
		return (
			rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y
		);
	}

	public static pointToRectangle(point: IPoint, rectangle: IRectangle): boolean
	{
		return (
			point.x >= rectangle.x &&
            point.x < rectangle.x + rectangle.width &&
            point.y >= rectangle.y &&
            point.y < rectangle.y + rectangle.height
		);
	}

	public static pointToCircle(point: IPoint, circle: ICircle): boolean
	{
		const distance = Math.sqrt(
			Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2)
		);
		return distance <= circle.radius;
	}
}