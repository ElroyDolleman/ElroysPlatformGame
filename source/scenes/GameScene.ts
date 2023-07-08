import { game } from "../app";
import { TexturePaths } from "../assets/Assets";
import { Necky } from "../character/necky/Necky";
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
		await game.assetLoader.loadTexture(TexturePaths.NECKY);

		this._currentLevel = await game.levelLoader.loadLevel(data.level);
	}

	public enter(): void
	{
		this._currentLevel.addTilesToContainer(game.app.stage);
		this._currentLevel.addEntitiesToContainer(game.app.stage);
	}

	public update(deltaTime: number): void
	{
		this._currentLevel.updateEntities(deltaTime);
		this._currentLevel.updateCollidables();
		this._currentLevel.lateUpdateEntities(deltaTime);
	}

	public async exit(): Promise<void>
	{

	}
}