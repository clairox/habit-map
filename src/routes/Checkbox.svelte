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

<div on:click={onClicked} on:keydown={onClicked}>
	<input type="checkbox" {value} bind:this={checkboxElement} on:change={onCheckboxChange} />
	<span class="checkbox material-symbols-rounded {value ? 'checked' : ''}">check_circle</span>
</div>

<style>
	input[type='checkbox'] {
		display: none;
	}

	.checkbox {
		cursor: default;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 48;
		font-size: 3rem;
		color: #adf1d6;
	}

	.checked {
		color: #009e60;
	}
</style>
