import type { Category, Color, EditableCategoryProperties } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export function createCategory(name: string, color: Color, icon: string): Category | null {
	const now = new Date();
	const newCategory = {
		id: uuidv4(),
		name,
		color,
		icon,
		createdAt: now,
		updatedAt: now
	};

	return storeOneCategoryLocal(newCategory) || null;
}

export function getCategories(): Category[] {
	return retrieveCategorysLocal().sort((a: Category, b: Category) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
}

export function getOneCategory(id: string): Category | null {
	return retrieveOneCategoryLocal(id) || null;
}

export function updateOneCategory(id: string, data: EditableCategoryProperties): Category | null {
	return editOneCategoryLocal(id, data) || null;
}

export function deleteOneCategory(id: string): void {
	deleteOneCategoryLocal(id);
}

/////////////////////////////////////////////////////////////////////

function storeOneCategoryLocal(category: Category): Category | undefined {
	const existingCategorys: Category[] = JSON.parse(localStorage.categories || '[]');
	localStorage.categories = JSON.stringify([category, ...existingCategorys]);

	return retrieveOneCategoryLocal(category.id);
}

function retrieveCategorysLocal(): Category[] {
	return JSON.parse(localStorage.categories || '[]');
}

function retrieveOneCategoryLocal(id: string): Category | undefined {
	return JSON.parse(localStorage.categories || '[]').find(
		(category: Category) => category.id === id
	);
}

function editOneCategoryLocal(id: string, data: EditableCategoryProperties): Category | undefined {
	const category = retrieveOneCategoryLocal(id);
	if (!category) return;

	const updatedCategory = { ...category, ...data, updatedAt: new Date() };

	deleteOneCategoryLocal(id);
	return storeOneCategoryLocal(updatedCategory);
}

function deleteOneCategoryLocal(id: string): void {
	const updatedCategorys: Category[] = JSON.parse(localStorage.categories || '[]').filter(
		(category: Category) => category.id !== id
	);
	localStorage.categories = JSON.stringify([...updatedCategorys]);
}
