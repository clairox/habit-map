import type { EditableHabitProperties, GetHabitsOptions, Habit, SortFunc } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { nDaysAgo } from '../util/time';

export function createHabit(label: string, interval: number, goal: number): Habit | null {
	const now = new Date();

	const newHabit: Habit = {
		id: uuidv4(),
		label,
		interval,
		goal,
		starred: false,
		streak: 0,
		lastStreakDate: new Date(Date.now() - Date.now()),
		tempLastStreakDate: new Date(Date.now() - Date.now()),
		createdAt: now,
		updatedAt: now
	};

	return storeOneHabitLocal(newHabit) || null;
}

export function getHabits(options?: GetHabitsOptions): Habit[] {
	let habits = retrieveHabitsLocal();

	if (options) {
		const { sortBy, offset, limit } = options;

		if (sortBy) {
			habits = sort(habits, sortBy);
		}

		if (offset) {
			habits = habits.slice(offset);
		}

		if (limit) {
			habits = habits.slice(0, limit);
		}
	} else {
		habits = sort(habits);
	}

	return habits;
}

export function getOneHabit(id: string): Habit | null {
	return retrieveOneHabitLocal(id) || null;
}

export function updateOneHabit(id: string, data: EditableHabitProperties): Habit | null {
	return editOneHabitLocal(id, data) || null;
}

export function deleteOneHabit(id: string): void {
	deleteOneHabitLocal(id);
}

/////////////////////////////////////////////////////////////////////

function storeOneHabitLocal(habit: Habit): Habit | undefined {
	const existingHabits: Habit[] = JSON.parse(localStorage.habits || '[]');
	localStorage.habits = JSON.stringify([habit, ...existingHabits]);

	return retrieveOneHabitLocal(habit.id);
}

function retrieveHabitsLocal(): Habit[] {
	return refresh(JSON.parse(localStorage.habits || '[]'));
}

function retrieveOneHabitLocal(id: string): Habit | undefined {
	return refresh(JSON.parse(localStorage.habits || '[]')).find((habit: Habit) => habit.id === id);
}

function editOneHabitLocal(id: string, data: EditableHabitProperties): Habit | undefined {
	const habit = retrieveOneHabitLocal(id);
	if (!habit) return;

	const updatedHabit = { ...habit, ...data, updatedAt: new Date() };

	deleteOneHabitLocal(id);
	return storeOneHabitLocal(updatedHabit);
}

function deleteOneHabitLocal(id: string): void {
	const updatedHabits: Habit[] = JSON.parse(localStorage.habits || '[]').filter(
		(habit: Habit) => habit.id !== id
	);
	localStorage.habits = JSON.stringify([...updatedHabits]);
}

/////////////////////////////////////////////////////////////////////

function sort(habits: Habit[], sortBy?: SortFunc): Habit[] {
	return habits.sort((a: Habit, b: Habit) => {
		switch (sortBy) {
			case 'date-asc':
				return +Date.parse(a.createdAt.toString()) - +Date.parse(b.createdAt.toString());
			case 'date-desc':
				return +Date.parse(b.createdAt.toString()) - +Date.parse(a.createdAt.toString());
			default:
				return +Date.parse(b.createdAt.toString()) - +Date.parse(a.createdAt.toString());
		}
	});
}

function refresh(habits: Habit[]): Habit[] {
	function getUpdatedStreak(habit: Habit): number {
		if (habit.tempLastStreakDate <= nDaysAgo(2)) {
			return 0;
		}

		return habit.streak;
	}

	return habits.map((habit) => {
		const updatedHabit = habit;
		updatedHabit.lastStreakDate = new Date(habit.lastStreakDate);
		updatedHabit.tempLastStreakDate = new Date(habit.tempLastStreakDate);
		updatedHabit.createdAt = new Date(habit.createdAt);
		updatedHabit.updatedAt = new Date(habit.updatedAt);
		updatedHabit.streak = getUpdatedStreak(habit);

		if (updatedHabit.tempLastStreakDate <= nDaysAgo(1))
			updatedHabit.lastStreakDate = updatedHabit.tempLastStreakDate;

		return updatedHabit;
	});
}
