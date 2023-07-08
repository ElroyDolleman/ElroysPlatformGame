import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyBaseState } from "./NeckyBaseState";

export class NeckyWalkState extends NeckyBaseState
{
	public enter(): void
	{
		this.machine.target.spriteAnimator.changeAnimation("necky_walk");
	}

	public update(deltaTime: number): void
	{
		this.machine.target.updateMovementControls(deltaTime);

		if (this.machine.target.rightKey.released && this.machine.target.leftKey.released)
		{
			this.machine.changeState(NeckyStates.IDLE);
		}
	}

	public lateUpdate(deltaTime: number): void
	{
		if (this.machine.target.speed.x < 0)
		{
			this.machine.target.sprite.scale.x = -1;
		}
		if (this.machine.target.speed.x > 0)
		{
			this.machine.target.sprite.scale.x = 1;
		}
	}

	public onCollisionSolved(result: ICollisionData): void
	{

	}

	public exit(): void
	{

	}
}