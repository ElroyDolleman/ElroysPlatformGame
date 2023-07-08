//
// This code is generated by export_aseprite.js
// Don't edit by hand. Or do, it's your life, I don't care.
//

import { Rectangle } from "../geometry/Rectangle";
import { AnimationData } from "./AnimationData";

export class Animations
{
	public static readonly CHARACTER: AnimationData = {
		"character_fall": [
			new Rectangle(2, 2, 15, 19),
		],
		"character_idle": [
			new Rectangle(2, 25, 15, 19),
		],
		"character_walk": [
			new Rectangle(2, 48, 16, 18),
			new Rectangle(2, 25, 15, 19),
		],
		"character_jump": [
			new Rectangle(21, 2, 15, 18),
		],
	};
	public static readonly NECKY: AnimationData = {
		"necky_walk": [
			new Rectangle(2, 2, 34, 31),
			new Rectangle(40, 2, 34, 30),
			new Rectangle(78, 2, 33, 31),
			new Rectangle(77, 72, 32, 31),
		],
		"necky_fall": [
			new Rectangle(40, 36, 33, 28),
		],
		"necky_jump": [
			new Rectangle(2, 37, 32, 33),
		],
		"necky_idle": [
			new Rectangle(115, 2, 32, 32),
			new Rectangle(77, 37, 32, 31),
			new Rectangle(38, 68, 32, 30),
			new Rectangle(77, 37, 32, 31),
		],
	};
}