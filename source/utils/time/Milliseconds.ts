export class Milliseconds
{
	private constructor() {}

	public static toMilliseconds(milliseconds: number): number
	{
		return milliseconds;
	}

	public static toSeconds(milliseconds: number): number
	{
		return milliseconds / 1000;
	}

	public static toMinutes(milliseconds: number): number
	{
		return milliseconds / (1000 * 60);
	}

	public static toHours(milliseconds: number): number
	{
		return milliseconds / (1000 * 60 * 60);
	}

	public static toDays(milliseconds: number): number
	{
		return milliseconds / (1000 * 60 * 60 * 24);
	}
}