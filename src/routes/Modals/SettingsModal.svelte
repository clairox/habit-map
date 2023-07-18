<script lang="ts">
	import Modal from '../Modal.svelte';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let onClose = () => {};

	const onSubmit = () => {};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Settings</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="name" />
		<div class="theme-color" />
		<div class="delete-data" />
		<div class="form-actions">
			<button class="button" type="submit">Save Changes</button>
			<button class="button" type="button" on:click|preventDefault={() => dialog.close()}
				>Cancel</button
			>
		</div>
	</form>
</Modal>
