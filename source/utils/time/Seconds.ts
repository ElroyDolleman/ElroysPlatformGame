export class Seconds
{
	private constructor() {}

	public static toMilliseconds(seconds: number): number
	{
		return seconds * 1000;
	}

	public static toSeconds(seconds: number): number
	{
		return seconds;
	}

	public static toMinutes(seconds: number): number
	{
		return seconds / 60;
	}

	public static toHours(seconds: number): number
	{
		return seconds / (60 * 60);
	}

	public static toDays(seconds: number): number
	{
		return seconds / (60 * 60 * 24);
	}
}
