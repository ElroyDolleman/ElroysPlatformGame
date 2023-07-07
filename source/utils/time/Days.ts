export class Days
{
	private constructor() {}

	public static toDays(days: number): number
	{
		return days;
	}

	public static toHours(days: number): number
	{
		return days * 24;
	}

	public static toMinutes(days: number): number
	{
		return days * 24 * 60;
	}

	public static toSeconds(days: number): number
	{
		return days * 24 * 60 * 60;
	}

	public static toMilliseconds(days: number): number
	{
		return days * 24 * 60 * 60 * 1000;
	}
}