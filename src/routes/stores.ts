import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getHabits } from '$lib/Habit';
import type { Habit } from '../types/types';

export const habits: Writable<Habit[]> = writable(browser ? getHabits() : []);
