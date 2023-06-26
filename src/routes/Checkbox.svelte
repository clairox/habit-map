<script lang="ts">
	import { onMount } from 'svelte';
	import type { ThemeColor } from '../types/types';
	import { colors } from '../util/colors';

	export let onChange: (event: Event) => void;
	export let checked = false;
	export let color: ThemeColor = 'Jade';

	let primaryColor: string, lightColor: string;

	$: primaryColor = colors.find((c) => c.name === color)!.primaryColor;
	$: lightColor = colors.find((c) => c.name === color)!.lightColor;

	let checkboxElement: HTMLInputElement;

	onMount(() => {
		checkboxElement.checked = checked;
	});

	const onClicked = (e: Event) => {
		checkboxElement.click();
	};

	const onCheckboxChange = (e: Event) => {
		checked = (e.target as HTMLInputElement).checked;
		onChange(e);
	};
</script>

<button on:click={onClicked}>
	<input type="checkbox" {checked} bind:this={checkboxElement} on:change={onCheckboxChange} />
	<span
		class="checkbox material-symbols-rounded {checked ? 'checked' : ''}"
		style="color: {checked ? 'var(--default-accent-color)' : lightColor}">check_box</span
	>
</button>

<style>
	button {
		all: unset;
	}

	input[type='checkbox'] {
		display: none;
	}

	.checkbox {
		cursor: default;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 48;
		font-size: 2.5rem;
		color: var(--default-light-color);
	}

	.checked {
		color: var(--default-accent-color);
	}
</style>
