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
import { NeckyFallState } from "./states/NeckyFallState";
import { NeckyJumpState } from "./states/NeckyJumpState";
import { NeckyConfig } from "./NeckyConfig";
import { NumberUtility } from "../../utils/NumberUtility";
import { Rectangle } from "../../geometry/Rectangle";

export enum NeckyStates {
	IDLE = "idle",
	WALK = "walk",
	FALL = "fall",
	JUMP = "jump",
}

export class Necky extends Entity implements IDrawable, IUpdateable
{
	public sprite: Sprite;
	public spriteAnimator: SpriteAnimator;

	public rightKey: KeyboardKey;
	public leftKey: KeyboardKey;
	public crouchKey: KeyboardKey;
	public jumpKey: KeyboardKey;

	private _stateMachine: StateMachine<Necky> = new StateMachine(this);

	public constructor(spawnPosition: IPoint)
	{
		super({ x: 0, y: 0, width: 32, height: 32 }, spawnPosition);

		this.rightKey = game.managers.inputManager.addKey(KeyCodes.ArrowRight);
		this.leftKey = game.managers.inputManager.addKey(KeyCodes.ArrowLeft);
		this.crouchKey = game.managers.inputManager.addKey(KeyCodes.ArrowDown);
		this.jumpKey = game.managers.inputManager.addKey(KeyCodes.ArrowUp);

		this._stateMachine.addState(NeckyStates.IDLE, new NeckyIdleState(this._stateMachine));
		this._stateMachine.addState(NeckyStates.WALK, new NeckyWalkState(this._stateMachine));
		this._stateMachine.addState(NeckyStates.FALL, new NeckyFallState(this._stateMachine));
		this._stateMachine.addState(NeckyStates.JUMP, new NeckyJumpState(this._stateMachine));
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
		this._updateSpritePosition();

		if (this.speed.x < 0)
		{
			this.sprite.scale.x = -1;
		}
		if (this.speed.x > 0)
		{
			this.sprite.scale.x = 1;
		}

		(this._stateMachine.currentState as NeckyBaseState).lateUpdate(deltaTime);
	}

	public updateMovementControls(deltaTime: number, runSpeed: number = NeckyConfig.RUN_SPEED, runAcel: number = NeckyConfig.RUN_ACCEL): void
	{
		if (this.leftKey.pressed)
		{
			if (this.speed.x > -runSpeed)
			{
				this.speed.x = Math.max(this.speed.x - runAcel, -runSpeed);
			}
			else if (this.speed.x < -runSpeed)
			{
				this.speed.x = Math.min(this.speed.x + runAcel, -runSpeed);
			}
		}
		else if (this.rightKey.pressed)
		{
			if (this.speed.x < runSpeed)
			{
				this.speed.x = Math.min(this.speed.x + runAcel, runSpeed);
			}
			else if (this.speed.x > runSpeed)
			{
				this.speed.x = Math.max(this.speed.x - runAcel, runSpeed);
			}
		}
		else
		{
			this.decelerate(runAcel);
		}

		this.spriteAnimator.speed = Math.abs(this.speed.x) / runSpeed;
	}

	public decelerate(deceleration: number): void
	{
		if (Math.abs(this.speed.x) < deceleration)
		{
			this.speed.x = 0;
		}
		else
		{
			this.speed.x -= deceleration * NumberUtility.sign(this.speed.x);
		}
	}

	// Overriding these to deal with delta time
	// Otherwise I have to multiple it by delta time everywhere else
	public moveX(): void
	{
		this.hitbox.x += this.speed.x * game.managers.updateManager.currentDeltaTime;
	}
	public moveY(): void
	{
		this.hitbox.y += this.speed.y * game.managers.updateManager.currentDeltaTime;
	}
	public get nextHitbox(): Rectangle
	{
		const nextHitbox = this.hitbox.clone();
		nextHitbox.x + this.speed.x * game.managers.updateManager.currentDeltaTime;
		nextHitbox.y + this.speed.y * game.managers.updateManager.currentDeltaTime;
		return nextHitbox;
	}

	public onCollisionSolved(result: ICollisionData): void
	{
		(this._stateMachine.currentState as NeckyBaseState).onCollisionSolved(result);
	}
}