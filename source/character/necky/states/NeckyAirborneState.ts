import { ICollisionData } from "../../../collision/TileCollisionManager";
import { NeckyStates } from "../Necky";
import { NeckyConfig } from "../NeckyConfig";
import { NeckyBaseState } from "./NeckyBaseState";

export abstract class NeckyAirborneState extends NeckyBaseState
{
	public onCollisionSolved(result: ICollisionData): void
	{
		if (result.collided.onBottom)
		{
			this._onLand();
		}
		else if (result.collided.onTop)
		{
			this._headbonk();
		}
	}

	protected _updateGravity(gravity: number = NeckyConfig.GRAVITY, maxFallspeed: number = NeckyConfig.MAX_FALLSPEED): void
	{
		if (this.machine.target.speed.y < maxFallspeed)
		{
			this.machine.target.speed.y = Math.min(this.machine.target.speed.y + gravity, maxFallspeed);
		}
	}

	protected _onLand(): void
	{
		this.machine.target.speed.y = 0;

		let state: NeckyStates = this.machine.target.speed.x === 0 ? NeckyStates.IDLE : NeckyStates.WALK;
		this.machine.changeState(state);
	}

	protected _headbonk(): void
	{
		this.machine.target.speed.y = 0;
	}
}