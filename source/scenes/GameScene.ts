import { game } from "../app";
import { Necky } from "../character/necky/Necky";
import { Level } from "../level/Level";
import { BaseScene } from "./BaseScene";

type GameSceneData = {
	level: string;
}

export class GameScene extends BaseScene
{
	private _currentLevel: Level;
	private _necky: Necky;

	public async initialize(data: GameSceneData): Promise<void>
	{
		this._currentLevel = await game.levelLoader.loadLevel(data.level);

		this._necky = new Necky({ x: 100, y: 100 });
		await this._necky.loadAssets();
	}

	public enter(): void
	{
		this._currentLevel.addToContainer(game.app.stage);
		this._necky.addToContainer(game.app.stage);
	}

	public update(deltaTime: number): void
	{
		this._necky.update(deltaTime);
		this._currentLevel.collisionManager.moveCollidable(this._necky);
		this._necky.lateUpdate(deltaTime);
	}

	public async exit(): Promise<void>
	{

	}
}