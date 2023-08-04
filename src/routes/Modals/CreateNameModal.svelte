<script lang="ts">
	import Modal from '../Modal.svelte';
	import { name as currentName, setName } from '../stores';

	export let showModal = false;
	let canIgnore = false;

	let dialog: HTMLDialogElement;

	let hasError = false;

	$: nameInputBorderStyle = hasError ? 'rgb(245, 143, 140)' : 'rgb(255, 255, 255)';

	let name: string = '';

	let onClose = () => {};

	const onSubmit = () => {
		if (!name || /^\s+$/.test(name)) {
			hasError = true;
			return;
		}

		let n = name;
		while (/^\s+/.test(n)) {
			n = n.slice(1);
			console.log(n);
		}

		while (/\s+$/.test(n)) {
			n = n.slice(0, n.length - 1);
			console.log(n);
		}

		setName(n);
		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose bind:canIgnore>
	<h2 class="title" slot="header">Hello!</h2>
	<form slot="content" class="form" on:submit|preventDefault={onSubmit}>
		<p style="margin: 0">Enter your name.</p>
		<div class="form-group name-group">
			<input
				class="input"
				style="background-color: {nameInputBorderStyle}"
				type="text"
				name="name-input"
				placeholder="Name"
				on:keydown={() => (hasError = false)}
				bind:value={name}
			/>
		</div>
		<div class="form-actions">
			<button class="button" type="submit" on:click={onSubmit}>Save</button>
		</div>
	</form>
</Modal>

<style>
	.input {
		outline: none;
	}
</style>
