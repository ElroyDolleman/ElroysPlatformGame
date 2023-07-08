import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyConfig } from "../NeckyConfig";
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

		if (this.machine.target.speed.x === 0)
		{
			this.machine.changeState(NeckyStates.IDLE);
		}
		else
		{
			this.machine.target.spriteAnimator.speed = Math.abs(this.machine.target.speed.x) / NeckyConfig.RUN_SPEED;
		}

		super.update(deltaTime);
	}

	public exit(): void
	{
		this.machine.target.spriteAnimator.speed = 1;
	}
}