<script lang="ts">
	import { deleteOneHabit, getHabits } from '$lib/Habit';
	import Modal from '../Modal.svelte';
	import { habits } from '../stores';

	export let id: string, label: string;
	export let showModal = false;

	let dialog: HTMLDialogElement;

	let onClose = () => {};

	const onSubmit = () => {
		deleteOneHabit(id);
		habits.set(getHabits());

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Delete "{label}"</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div>
			Are you sure you want to delete {label}?
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Confirm</button>
			<button class="button" type="button" on:click={() => dialog.close()}>Cancel</button>
		</div>
	</form>
</Modal>
