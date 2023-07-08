import { NeckyStates } from "../Necky";
import { NeckyConfig } from "../NeckyConfig";
import { NeckyAirborneState } from "./NeckyAirborneState";

export class NeckyJumpState extends NeckyAirborneState
{
	private _isHoldingJump: boolean;
	private get _jumpHeldDownFrames(): number { return this.machine.target.jumpKey.heldDownFrames; }

	public enter(): void
	{
		this._isHoldingJump = true;
		this.machine.target.speed.y -= NeckyConfig.INITIAL_JUMP_POWER;
		this.machine.target.spriteAnimator.changeAnimation("necky_jump");
	}

	public update(deltaTime: number): void
	{
		this.machine.target.updateMovementControls(deltaTime);

		if (this._isHoldingJump && this._jumpHeldDownFrames > 1 && this._jumpHeldDownFrames < 12)
		{
			this.machine.target.speed.y -= NeckyConfig.JUMP_POWER;
		}
		else if (this.machine.target.jumpKey.heldDownFrames === 0)
		{
			this._isHoldingJump = false;
		}

		this._updateGravity();

		if (this.machine.target.speed.y >= 0)
		{
			this.machine.changeState(NeckyStates.FALL);
		}
	}

	public exit(): void
	{

	}
}