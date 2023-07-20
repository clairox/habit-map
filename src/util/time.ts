import { browser } from '$app/environment';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = HOUR * 24;

const normalizeDate = (date: Date): Date => {
	const normalizedDate = date;

	normalizedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return new Date(
		Math.floor(Date.parse(normalizedDate.toString()) / DAY) * DAY +
			MINUTE * date.getTimezoneOffset()
	);
};

export const getToday = (): Date => {
	const date = new Date();
	return normalizeDate(date);
};

export const nDaysAgo = (n: number): Date => {
	const nDaysAgo = getToday();
	nDaysAgo.setDate(nDaysAgo.getDate() - n);

	return nDaysAgo;
};

export const nDaysBefore = (date: Date, n: number): Date => {
	const nDaysBefore = normalizeDate(new Date(date));
	nDaysBefore.setDate(nDaysBefore.getDate() - n);

	return nDaysBefore;
};

export const daysUntil = (date: Date): number => {
	const today = getToday();
	const targetDate = normalizeDate(date);

	const days = (Date.parse(targetDate.toString()) - Date.parse(today.toString())) / DAY;

	return days;
};
