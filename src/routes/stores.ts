import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Category, CompactHabit } from '../types/types';
import { getHabits } from '$lib/Habit';
import { getCategories } from '$lib/Category';

export const habits: Writable<CompactHabit[]> = writable(browser ? getHabits() : []);
export const categories: Writable<Category[]> = writable(browser ? getCategories() : []);
