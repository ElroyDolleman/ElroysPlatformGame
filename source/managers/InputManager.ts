import { GameEvent } from "../utils/GameEvent";
import { KeyCodes } from "./KeyCodes";
import { UpdateManager } from "./UpdateManager";

export enum KeyboardStates {
	PRESSED = 0,
	RELEASED = 1,
}

export class KeyboardKey
{
	public readonly onPressed: GameEvent<void> = new GameEvent();
	public readonly onReleased: GameEvent<void> = new GameEvent();

	public readonly code: string;

	public get state(): KeyboardStates { return this._state; }
	public get pressed(): boolean { return this._state === KeyboardStates.PRESSED; }
	public get released(): boolean { return this._state === KeyboardStates.RELEASED; }
	public get justPressed(): boolean { return this.heldDownFrames === 1; }

	public get heldDownFrames(): number
	{
		if (this.pressed)
		{
			return this._updateManager.frameCounter - this._frameWhenPressed;
		}
		return 0;
	}

	private _state: KeyboardStates;
	private _updateManager: UpdateManager;
	private _frameWhenPressed: number = 0;

	public constructor(updateManager: UpdateManager)
	{
		this._updateManager = updateManager;
	}

	public setPressed(): void
	{
		this._frameWhenPressed = this._updateManager.frameCounter;
		this._state = KeyboardStates.PRESSED;
		this.onPressed.emit();
	}
	public setReleased(): void
	{
		this._state = KeyboardStates.RELEASED;
		this.onReleased.emit();
	}
}

export class InputManager
{
	private _keys: Partial<{ [key in KeyCodes]: KeyboardKey }> = {};
	private _updateManager: UpdateManager;

	public constructor(updateManager: UpdateManager)
	{
		window.addEventListener("keydown", event => this.handleKeyDown(event));
		window.addEventListener("keyup", event => this.handleKeyUp(event));

		this._updateManager = updateManager;
	}

	public addKey(code: KeyCodes): KeyboardKey
	{
		if (!this._keys[code])
		{
			this._keys[code] = new KeyboardKey(this._updateManager);
		}
		return this._keys[code];
	}

	public handleKeyDown(event: KeyboardEvent): void
	{
		if (!event.repeat)
		{
			this._keys[event.code]?.setPressed();
		}
	}

	public handleKeyUp(event: KeyboardEvent): void
	{
		this._keys[event.code]?.setReleased();
	}
}