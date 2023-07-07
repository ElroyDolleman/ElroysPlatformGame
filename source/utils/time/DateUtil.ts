import { Milliseconds } from "./Milliseconds";

export class DateUtil
{
	private constructor() {}

	public static formatMilliseconds(milliseconds: number, format: string): string
	{
		// TODO: Support different amount of digits
		let formatted = format;
		const totalSeconds = Math.floor(Milliseconds.toSeconds(milliseconds));
		const totalMinutes = Math.floor(Milliseconds.toMinutes(milliseconds));
		const totalHours = Math.floor(Milliseconds.toHours(milliseconds));
		const totalDays = Math.floor(Milliseconds.toDays(milliseconds));

		formatted = formatted.replace(/D/g, totalDays.toString());
		formatted = formatted.replace(/H/g, (totalHours % 24).toString());
		formatted = formatted.replace(/M/g, (totalMinutes % 60).toString());
		formatted = formatted.replace(/S/g, (totalSeconds % 60).toString());
		formatted = formatted.replace(/MS/g, (milliseconds % 1000).toString());

		return formatted;
	}

	public static getMillisecondsBetweenDates(date1: Date, date2: Date): number
	{
		return Math.abs(date2.getTime() - date1.getTime());
	}

	public static getSecondsBetweenDates(date1: Date, date2: Date): number
	{
		return Milliseconds.toSeconds(DateUtil.getMillisecondsBetweenDates(date1, date2));
	}

	public static getHoursBetweenDates(date1: Date, date2: Date): number
	{
		return Milliseconds.toHours(DateUtil.getMillisecondsBetweenDates(date1, date2));
	}
}