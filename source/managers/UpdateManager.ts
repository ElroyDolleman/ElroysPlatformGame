export interface IUpdateable
{
    update(deltaTime: number);
}

export class UpdateManager
{
	private _updateables: IUpdateable[] = [];

	public constructor()
	{

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
		for (let i = 0; i < this._updateables.length; i++)
		{
			// TODO: Provide option for fixed or non-fixed delta time
			this._updateables[i].update(0.016667);
		}
	}
}