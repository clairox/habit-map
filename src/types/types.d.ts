export interface Habit {
	id: string;
	title: string;
	interval: number;
	goal: number;
	color: ThemeColor;
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
	title?: string;
	interval?: number;
	goal?: number;
	color?: ThemeColor;
	entries?: HabitEntry[];
	starred?: boolean;
	streak?: number;
	tempLastStreakDate?: Date;
}

export type SortFunc = 'date-asc' | 'date-desc';

export type ThemeColor =
	| 'Coral'
	| 'Rust'
	| 'Mustard'
	| 'Cactus'
	| 'Jade'
	| 'Ocean'
	| 'Aubergine'
	| 'Salmon';
