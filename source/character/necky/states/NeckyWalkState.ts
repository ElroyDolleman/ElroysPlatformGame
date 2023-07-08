import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyGroundedState } from "./NeckyGroundedState";

export class NeckyWalkState extends NeckyGroundedState
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
		super.update(deltaTime);
	}

	public exit(): void
	{

	}
}