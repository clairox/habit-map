<script lang="ts">
	import { createHabit, getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { habits } from '../stores';
	import ColorSelect from '../ColorSelect.svelte';
	import type { ThemeColor } from '../../types/types';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let title: string = '';
	let interval: string = '1';
	let goal: string = '1';
	let color: ThemeColor = 'Jade';

	$: interval = enforceIntOnly(interval);
	$: goal = enforceIntOnly(goal);

	const enforceIntOnly = (text: string) => {
		return text.replace(/[^0-9]/g, '');
	};

	let onClose = () => {
		title = '';
		interval = '1';
		goal = '1';
		color = 'Jade';
	};

	const onSubmit = () => {
		const intervalAsInt = Math.floor(parseInt(interval)) || 1;
		const goalAsInt = Math.floor(parseInt(goal)) || 1;

		createHabit(title, intervalAsInt, goalAsInt, color);
		habits.set(getHabits());

		dialog.close();
	};

	const selectSize: 'sm' | 'lg' = 'lg';
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
		<div class="form-group">
			<label class="input-label" for="color-input">Color</label>
			<ColorSelect size={selectSize} bind:value={color} />
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Add</button>
			<button class="button" type="button" on:click|preventDefault={() => dialog.close()}
				>Cancel</button
			>
		</div>
	</form>
</Modal>

<style>
</style>
