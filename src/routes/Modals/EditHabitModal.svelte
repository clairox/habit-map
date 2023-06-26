<script lang="ts">
	import { getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { habits } from '../stores';

	export let currentTitle: string, currentGoal: number, currentInterval: number;

	export let showModal = false;
	export let editHabit: (title?: string, goal?: number, interval?: number) => void;

	let title: string;
	let interval: number;
	let goal: number;

	$: interval = Math.floor(interval);
	$: goal = Math.floor(goal);

	const resetValues = () => {
		title = currentTitle;
		goal = currentGoal;
		interval = currentInterval;
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
		title = currentTitle;
		goal = currentGoal;
		interval = currentInterval;
	};

	const onSubmit = () => {
		editHabit(title, +goal, +interval);
		habits.set(getHabits());

		const habit = $habits.find((h) => title === h.title);

		if (habit) {
			currentTitle = habit.title;
			currentGoal = habit.goal;
			currentInterval = habit.interval;
		}

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Edit "{title}"</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="form-group">
			<label class="input-label" for="title-input">Title</label>
			<input class="input" type="text" name="title-input" placeholder="Title" bind:value={title} />
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
		<div class="form-actions">
			<button class="button" type="submit">Confirm</button>
			<button class="button" on:click={() => dialog.close()}>Cancel</button>
		</div>
	</form>
</Modal>
