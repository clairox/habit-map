<script lang="ts">
	import { createHabit, getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { habits } from '../stores';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let title = '';
	let interval = 1;
	let goal = 1;

	$: interval = Math.floor(interval);
	$: goal = Math.floor(goal);

	let onClose = () => {
		title = '';
		goal = 1;
		interval = 1;
	};

	const onSubmit = () => {
		createHabit(title, interval, goal);
		habits.set(getHabits());

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">New Habit</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="form-group">
			<label class="input-label" for="title-input">Title</label>
			<input class="input" type="text" name="title-input" bind:value={title} />
		</div>

		<div class="form-row">
			<div class="form-group">
				<label class="input-label" for="interval-input">Interval</label>
				<input
					class="input"
					type="text"
					name="interval-input"
					tabindex="-1"
					bind:value={interval}
				/>
			</div>

			<div class="form-group">
				<label class="input-label" for="goal-input">Goal</label>
				<input class="input" type="text" name="goal-input" bind:value={goal} />
			</div>
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Add</button>
			<button class="button" type="button" on:click={() => dialog.close()}>Cancel</button>
		</div>
	</form>
</Modal>

<style>
</style>
