<script lang="ts">
	import type { ThemeColor } from '../types/types';
	import { colors } from '../util/colors';

	export let size: 'sm' | 'lg' = 'lg';
	export let value: ThemeColor = 'Jade';

	let height = size === 'lg' ? '2.4rem' : '1.6rem';
	let optionHeight = size === 'lg' ? '2.6rem' : '1.2rem';

	let isMenuOpen = false;

	const getPrimaryColor = (colorName: string) =>
		colors.find((color) => color.name === colorName)!.primaryColor;
	$: primaryColor = getPrimaryColor(value);

	let options = colors.map((color) => {
		return { value: color.name as ThemeColor, color: color.primaryColor, content: color.name };
	});

	const onChange = (e: Event, selectedValue: ThemeColor) => {
		value = selectedValue;
	};

	$: console.log(value);
</script>

<button
	class="input container"
	style="height: {height}"
	on:click|preventDefault={() => (isMenuOpen = !isMenuOpen)}
>
	<div class="input-bar">
		<span class="input-bar-content">
			<div class="color-preview-outer">
				<div class="color-preview-inner" style="background: {primaryColor}" />
			</div>
			<span class="color-name">{value}</span>
		</span>
		<span class="open-menu-button material-symbols-rounded">expand_more</span>
	</div>
	{#if isMenuOpen}
		<div class="options-menu" style="top: {height}">
			{#each options as option (option.value)}
				<div
					class="select-option"
					style="height: {optionHeight}"
					on:click={(e) => onChange(e, option.value)}
					on:keydown={(e) => onChange(e, option.value)}
				>
					<div class="color-preview-outer">
						<div class="color-preview-inner" style="background: {option.color}" />
					</div>
					<span class="color-name">{option.content}</span>
				</div>
			{/each}
		</div>
	{/if}
</button>

<style>
	.material-symbols-rounded {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 200, 'opsz' 20;
		font-size: 1.2rem;
	}

	.container {
		position: relative;
		display: flex;
		align-items: center;
		height: 1.6rem;
		background: var(--default-accent-color);
	}

	.input-bar {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-family: 'Arial';
		font-size: 13.3333px;
	}

	.input-bar-content {
		display: flex;
		gap: 0.7rem;
		line-height: 1.8rem;
	}

	.open-menu-button {
		position: absolute;
		right: -0.6rem;
		border: none;
		background: inherit;
	}

	.color-preview-outer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.7rem;
		width: 1.7rem;
		border: 1px solid lightgray;
		border-radius: 50px;
		background-color: var(--default-accent-color);
	}

	.color-preview-inner {
		height: 1.2rem;
		width: 1.2rem;
		border-radius: 50px;
	}

	.options-menu {
		position: absolute;
		left: 0rem;
		top: 1.6rem;
		height: 7.2rem;
		width: 100%;
		z-index: 100;
		overflow: scroll;
	}

	/* .empty-options {
		height: 1rem;
		width: 100%;
		border-top: 1px solid var(--default-bg-light-color);
		background-color: var(--default-accent-color);
	}

	.empty-options:hover {
		background-color: var(--default-primary-color);
		color: var(--default-accent-color);
	} */

	.select-option {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0 0.6rem;
		line-height: 1.2rem;
		background-color: var(--default-accent-color);
	}

	.select-option:first-child {
		border-top: 1px solid lightgray;
	}

	.select-option:hover {
		background-color: var(--default-primary-color);
		color: var(--default-accent-color);
	}
</style>
