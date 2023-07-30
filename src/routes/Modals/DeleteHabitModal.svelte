<script lang="ts">
	import Modal from '../Modal.svelte';
	import { habits, deleteOneHabit } from '../stores';

	export let id: string, title: string;
	export let showModal = false;

	let dialog: HTMLDialogElement;

	let onClose = () => {};

	const onSubmit = () => {
		deleteOneHabit(id);

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Delete "{title}"</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div>
			Are you sure you want to delete {title}?
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Confirm</button>
			<button class="button" type="button" on:click|preventDefault={() => dialog.close()}
				>Cancel</button
			>
		</div>
	</form>
</Modal>
