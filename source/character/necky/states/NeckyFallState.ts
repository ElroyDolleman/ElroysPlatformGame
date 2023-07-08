import { NeckyAirborneState } from "./NeckyAirborneState";

export class NeckyFallState extends NeckyAirborneState
{
	public enter(): void
	{
		this.machine.target.spriteAnimator.changeAnimation("necky_fall");
	}

	public update(deltaTime: number): void
	{
		this.machine.target.updateMovementControls(deltaTime);
		this._updateGravity();
	}

	public exit(): void
	{

	}
}