import { Sprite } from "pixi.js";
import { IRectangle } from "../../geometry/IRectangle";
import { EmptyTile } from "./EmptyTile";
import { SolidTile } from "./SolidTile";
import { Tile } from "./Tile";

export enum TileTypes {
	Empty,
	Solid,
	SemiSolid
}

export function createTile(type: TileTypes, rect: IRectangle, sprite?: Sprite): Tile
{
	switch(type)
	{
	case TileTypes.Empty:
		return new EmptyTile(rect, sprite);
	case TileTypes.Solid:
		return new SolidTile(rect, sprite);
	default:
		throw new Error(`Missing tile creation case for TileType ${type}`);
	}
}