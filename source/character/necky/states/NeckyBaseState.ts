import { ICollisionData } from "../../../collision/TileCollisionManager";
import { BaseState } from "../../../state_machine/BaseState";
import { StateMachine } from "../../../state_machine/StateMachine";
import { Necky } from "../Necky";

export abstract class NeckyBaseState extends BaseState<StateMachine<Necky>>
{
	public abstract update(deltaTime: number): void;
	public abstract onCollisionSolved(result: ICollisionData): void;
}