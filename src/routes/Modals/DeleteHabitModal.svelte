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
	<form slot="content" class="form" on:submit|preventDefault={onSubmit}>
		<div>
			Are you sure you want to delete {label}?
		</div>
		<button type="submit">Confirm</button>
		<button type="button" on:click={() => dialog.close()}>Cancel</button>
	</form>
</Modal>
