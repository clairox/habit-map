<script lang="ts">
	import { onMount } from 'svelte';

	export let onChange: (event: Event) => void;
	export let value = false;

	let checkboxElement: HTMLInputElement;

	onMount(() => {
		checkboxElement.checked = value;
	});

	const onClicked = (e: Event) => {
		checkboxElement.click();
	};

	const onCheckboxChange = (e: Event) => {
		value = (e.target as HTMLInputElement).checked;
		onChange(e);
	};
</script>

<button on:click={onClicked}>
	<input type="checkbox" {value} bind:this={checkboxElement} on:change={onCheckboxChange} />
	<span class="checkbox material-symbols-rounded {value ? 'checked' : ''}">check_box</span>
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
