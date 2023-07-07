import { BaseState } from "./BaseState";

export class StateMachine<T>
{
	public get target(): T { return this._target; }

	private _target: T;
	private _currentState: BaseState<StateMachine<T>>;

	public constructor(target: T)
	{
		this._target = target;
	}

	public changeState(nextState: BaseState<StateMachine<T>>): void
	{
		this._currentState.exit();
		this._currentState = nextState;
		this._currentState.enter();
	}
}