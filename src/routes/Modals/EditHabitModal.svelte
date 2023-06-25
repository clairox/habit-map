<script lang="ts">
	import { getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { categories, habits } from '../stores';
	import NewCategoryModal from './NewCategoryModal.svelte';

	export let currentLabel: string,
		currentGoal: number,
		currentInterval: number,
		currentCategoryId: string;

	export let showModal = false;
	export let editHabit: (
		label?: string,
		goal?: number,
		interval?: number,
		categoryId?: string
	) => void;

	let label: string;
	let interval: number;
	let goal: number;
	let categoryId: string;

	$: interval = Math.floor(interval);
	$: goal = Math.floor(goal);

	const resetValues = () => {
		label = currentLabel;
		goal = currentGoal;
		interval = currentInterval;
		categoryId = currentCategoryId;
	};

	resetValues();

	let dialog: HTMLDialogElement;

	let showCategoryModal = false;

	const onCategorySelected = (e: Event) => {
		const select = e.target as HTMLSelectElement;

		if (select.value === 'createNewCategory') {
			showCategoryModal = true;
		}
	};

	let onClose = () => {
		label = currentLabel;
		goal = currentGoal;
		interval = currentInterval;
		categoryId = currentCategoryId;
	};

	const onSubmit = () => {
		editHabit(label, +goal, +interval, categoryId);
		habits.set(getHabits());

		const habit = $habits.find((h) => label === h.label);

		if (habit) {
			currentLabel = habit.label;
			currentGoal = habit.goal;
			currentInterval = habit.interval;
			currentCategoryId = habit.categoryId || '';
		}

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Edit "{label}"</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="form-group">
			<label class="input-label" for="title-input">Title</label>
			<input class="input" type="text" name="title-input" placeholder="Title" bind:value={label} />
		</div>
		<div class="form-row">
			<div class="form-group">
				<label class="input-label" for="interval-input">Interval</label>
				<input
					class="input"
					type="text"
					name="interval-input"
					placeholder="Interval"
					bind:value={interval}
				/>
			</div>
			<div class="form-group">
				<label class="input-label" for="goal-input">Goal</label>
				<input class="input" type="text" name="goal-input" placeholder="Goal" bind:value={goal} />
			</div>
		</div>
		<div class="form-group">
			<label class="input-label" for="category-input">Category</label>
			<select
				class="input"
				name="category-input"
				on:change={(e) => onCategorySelected(e)}
				bind:value={categoryId}
			>
				<option value="">No category</option>
				{#each $categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
				<option value="createNewCategory">+ New category</option>
			</select>
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Confirm</button>
			<button class="button" on:click={() => dialog.close()}>Cancel</button>
		</div>
	</form>
</Modal>
<NewCategoryModal bind:showModal={showCategoryModal} bind:categoryId />
