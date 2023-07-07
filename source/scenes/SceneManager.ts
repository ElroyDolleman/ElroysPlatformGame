import { game } from "../app";
import { IUpdateable } from "../managers/UpdateManager";
import { BaseScene } from "./BaseScene";
import { GameScene } from "./GameScene";

export enum SceneNames {
	GameScene = "GameScene"
}

export class SceneManager implements IUpdateable
{
	private _scenes: Partial<{ [key in SceneNames]: BaseScene }> = {};
	private _currentScene: BaseScene;

	public constructor()
	{
		this._scenes[SceneNames.GameScene] = new GameScene(this);
	}

	public async initialize(): Promise<void>
	{
		await this._enterScene(SceneNames.GameScene, { level: "playground" });

		game.managers.updateManager.add(this);
	}

	public update(deltaTime: number): void
	{
		this._currentScene.update(deltaTime);
	}

	public async changeScene(name: SceneNames, data?: any): Promise<void>
	{
		await this._currentScene.exit();
		await this._enterScene(name, data);
	}

	private async _enterScene(name: SceneNames, data?: any): Promise<void>
	{
		this._currentScene = this._scenes[name];
		await this._currentScene.initialize(data);
		this._currentScene.enter();
	}
}