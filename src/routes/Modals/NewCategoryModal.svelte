<script lang="ts">
	import { createCategory, getCategories } from '$lib/Category';
	import { colors, defaultColor } from '../../util/colors';
	import Modal from '../Modal.svelte';
	import { categories } from '../stores';

	export let showModal = false;
	export let categoryId: string;

	let dialog: HTMLDialogElement;

	let name = '';
	let color = '';
	let icon = 'square';

	let onClose = () => {
		name = '';
		color = '';
		icon = 'square';

		if (categoryId === 'createNewCategory') categoryId = '';
	};

	const onSubmit = () => {
		categoryId =
			createCategory(name, colors.find((c) => c.name === color) || defaultColor, icon)?.id || '';
		categories.set(getCategories());

		dialog.close();
	};
</script>

<Modal bind:showModal bind:dialog bind:onClose>
	<h2 slot="header">New Category</h2>
	<form slot="content" class="form" on:submit|preventDefault={onSubmit}>
		<div>
			<label for="label-input">Name</label>
			<input type="text" name="label-input" placeholder="Name" bind:value={name} />
		</div>
		<div>
			<label for="label-input">Color</label>
			<select name="category-input" bind:value={color}>
				<option value="">Default</option>
				{#each colors as c (c.name)}
					<option value={c.name}>{c.name}</option>
				{/each}
				<option value="createNewCategory">+ New category</option>
			</select>
		</div>
		<button type="submit">Add</button>
		<button type="button" on:click={() => dialog.close()}>Cancel</button>
	</form>
</Modal>
