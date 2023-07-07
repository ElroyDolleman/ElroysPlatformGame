export class Hours
{
	private constructor() {}

	public static toHours(hours: number): number
	{
		return hours;
	}

	public static toMinutes(hours: number): number
	{
		return hours * 60;
	}

	public static toSeconds(hours: number): number
	{
		return hours * 60 * 60;
	}

	public static toMilliseconds(hours: number): number
	{
		return hours * 60 * 60 * 1000;
	}

	public static toDays(hours: number): number
	{
		return hours / 24;
	}
}