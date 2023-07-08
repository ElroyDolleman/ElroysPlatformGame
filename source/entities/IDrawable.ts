import { Container, DisplayObject } from "pixi.js";

export interface IDrawable
{
	loadAssets(): Promise<void>;
	addToContainer(container: Container<DisplayObject>): void;
}