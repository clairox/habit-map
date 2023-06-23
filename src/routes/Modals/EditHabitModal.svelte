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
	<h2 slot="header">Edit {label}</h2>
	<form slot="content" class="form" on:submit|preventDefault={onSubmit}>
		<div>
			<label for="label-input">Label</label>
			<input type="text" name="label-input" placeholder="Label" bind:value={label} />
		</div>
		<div>
			<label for="interval-input">Interval</label>
			<input type="text" name="interval-input" placeholder="Interval" bind:value={interval} />
		</div>
		<div>
			<label for="goal-input">Goal</label>
			<input type="text" name="goal-input" placeholder="Goal" bind:value={goal} />
		</div>
		<div>
			<label for="category-input">Category</label>
			<select
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
		<button type="submit">Confirm</button>
		<button type="button" on:click={() => dialog.close()}>Cancel</button>
	</form>
</Modal>
<NewCategoryModal bind:showModal={showCategoryModal} bind:categoryId />
