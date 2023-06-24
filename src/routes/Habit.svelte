<script lang="ts">
	import { getOneCategory } from '$lib/Category';
	import { getHabits, updateOneHabit } from '$lib/Habit';
	import type { Category, Color } from '../types/types';
	import { colors, defaultColor } from '../util/colors';
	import { getToday } from '../util/time';
	import Checkbox from './Checkbox.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
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

	let onIncrementChecked = (e: Event) => {
		const checked = (e.target as HTMLInputElement).checked;
		updateOneHabit(id, {
			streak: checked ? streak + 1 : streak - 1,
			tempLastStreakDate: checked ? getToday() : lastStreakDate
		});
		habits.set(getHabits());
	};

	let options = [
		{ label: 'Edit', action: onEditClicked },
		{ label: 'Delete', action: onDeleteClicked }
	];
</script>

<div class="habit container" style="color: {color?.primary}">
	<div class="inner">
		<div class="top-section">
			<h3 class="label">
				{label.slice(0, 1).toUpperCase() + label.slice(1)}
				{#if category}
					<span class="category"> - {category.name}</span>
				{/if}
			</h3>
			<DropdownMenu bind:options bind:isMenuOpen />
		</div>
		<div class="bottom-section">
			<p>{formatInterval(interval)}</p>
			<div class="streak-increment-checkbox">
				<Checkbox bind:value={streakIncremented} bind:onChange={onIncrementChecked} />
			</div>
		</div>
		<!-- <p>{completionPercentage > 100 ? 100 : completionPercentage}%</p> -->
	</div>
	<div class="progress-bar">
		<div
			class="progress"
			style="width: {completionPercentage}%; background-color: {color?.primary};;"
		/>
	</div>
</div>
<EditHabitModal {...editHabitModalProps} {editHabit} bind:showModal={showEditModal} />
<DeleteHabitModal {id} {label} bind:showModal={showDeleteModal} />

<style>
	h3,
	p {
		margin: 0;
	}

	.material-symbols-sharp {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 48;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 48;
		font-size: 3rem;
		color: #adf1d6;
	}

	.container {
		margin-bottom: 0.5rem;
		border: 1px solid #00b579;
		border-radius: 3px;
		color: #00b579;
		background-color: #ebfff7;
	}

	.inner {
		padding: 0.5rem 0.7rem 0.3rem 0.7rem;
	}

	.top-section {
		display: flex;
		justify-content: space-between;
	}

	.bottom-section {
		display: flex;
		justify-content: space-between;
		padding-right: 3rem;
	}

	.category {
		font-weight: normal;
		font-size: 1rem;
	}

	.streak-increment-checkbox {
		margin-bottom: 1rem;
	}

	.progress-bar {
		width: 100%;
		height: 0.4rem;
	}

	.progress {
		width: 0%;
		height: 100%;
		background-color: #00b579;
	}
</style>
