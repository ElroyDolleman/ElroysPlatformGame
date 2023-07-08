import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyBaseState } from "./NeckyBaseState";

export class NeckyIdleState extends NeckyBaseState
{
	public enter(): void
	{
		this.machine.target.spriteAnimator.changeAnimation("necky_idle");
		this.machine.target.speed.x = 0;
	}

	public update(deltaTime: number): void
	{
		if (this.machine.target.leftKey.pressed || this.machine.target.rightKey.pressed)
		{
			this.machine.changeState(NeckyStates.WALK);

			// Ensure the movement is updated at the frame you press to move
			this.machine.target.updateMovementControls(deltaTime);
		}
	}

	public onCollisionSolved(result: ICollisionData): void
	{

	}

	public exit(): void
	{

	}
}