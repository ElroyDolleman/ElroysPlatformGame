import { ICollisionData } from "../../../collision/TileCollisionManager";
import { Tile } from "../../../grid/tiles/Tile";
import { NeckyStates } from "../Necky";
import { NeckyBaseState } from "./NeckyBaseState";

export abstract class NeckyGroundedState extends NeckyBaseState
{
	public update(deltaTime: number): void
	{
		if (this.machine.target.jumpKey.heldDownFrames === 1)
		{
			this.machine.changeState(NeckyStates.JUMP);
		}
	}

	public onCollisionSolved(result: ICollisionData): void
	{
		if (!this._hasGroundUnderneath(result.tiles))
		{
			this.machine.changeState(NeckyStates.FALL);
		}

		if ((result.collided.onRight && this.machine.target.speed.x > 0) ||
		(result.collided.onLeft && this.machine.target.speed.x < 0))
		{
			this.machine.target.speed.x = 0;
		}
	}

	protected _hasGroundUnderneath(tiles: Tile[]): boolean
	{
		for (let i = 0; i < tiles.length; i++)
		{
			if (!tiles[i].canStandOn())
			{
				continue;
			}
			if (this._isStandingOnTile(tiles[i]))
			{
				return true;
			}
		}
		return false;
	}

	protected _isStandingOnTile(tile: Tile): boolean
	{
		return this.machine.target.hitbox.isOnTopOf(tile.hitbox) && this.machine.target.hitbox.intersectsX(tile.hitbox);
	}
}