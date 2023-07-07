import { SceneManager } from "./SceneManager";

export abstract class BaseScene
{
	protected readonly _manager: SceneManager;

	public constructor(manager: SceneManager)
	{
		this._manager = manager;
	}

	public abstract initialize(data?: any): Promise<void>;

	public abstract enter(): void;
	public abstract update(deltaTime: number): void;
	public abstract exit(): Promise<void>;
}