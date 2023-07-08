import { Assets, Texture } from "pixi.js";

export class AssetLoader
{
	private _cache: { [key: string]: Texture; } = {};

	public constructor() {}

	public async loadTexture(path: string): Promise<Texture>
	{
		const texture: Texture = await Assets.load(path);
		this._cache[path] = texture;
		return texture;
	}

	public getCachedTexture(path: string): Texture
	{
		return this._cache[path];
	}
}