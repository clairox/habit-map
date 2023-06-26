<script lang="ts">
	export let options: { label: string; icon?: string; action: (event: Event) => void }[];

	export let isMenuOpen = false;
</script>

<div class="container">
	<button
		class="button material-symbols-rounded"
		id="options-menu-button"
		aria-haspopup="menu"
		aria-controls="options-menu"
		on:click={(e) => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		more_horiz
	</button>
	{#if isMenuOpen}
		<ul class="options-menu" id="options-menu" role="menu" aria-labelledby="options-menu-button">
			{#each options as option (option.label)}
				<li class="menu-item" role="menuitem" on:keydown={option.action} on:click={option.action}>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 100, 'opsz' 20;
	}

	.container {
		position: relative;
	}

	.button {
		padding: 0;
		border: none;
		background: none;
		color: var(--default-accent-color);
	}

	.options-menu {
		position: absolute;
		top: 0.6rem;
		left: -3.2rem;
		padding: 0;
		font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		background-color: white;
		color: #757575;
		list-style-type: none;
	}

	.menu-item {
		padding: 0.5rem 0.7rem;
	}

	.menu-item:not(:last-child) {
		border-bottom: 1px solid #f1f1f1;
	}

	.menu-item:hover {
		background-color: #e0e0e0;
		color: #313131;
	}
</style>
