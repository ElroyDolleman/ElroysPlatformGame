export interface IUpdateable
{
    update(deltaTime: number);
}

export class UpdateManager
{
	public get frameCounter(): number { return this._frameCounter; }
	public get currentDeltaTime(): number { return this._deltaTime; }

	private _updateables: IUpdateable[] = [];
	private _frameCounter: number = 0;

	private _paused: number = 0;
	private _deltaTime: number = 0;

	public constructor()
	{
		window.addEventListener("blur", () => { this._handleWindowBlur(); });
		window.addEventListener("focus", () => { this._handleWindowFocus(); });
	}

	public add(updateable: IUpdateable): void
	{
		this._updateables.push(updateable);
	}

	public remove(updateable: IUpdateable): void
	{
		const index = this._updateables.indexOf(updateable);
		if (index !== -1)
		{
			this._updateables.splice(index, 1);
		}
	}

	public clear(): void
	{
		this._updateables = [];
	}

	public update(deltaTime: number): void
	{
		// TODO: Provide option for fixed or non-fixed delta time
		this._deltaTime = 0.016667;

		if (this._paused > 0) { return; }
		this._frameCounter++;

		for (let i = 0; i < this._updateables.length; i++)
		{
			// TODO: Provide option for fixed or non-fixed delta time
			this._updateables[i].update(this._deltaTime);
		}
	}

	private _handleWindowBlur(): void
	{
		this._paused++;
	}

	private _handleWindowFocus(): void
	{
		this._paused--;
	}
}