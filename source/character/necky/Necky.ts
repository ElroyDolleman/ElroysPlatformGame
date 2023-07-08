import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { ICollisionData } from "../../collision/TileCollisionManager";
import { Entity } from "../../entities/Entity";
import { IDrawable } from "../../entities/IDrawable";
import { IPoint } from "../../geometry/IPoint";
import { game } from "../../app";
import { TexturePaths } from "../../assets/Assets";
import { Animations } from "../../assets/Animations";
import { SpriteAnimator } from "../../assets/SpriteAnimator";
import { IUpdateable } from "../../managers/UpdateManager";
import { KeyboardKey } from "../../managers/InputManager";
import { KeyCodes } from "../../managers/KeyCodes";
import { StateMachine } from "../../state_machine/StateMachine";
import { NeckyIdleState } from "./states/NeckyIdleState";
import { NeckyWalkState } from "./states/NeckyWalkState";
import { NeckyBaseState } from "./states/NeckyBaseState";
import { GraphicsShapes } from "../../assets/GraphicsShapes";

export enum NeckyStates {
	IDLE = "idle",
	WALK = "walk",
}

export class Necky extends Entity implements IDrawable, IUpdateable
{
	public sprite: Sprite;
	public spriteAnimator: SpriteAnimator;

	public rightKey: KeyboardKey;
	public leftKey: KeyboardKey;
	public crouchKey: KeyboardKey;

	private _stateMachine: StateMachine<Necky> = new StateMachine(this);

	public constructor(spawnPosition: IPoint)
	{
		super({ x: 0, y: 0, width: 32, height: 32 }, spawnPosition);

		this.rightKey = game.managers.inputManager.addKey(KeyCodes.ArrowRight);
		this.leftKey = game.managers.inputManager.addKey(KeyCodes.ArrowLeft);
		this.crouchKey = game.managers.inputManager.addKey(KeyCodes.ArrowDown);

		this._stateMachine.addState(NeckyStates.IDLE, new NeckyIdleState(this._stateMachine));
		this._stateMachine.addState(NeckyStates.WALK, new NeckyWalkState(this._stateMachine));
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
			startAnimation: "necky_idle",
		});

		this._stateMachine.start(NeckyStates.IDLE);
	}

	private _updateSpritePosition(): void
	{
		this.sprite.position.y = this.hitbox.bottom;
		this.sprite.position.x = this.hitbox.centerX;
	}

	public addToContainer(container: Container<DisplayObject>): void
	{
		container.addChild(this.sprite);
	}

	public update(deltaTime: number): void
	{
		(this._stateMachine.currentState as NeckyBaseState).update(deltaTime);
	}

	public lateUpdate(deltaTime: number): void
	{
		GraphicsShapes.drawRectangle(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, 0xFF0000, 0.5);
		this._updateSpritePosition();
		(this._stateMachine.currentState as NeckyBaseState).lateUpdate(deltaTime);
	}

	public updateMovementControls(deltaTime: number, speed: number = 40): void
	{
		if (this.leftKey.pressed)
		{
			this.speed.x = -speed * deltaTime;
		}
		else if (this.rightKey.pressed)
		{
			this.speed.x = speed * deltaTime;
		}
		else if (this.rightKey.released && this.leftKey.released)
		{
			this.speed.x = 0;
		}
	}

	public onCollisionSolved(result: ICollisionData): void
	{
		(this._stateMachine.currentState as NeckyBaseState).onCollisionSolved(result);
	}
}