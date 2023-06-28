<script lang="ts">
	import { getHabits, updateOneHabit } from '$lib/Habit';
	import type { ThemeColor } from '../types/types';
	import { colors } from '../util/colors';
	import { daysUntil, getToday, nDaysBefore } from '../util/time';
	import Checkbox from './Checkbox.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import DeleteHabitModal from './Modals/DeleteHabitModal.svelte';
	import EditHabitModal from './Modals/EditHabitModal.svelte';
	import { habits } from './stores';

	export let id: string,
		title: string = '',
		goal: number = 0,
		interval: number = 0,
		color: ThemeColor = 'Jade',
		starred: boolean = false,
		streak: number = 0,
		lastStreakDate: Date,
		tempLastStreakDate: Date;

	$: completionPercentage =
		Math.round((streak / goal) * 100) < 100 ? Math.round((streak / goal) * 100) : 100;

	let canProgress =
		getToday().toString() === tempLastStreakDate.toString() ||
		getToday() >= nDaysBefore(tempLastStreakDate, -interval);

	let wasProgressUpdatedToday = getToday() < nDaysBefore(tempLastStreakDate, -interval);

	let isMenuOpen = false;
	let showEditModal = false;
	let showDeleteModal = false;

	const editHabit = (title?: string, interval?: number, goal?: number, color?: ThemeColor) => {
		updateOneHabit(id, { title, interval, goal, color });
	};

	const editHabitModalProps = {
		currentTitle: title,
		currentInterval: interval,
		currentGoal: goal,
		currentColor: color
	};

	const formatInterval = (interval: number) => {
		if (interval === 1) {
			return 'Daily';
		}
		return 'Every ' + interval + ' days';
	};

	let primaryColor: string, lightColor: string;

	$: primaryColor = colors.find((c) => c.name === color)!.primaryColor;
	$: lightColor = colors.find((c) => c.name === color)!.lightColor;

	const onStarredClicked = () => {
		updateOneHabit(id, { starred: !starred });
		habits.set(getHabits());
	};

	const onEditClicked = () => {
		showEditModal = true;
	};

	const onDeleteClicked = () => {
		showDeleteModal = true;
	};

	let onProgressUpdated = (e: Event) => {
		const checked = (e.target as HTMLInputElement).checked;
		updateOneHabit(id, {
			streak: checked ? streak + 1 : streak - 1,
			tempLastStreakDate: checked ? getToday() : lastStreakDate
		});
		habits.set(getHabits());
	};

	let options = [
		{ label: 'Starred', icon: starred ? 'star' : 'star_outline', action: onStarredClicked },
		{ label: 'Edit', icon: 'edit', action: onEditClicked },
		{ label: 'Delete', icon: 'delete', action: onDeleteClicked }
	];

	$: starred ? (options[0].icon = 'star') : (options[0].icon = 'star_outline');
</script>

<div class="habit container" style="border: 5px solid {lightColor}; background: {lightColor}">
	<div class="top-section">
		<div class="header">
			<h3 class="title">
				{title.slice(0, 1).toUpperCase() + title.slice(1)}
				<span class="completetion-percentage"> - {completionPercentage}%</span>
			</h3>
		</div>
		<DropdownMenu bind:options bind:isMenuOpen />
	</div>
	<div class="bottom-section" style="background: {primaryColor}">
		<div class="info">
			<p>{formatInterval(interval)}</p>
			<div class="progress-update-checkbox">
				{#if canProgress}
					<Checkbox
						bind:checked={wasProgressUpdatedToday}
						bind:onChange={onProgressUpdated}
						bind:color
					/>
				{:else}
					<span>Can progress in {daysUntil(nDaysBefore(tempLastStreakDate, -interval))} days</span>
				{/if}
			</div>
		</div>
		<div class="progress-bar">
			<div class="progress" style="width: {completionPercentage}%;" />
		</div>
	</div>
</div>

<EditHabitModal {...editHabitModalProps} {editHabit} bind:showModal={showEditModal} />
<DeleteHabitModal {id} {title} bind:showModal={showDeleteModal} />

<style>
	h3,
	p {
		margin: 0;
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
		height: 4rem;
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
