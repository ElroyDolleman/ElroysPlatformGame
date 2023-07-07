import { Application, VERSION, settings, Ticker, Assets } from "pixi.js";
import { UpdateManager } from "./managers/UpdateManager";
import { LevelLoader } from "./level/LevelLoader";

type Game = {
	app: Application;
	ticker: Ticker;
	managers: {
		updateManager: UpdateManager;
		levelLoader: LevelLoader;
	}
}
export let game: Game;

document.addEventListener("DOMContentLoaded", () =>
{
	console.log("%c" + GAME_TITLE + " " + GAME_VERSION, "color: #1099BB; font-size: 16px;");
	console.log("%cPIXI " + VERSION, "color: pink; font-size: 14px;");

	settings.RESOLUTION = window.devicePixelRatio || 1;
	game = {
		app: new Application({
			// resizeTo: window, // Auto fill the screen
			autoDensity: true, // Handles high DPI screens
			backgroundColor: 0x1099bb,
		}),
		ticker: Ticker.shared,
		managers: {
			updateManager: new UpdateManager,
			levelLoader: new LevelLoader
		}
	};

	document.body.appendChild(game.app.view as any);

	game.ticker.add(game.managers.updateManager.update, game.managers.updateManager);
	game.ticker.start();

	// TODO: add to dedicated screen
	game.managers.levelLoader.loadLevel("playground").then(level =>
	{
		level.addToContainer(game.app.stage);
	});
});