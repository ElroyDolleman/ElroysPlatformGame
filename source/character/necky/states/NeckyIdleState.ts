import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyGroundedState } from "./NeckyGroundedState";

export class NeckyIdleState extends NeckyGroundedState
{
	public enter(): void
	{
		this.machine.target.spriteAnimator.changeAnimation("necky_idle");
		this.machine.target.speed.x = 0;
	}

	public update(deltaTime: number): void
	{
		this.machine.target.updateMovementControls(deltaTime);

		if (this.machine.target.speed.x !== 0)
		{
			this.machine.changeState(NeckyStates.WALK);
		}

		super.update(deltaTime);
	}

	public exit(): void
	{

	}
}