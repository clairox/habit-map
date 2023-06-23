<script lang="ts">
	import { createHabit, getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { categories, habits } from '../stores';
	import NewCategoryModal from './NewCategoryModal.svelte';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let label = '';
	let interval = 1;
	let goal = 1;
	let categoryId = '';

	$: interval = Math.floor(interval);
	$: goal = Math.floor(goal);

	let showCategoryModal = false;

	const onCategorySelected = (e: Event) => {
		const select = e.target as HTMLSelectElement;

		if (select.value === 'createNewCategory') {
			showCategoryModal = true;
		}
	};

	let onClose = () => {
		label = '';
		goal = 1;
		interval = 1;
		categoryId = '';
	};

	const onSubmit = () => {
		createHabit(label, interval, goal, categoryId);
		habits.set(getHabits());

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 slot="header">New Habit</h2>
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
		<button type="submit">Add</button>
		<button type="button" on:click={() => dialog.close()}>Cancel</button>
	</form>
</Modal>
<NewCategoryModal bind:showModal={showCategoryModal} bind:categoryId />

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-bottom: 10px;
	}
</style>
