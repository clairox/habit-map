<script lang="ts">
	import type { ThemeColor } from '../../types/types';
	import ColorSelect from '../ColorSelect.svelte';
	import Modal from '../Modal.svelte';
	import { name as currentName, themeColor as currentThemeColor } from '../stores';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	let name: string = $currentName;
	let themeColor: ThemeColor = $currentThemeColor;

	let onClose = () => {};

	const onSubmit = () => {
		localStorage.setItem('theme-color', themeColor);
		currentThemeColor.set((localStorage.getItem('theme-color') as ThemeColor) || 'Jade');

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 class="title" slot="header">Settings</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="form-group name-group">
			<label class="input-label" for="name-input">Title</label>
			<input class="input" type="text" name="title-input" placeholder="Title" bind:value={name} />
		</div>
		<div class="form-group theme-color-group">
			<label class="input-label" for="color-input">Color</label>
			<ColorSelect size={'lg'} bind:value={themeColor} />
		</div>
		<div class="delete-data" />
		<div class="form-actions">
			<button class="button" type="submit" on:click={onSubmit}>Save Changes</button>
			<button class="button" type="button" on:click|preventDefault={() => dialog.close()}
				>Cancel</button
			>
		</div>
	</form>
</Modal>
