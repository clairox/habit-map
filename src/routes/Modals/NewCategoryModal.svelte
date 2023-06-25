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
	<h2 class="title" slot="header">New Category</h2>
	<form slot="content" class="form" tabindex="-1" on:submit|preventDefault={onSubmit}>
		<div class="form-group">
			<label class="input-label" for="label-input">Name</label>
			<input class="input" type="text" name="label-input" placeholder="Name" bind:value={name} />
		</div>
		<div class="form-group">
			<label class="input-label" for="label-input">Color</label>
			<select class="input" name="category-input" bind:value={color}>
				<option value="">Default</option>
				{#each colors as c (c.name)}
					<option value={c.name}>{c.name}</option>
				{/each}
				<option value="createNewCategory">+ New category</option>
			</select>
		</div>
		<div class="form-actions">
			<button class="button" type="submit">Add</button>
			<button class="button" on:click={() => dialog.close()}>Cancel</button>
		</div>
	</form>
</Modal>
