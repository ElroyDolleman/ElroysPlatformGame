import { Graphics } from "pixi.js";
import { game } from "../app";

export class GraphicsShapes
{
	public static getRectangle(x: number, y: number, width: number, height: number, color: number = 0x0, alpha: number = 1): Graphics
	{
		const graphics = new Graphics();
		graphics.beginFill(color, alpha);
		graphics.drawRect(x, y, width, height);
		graphics.endFill();
		return graphics;
	}

	public static getCircle(x: number, y: number, radius: number, color: number = 0x0, alpha: number = 1): Graphics
	{
		const graphics = new Graphics();
		graphics.beginFill(color, alpha);
		graphics.drawCircle(x, y, radius);
		graphics.endFill();
		return graphics;
	}

	/**
	 * Draws a rectangle for just 1 frame. Handy for debugging, otherwise it should not be used.
	 */
	public static drawRectangle(x: number, y: number, width: number, height: number, color: number = 0x0, alpha: number = 1): void
	{
		const rect = this.getRectangle(x, y, width, height, color, alpha);
		game.app.stage.addChild(rect);
		game.managers.delayManager.afterFrame().then(() => game.app.stage.removeChild(rect));
	}
}