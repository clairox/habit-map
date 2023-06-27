const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const normalizeDate = (date: Date): Date => {
	return new Date(Math.floor(Date.parse(date.toString()) / DAY) * DAY);
};

export const getToday = (): Date => {
	return normalizeDate(new Date());
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
