import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { ICollisionData } from "../collision/TileCollisionManager";
import { Entity } from "../entities/Entity";
import { IDrawable } from "../entities/IDrawable";
import { IPoint } from "../geometry/IPoint";
import { game } from "../app";
import { TexturePaths } from "../assets/Assets";
import { Animations } from "../assets/Animations";

export class Necky extends Entity implements IDrawable
{
	public sprite: Sprite;

	public constructor(spawnPosition: IPoint)
	{
		super({ x: 0, y: 0, width: 32, height: 32 }, spawnPosition);
	}

	public async loadAssets(): Promise<void>
	{
		const texture = await game.assetLoader.loadTexture(TexturePaths.NECKY);

		this.sprite = new Sprite(new Texture(texture.baseTexture));
		this.sprite.texture.frame = Animations.NECKY["necky_idle"][0];

		this.sprite.anchor.x = 0.5;
		this.sprite.position.x = this.hitbox.centerX;
		this.sprite.position.y = this.hitbox.y;
	}

	public addToContainer(container: Container<DisplayObject>): void
	{
		container.addChild(this.sprite);
	}

	public onCollisionSolved(result: ICollisionData): void
	{
	}
}