import { Application, VERSION, settings, Ticker, BaseTexture, SCALE_MODES } from "pixi.js";
import { UpdateManager } from "./managers/UpdateManager";
import { LevelLoader } from "./level/LevelLoader";
import { SceneManager } from "./scenes/SceneManager";
import { DelayManager } from "./managers/DelayManager";
import { AssetLoader } from "./assets/AssetLoader";

type Game = {
	app: Application;
	ticker: Ticker;
	managers: {
		updateManager: UpdateManager;
		delayManager: DelayManager;
		sceneManager: SceneManager;
	}
	levelLoader: LevelLoader;
	assetLoader: AssetLoader;
}
export let game: Game;

document.addEventListener("DOMContentLoaded", async() =>
{
	console.log("%c" + GAME_TITLE + " " + GAME_VERSION, "color: #1099BB; font-size: 16px;");
	console.log("%cPIXI " + VERSION, "color: pink; font-size: 14px;");

	const updateManager = new UpdateManager();

	// settings.RESOLUTION = window.devicePixelRatio || 1;
	game = {
		app: new Application({
			backgroundColor: 0x1099bb,
			width: 352,
			height: 320,
			resolution: 2,
			antialias: false,
			powerPreference: "high-performance",
		}),
		ticker: Ticker.shared,
		managers: {
			updateManager,
			delayManager: new DelayManager(updateManager),
			sceneManager: new SceneManager()
		},
		levelLoader: new LevelLoader(),
		assetLoader: new AssetLoader()
	};
	BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

	document.body.appendChild(game.app.view as any);

	await initializeManagers();

	game.ticker.add(game.managers.updateManager.update, game.managers.updateManager);
	game.ticker.start();
});

const initializeManagers = async(): Promise<void> =>
{
	await game.managers.sceneManager.initialize();
};