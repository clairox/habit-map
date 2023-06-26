const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

export const getToday = (): Date => {
	return new Date(Math.floor(Date.parse(new Date().toString()) / DAY) * DAY + HOUR * 4);
};

export const nDaysAgo = (n: number): Date => {
	const nDaysAgo = getToday();
	nDaysAgo.setDate(nDaysAgo.getDate() - n);

	return nDaysAgo;
};

export const nDaysBefore = (date: Date, n: number): Date => {
	const nDaysBefore = new Date(date);
	nDaysBefore.setDate(nDaysBefore.getDate() - n);

	return nDaysBefore;
};
