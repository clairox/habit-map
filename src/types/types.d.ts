export interface Habit {
	id: string;
	label: string;
	goal: number;
	interval: number;
	starred: boolean;
	streak: number;
	lastStreakDate: Date;
	tempLastStreakDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface GetHabitsOptions {
	sortBy?: SortFunc;
	offset?: number;
	limit?: number;
}

export interface EditableHabitProperties {
	label?: string;
	goal?: number;
	interval?: number;
	entries?: HabitEntry[];
	starred?: boolean;
	streak?: number;
	tempLastStreakDate?: Date;
}

export type SortFunc = 'date-asc' | 'date-desc';

export interface Color {
	name: string;
	primary: string;
}

export interface Icon {
	id: string;
	name: string;
	imageUrl: string;
}
