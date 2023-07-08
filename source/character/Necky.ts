import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { ICollisionData } from "../collision/TileCollisionManager";
import { Entity } from "../entities/Entity";
import { IDrawable } from "../entities/IDrawable";
import { IPoint } from "../geometry/IPoint";
import { game } from "../app";
import { TexturePaths } from "../assets/Assets";
import { Animations } from "../assets/Animations";
import { SpriteAnimator } from "../assets/SpriteAnimator";
import { IUpdateable } from "../managers/UpdateManager";
import { KeyboardKey } from "../managers/InputManager";
import { KeyCodes } from "../managers/KeyCodes";

export class Necky extends Entity implements IDrawable, IUpdateable
{
	public sprite: Sprite;
	public spriteAnimator: SpriteAnimator;

	public rightKey: KeyboardKey;
	public leftKey: KeyboardKey;
	public crouchKey: KeyboardKey;

	public constructor(spawnPosition: IPoint)
	{
		super({ x: 0, y: 0, width: 32, height: 32 }, spawnPosition);

		this.rightKey = game.managers.inputManager.addKey(KeyCodes.ArrowRight);
		this.leftKey = game.managers.inputManager.addKey(KeyCodes.ArrowLeft);
		this.crouchKey = game.managers.inputManager.addKey(KeyCodes.ArrowDown);
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

	public update(deltaTime: number): void
	{
		if (this.leftKey.pressed)
		{
			this.speed.x = -40 * deltaTime;
		}
		else if (this.rightKey.pressed)
		{
			this.speed.x = 40 * deltaTime;
		}
		else if (this.rightKey.released && this.leftKey.released)
		{
			this.speed.x = 0;
		}

		// TODO: Needs to be done by the collision system
		this.moveX();
		this.moveY();
	}

	public onCollisionSolved(result: ICollisionData): void
	{
	}
}