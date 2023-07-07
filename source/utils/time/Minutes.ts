export class Minutes
{
	private constructor() {}

	public static toMilliseconds(minutes: number): number
	{
		return minutes * 60 * 1000;
	}

	public static toSeconds(minutes: number): number
	{
		return minutes * 60;
	}

	public static toMinutes(minutes: number): number
	{
		return minutes;
	}

	public static toHours(minutes: number): number
	{
		return minutes / 60;
	}

	public static toDays(minutes: number): number
	{
		return minutes / (60 * 24);
	}
}
