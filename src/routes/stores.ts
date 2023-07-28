import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getHabits } from '$lib/Habit';
import type { Habit, ThemeColor } from '../types/types';

export const habits: Writable<Habit[]> = writable(browser ? getHabits() : []);
export const name: Writable<string> = writable(browser ? localStorage.getItem('name') || '' : '');

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
