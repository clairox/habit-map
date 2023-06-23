export interface Habit {
	id: string;
	label: string;
	goal: number;
	interval: number;
	categoryId?: string;
	starred: boolean;
	streak: number;
	lastStreakDate: Date;
	tempLastStreakDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface CompactHabit {
	id: string;
	label: string;
	goal: number;
	interval: number;
	categoryId?: string;
	starred: boolean;
	streak: number;
	lastStreakDate: Date;
	tempLastStreakDate: Date;
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
	categoryId?: string;
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

export interface Category {
	id: string;
	name: string;
	color: Color;
	icon: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface EditableCategoryProperties {
	name?: string;
	color?: Color;
	icon?: string;
}
