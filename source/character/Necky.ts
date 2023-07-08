import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { ICollisionData } from "../collision/TileCollisionManager";
import { Entity } from "../entities/Entity";
import { IDrawable } from "../entities/IDrawable";
import { IPoint } from "../geometry/IPoint";
import { game } from "../app";
import { TexturePaths } from "../assets/Assets";
import { Animations } from "../assets/Animations";
import { SpriteAnimator } from "../assets/SpriteAnimator";

export class Necky extends Entity implements IDrawable
{
	public sprite: Sprite;
	public spriteAnimator: SpriteAnimator;

	public constructor(spawnPosition: IPoint)
	{
		super({ x: 0, y: 0, width: 32, height: 32 }, spawnPosition);
	}

	public async loadAssets(): Promise<void>
	{
		const texture = await game.assetLoader.loadTexture(TexturePaths.NECKY);

		this.sprite = new Sprite(new Texture(texture.baseTexture));

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 1;
		this.sprite.position.x = this.hitbox.centerX;
		this.sprite.position.y = this.hitbox.y;

		this.spriteAnimator = new SpriteAnimator({
			sprite: this.sprite,
			animations: Animations.NECKY,
			startAnimation: "necky_walk",
		});
	}

	public moveX(): void
	{
		super.moveX();
		this._updateSpritePosition();
	}
	public moveY(): void
	{
		super.moveY();
		this._updateSpritePosition();
	}
	public setPosition(position: IPoint): void
	{
		super.setPosition(position);
		this._updateSpritePosition();
	}

	private _updateSpritePosition(): void
	{
		this.sprite.position.y = this.hitbox.y;
		this.sprite.position.x = this.hitbox.centerX;
	}

	public addToContainer(container: Container<DisplayObject>): void
	{
		container.addChild(this.sprite);
	}

	public onCollisionSolved(result: ICollisionData): void
	{
	}
}