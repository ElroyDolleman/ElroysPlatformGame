import { game } from "../app";
import { Level } from "../level/Level";
import { BaseScene } from "./BaseScene";

type GameSceneData = {
	level: string;
}

export class GameScene extends BaseScene
{
	private _currentLevel: Level;

	public async initialize(data: GameSceneData): Promise<void>
	{
		this._currentLevel = await game.levelLoader.loadLevel(data.level);
	}

	public enter(): void
	{
		this._currentLevel.addToContainer(game.app.stage);
	}

	public update(): void
	{

	}

	public async exit(): Promise<void>
	{

	}
}