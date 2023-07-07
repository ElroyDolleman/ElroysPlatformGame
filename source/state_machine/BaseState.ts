export abstract class BaseState<T>
{
	public get stateMachine(): T { return this._stateMachine; }
	private _stateMachine: T;

	public constructor(stateMachine: T)
	{
		this._stateMachine = stateMachine;
	}

    public abstract enter(): void;
    public abstract exit(): void;
}