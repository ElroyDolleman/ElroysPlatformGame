import { Minutes } from "../utils/time/Minutes";
import { Seconds } from "../utils/time/Seconds";
import { UpdateManager } from "./UpdateManager";

interface DelayInfo {
	millisecondsPassed: number;
	isDone: (currentMS) => boolean
	callback: () => void;
}

export class DelayManager
{
	private _delays: DelayInfo[] = [];
	private _updateManager: UpdateManager;

	public constructor(updateManager: UpdateManager)
	{
		this._updateManager = updateManager;
		this._updateManager.add(this);
	}

	public update(deltaTime: number): void
	{
		for (let i = 0; i < this._delays.length; i++)
		{
			const element = this._delays[i];
			element.millisecondsPassed += deltaTime;

			if (element.isDone(element.millisecondsPassed))
			{
				element.callback();
				this._delays.splice(i, 1);
				i--;
			}
		}
	}

	public afterFrame(): Promise<void>
	{
		return this.afterMilliseconds(0);
	}

	public afterCustom(isDone: (millisecondsPassed: number) => boolean): Promise<void>
	{
		return new Promise<void>(resolve =>
		{
			this._delays.push({
				millisecondsPassed: 0,
				callback: resolve,
				isDone: isDone
			});
		});
	}

	public afterMilliseconds(delayMS: number): Promise<void>
	{
		return this.afterCustom((currentMS) =>
		{
			return currentMS >= delayMS;
		});
	}

	public afterSeconds(seconds: number): Promise<void>
	{
		return this.afterMilliseconds(Seconds.toMilliseconds(seconds));
	}

	public afterMinutes(minutes: number): Promise<void>
	{
		return this.afterMilliseconds(Minutes.toMilliseconds(minutes));
	}
}