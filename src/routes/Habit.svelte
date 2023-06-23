<script lang="ts">
	import { getOneCategory } from '$lib/Category';
	import { getHabits, updateOneHabit } from '$lib/Habit';
	import type { Category, Color } from '../types/types';
	import { colors, defaultColor } from '../util/colors';
	import { getToday } from '../util/time';
	import DeleteHabitModal from './Modals/DeleteHabitModal.svelte';
	import EditHabitModal from './Modals/EditHabitModal.svelte';
	import { habits } from './stores';

	export let id: string,
		label: string = '',
		goal: number = 0,
		interval: number = 0,
		categoryId: string = '',
		starred: boolean = false,
		streak: number = 0,
		lastStreakDate: Date,
		tempLastStreakDate: Date;

	$: completionPercentage =
		Math.round((streak / goal) * 100) < 100 ? Math.round((streak / goal) * 100) : 100;

	let streakIncremented = tempLastStreakDate.toString() === getToday().toString();

	let category: Category | null;

	$: category = categoryId ? getOneCategory(categoryId) : null;
	$: color = category?.color;

	let isMenuOpen = false;
	let showEditModal = false;
	let showDeleteModal = false;

	const editHabit = (label?: string, goal?: number, interval?: number, categoryId?: string) => {
		updateOneHabit(id, { label, goal, interval, categoryId });
	};

	const editHabitModalProps = {
		currentLabel: label,
		currentGoal: goal,
		currentInterval: interval,
		currentCategoryId: categoryId
	};

	const formatInterval = (interval: number) => {
		if (interval === 1) {
			return 'Daily';
		}
		return 'Every ' + interval + ' days';
	};

	const onEditClicked = () => {
		isMenuOpen = false;
		showEditModal = true;
	};

	const onDeleteClicked = () => {
		isMenuOpen = false;
		showDeleteModal = true;
	};

	const onIncrementChecked = (e: Event) => {
		const checked = (e.target as HTMLInputElement).checked;
		updateOneHabit(id, {
			streak: checked ? streak + 1 : streak - 1,
			tempLastStreakDate: checked ? getToday() : lastStreakDate
		});
		habits.set(getHabits());
	};
</script>

<div class="habit container" style="color: {color?.primary}">
	<div>
		<h3 class="label">
			{label.slice(0, 1).toUpperCase() + label.slice(1)}
			{#if category}
				<span class="category"> - {category.name}</span>
			{/if}
		</h3>
	</div>
	<button
		on:click={(e) => {
			updateOneHabit(id, { starred: !starred });
			habits.set(getHabits());
		}}>{starred ? 'star' : 'no star'}</button
	>
	<button
		id="options-menu-button"
		aria-haspopup="menu"
		aria-controls="options-menu"
		on:click={(e) => {
			isMenuOpen = !isMenuOpen;
		}}>{isMenuOpen ? 'open' : 'closed'}</button
	>
	{#if isMenuOpen}
		<ul id="options-menu" role="menu" aria-labelledby="options-menu-button">
			<li role="menuitem" on:keydown={onEditClicked} on:click={onEditClicked}>Edit</li>
			<li role="menuitem" on:keydown={onDeleteClicked} on:click={onDeleteClicked}>Delete</li>
		</ul>
	{/if}
	<label for="streak-increment-button">increment</label>
	<input
		type="checkbox"
		name="streak-increment-button"
		id="streak-increment-button"
		on:change={onIncrementChecked}
		bind:checked={streakIncremented}
	/>
	<p>{formatInterval(interval)}</p>
	<p>{completionPercentage > 100 ? 100 : completionPercentage}%</p>
	<div class="progress-bar">
		<div
			class="progress"
			style="width: {completionPercentage}%; background-color: {color?.primary}"
		/>
	</div>
</div>
<EditHabitModal {...editHabitModalProps} {editHabit} bind:showModal={showEditModal} />
<DeleteHabitModal {id} {label} bind:showModal={showDeleteModal} />

<style>
	.container {
		border: 1px solid lightgray;
		border-radius: 10px;
		color: #009e60;
	}

	.category {
		font-weight: normal;
		font-size: 1rem;
	}

	.progress-bar {
		width: 100%;
		height: 10px;
	}

	.progress {
		width: 0%;
		height: 100%;
		background-color: #009e60;
	}
</style>
