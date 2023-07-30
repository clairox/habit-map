import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import {
	getHabits,
	createHabit as ch,
	updateOneHabit as uoh,
	deleteOneHabit as doh
} from '$lib/Habit';
import type { EditableHabitProperties, Habit, ThemeColor } from '../types/types';

// Habits

export const habits: Writable<Habit[]> = writable(browser ? getHabits() : []);

export const createHabit = (
	title: string,
	interval: number,
	goal: number,
	color: ThemeColor
): Habit | null => {
	const habit = ch(title, interval, goal, color);
	habits.set(getHabits());
	return habit;
};

export const updateOneHabit = (id: string, data: EditableHabitProperties): Habit | null => {
	const habit = uoh(id, data);
	habits.set(getHabits());
	return habit;
};

export const deleteOneHabit = (id: string): void => {
	doh(id);
	habits.set(getHabits());
};

// Name

export const name: Writable<string> = writable(browser ? localStorage.getItem('name') || '' : '');

// Theme Color

const getThemeColor = (): ThemeColor => {
	if (!browser) return 'Jade';

	if (localStorage.getItem('theme-color') === null) {
		localStorage.setItem('theme-color', 'Jade');
		return 'Jade';
	} else {
		return localStorage.getItem('theme-color') as ThemeColor;
	}
};

export const themeColor: Writable<ThemeColor> = writable(getThemeColor());

export const setThemeColor = (newThemeColor: ThemeColor) => {
	localStorage.setItem('theme-color', newThemeColor);
	themeColor.set((localStorage.getItem('theme-color') as ThemeColor) || 'Jade');
};
