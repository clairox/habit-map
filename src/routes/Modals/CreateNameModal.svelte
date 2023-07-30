<script lang="ts">
	import Modal from '../Modal.svelte';
	import { name as currentName, setName } from '../stores';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let name: string = $currentName;

	let onClose = () => {};

	const onSubmit = () => {
		setName(name);
		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Hello!</h2>
	<form slot="content" class="form" on:submit|preventDefault={onSubmit}>
		<p style="margin: 0">Enter your name.</p>
		<div class="form-group name-group">
			<input class="input" type="text" name="name-input" placeholder="Name" bind:value={name} />
		</div>
		<div class="form-actions">
			<button class="button" type="submit" on:click={onSubmit}>Save</button>
		</div>
	</form>
</Modal>
