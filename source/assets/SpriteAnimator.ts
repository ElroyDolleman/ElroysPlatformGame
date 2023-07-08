import { Sprite } from "pixi.js";
import { game } from "../app";
import { IUpdateable } from "../managers/UpdateManager";
import { AnimationData } from "./AnimationData";
import { Rectangle } from "../geometry/Rectangle";

export interface ISpriteAnimatorProperties {
	speed?: number;
	frameRate?: number;
	startAnimation: string;
	animations: AnimationData
	sprite: Sprite;
}

export class SpriteAnimator implements IUpdateable, ISpriteAnimatorProperties
{
	public get frames(): Rectangle[] { return this.animations[this._currentAnimationKey]; }
	public get frameCount(): number { return this.frames.length; }

	public get interval(): number { return 1 / this.frameRate; }

	public get facingDirection(): -1 | 1 { return this.sprite.scale.x < 0 ? -1 : 1; }

	public readonly startAnimation: string;
	public readonly animations: AnimationData;
	public readonly sprite: Sprite;

	public speed: number = 1;
	public frameRate: number = 6;

	private _elapsedTime: number = 0;
	private _currentFrameNumber: number = 0;

	private _currentAnimationKey: string;

	public constructor(properties: ISpriteAnimatorProperties)
	{
		Object.assign(this, properties);
		game.managers.updateManager.add(this);

		this._currentAnimationKey = this.startAnimation;
		this.setFrame(0);
	}

	public addAnimation(key: string, frames: Rectangle[]): void
	{
		this.animations[key] = frames;
	}

	public update(deltaTime: number): void
	{
		this._elapsedTime += deltaTime * this.speed;

		while (this._elapsedTime >= this.interval)
		{
			this.nextFrame();
			this._elapsedTime -= this.interval;
		}
		while (this._elapsedTime < 0)
		{
			this.previousFrame();
			this._elapsedTime = this.interval + this._elapsedTime;
		}
	}

	public nextFrame(): void
	{
		this.setFrame(this._currentFrameNumber + 1);
	}

	public previousFrame(): void
	{
		this.setFrame(this._currentFrameNumber - 1);
	}

	public setFrame(frame: number): void
	{
		this._currentFrameNumber = frame % this.frameCount;
		this.sprite.texture.frame = this.frames[this._currentFrameNumber];
	}

	public changeAnimation(key: string, resetFrame: boolean = true): void
	{
		this._currentAnimationKey = key;
		this.setFrame(resetFrame ? 0 : this._currentFrameNumber);
	}

	public destroy(): void
	{
		game.managers.updateManager.remove(this);
	}
}