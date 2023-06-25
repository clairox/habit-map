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
	<div class="top-section">
		<div class="header">
			<h3 class="title">
				{label.slice(0, 1).toUpperCase() + label.slice(1)}
				<span class="completetion-percentage"> - {completionPercentage}%</span>
			</h3>
		</div>
		<DropdownMenu bind:options bind:isMenuOpen />
	</div>
	<div class="bottom-section">
		<div class="info">
			<p>{formatInterval(interval)}</p>
			<div class="streak-increment-checkbox">
				<Checkbox bind:value={streakIncremented} bind:onChange={onIncrementChecked} />
			</div>
		</div>
		<div class="progress-bar">
			<div
				class="progress"
				style="width: {completionPercentage}%; background-color: {color?.primary};;"
			/>
		</div>
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

	.container {
		border: 5px solid var(--default-light-color);
		border-radius: 10px;
		color: #fff;
		background-color: var(--default-light-color);
	}

	.top-section {
		display: flex;
		justify-content: space-between;
		padding: 0.2rem 0.7rem 0 0.7rem;
	}

	.bottom-section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
		background: var(--default-primary-color);
		font-family: 'Lato';
		overflow: hidden;
	}

	.header {
		display: flex;
		flex-direction: row;
	}

	.title {
		padding-right: 0.3rem;
		font-weight: bold;
	}

	.completetion-percentage {
		line-height: 1.5rem;
		font-size: 0.9rem;
		font-weight: normal;
	}

	.info {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0.7rem 0.3rem 0.7rem;
	}

	.category {
		font-weight: normal;
		font-size: 1rem;
	}

	.streak-increment-checkbox {
	}

	.progress-bar {
		width: 100%;
		height: 0.5rem;
	}

	.progress {
		width: 0%;
		height: 100%;
		background-color: var(--default-accent-color);
	}
</style>
