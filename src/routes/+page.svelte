<script lang="ts">
	import Habit from './Habit.svelte';
	import Navbar from './Navbar.svelte';
	import NewHabitModal from './Modals/NewHabitModal.svelte';
	import { colors } from '../util/colors';
	import { habits, name, themeColor } from './stores';
	import UserSetupModal from './Modals/UserSetupModal.svelte';

	let showNewHabitModal = false;
	let showCreateNameModal = false;

	$: primaryColor = colors.find((c) => c.name === $themeColor)!.primaryColor;

	if (!$name) showCreateNameModal = true;
</script>

<Navbar />
<main>
	{#if $name}
		<section class="dashboard">
			<h1>hello, {$name}!</h1>
		</section>
	{/if}
	<section class="habits-section">
		<div class="habits-content">
			{#each $habits as habit (habit.id)}
				<Habit {...habit} />
			{/each}
		</div>
	</section>
</main>
<div class="toolbar">
	<button
		class="button add-habit-button"
		style="background: {primaryColor}"
		on:click={() => (showNewHabitModal = true)}
	>
		<span class="material-symbols-rounded">add</span>
	</button>
</div>
<NewHabitModal bind:showModal={showNewHabitModal} />
<UserSetupModal bind:showModal={showCreateNameModal} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;700&family=Lato&display=swap');

	:global(:root) {
		font-family: 'Albert Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		font-size: 1em;
		--default-primary-color: rgb(42, 170, 138);
		--default-light-color: rgb(85, 207, 177);
		--default-dark-color: rgb(43, 136, 113);
		--default-accent-color: rgb(255, 255, 255);
		--default-bg-color: rgb(64, 62, 71);
		--default-bg-secondary-color: rgb(100, 97, 110);
	}

	:global(body) {
		margin: 0;
		background: var(--default-bg-color);
		color: var(--default-accent-color);
		box-sizing: border-box;
	}

	:global(.title) {
		margin: 0;
	}

	:global(.form) {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	:global(.form-group) {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.5rem;
	}

	:global(.input-label) {
		margin-bottom: 0.3rem;
		font-family: 'Lato';
		font-size: 0.9rem;
	}

	:global(.input),
	:global(.button) {
		padding: 0.1rem 0.6rem;
		height: 1.6rem;
		border: none;
		border-radius: 3px;
		color: var(--default-bg-color);
		box-sizing: border-box;
	}

	:global(.form-row) {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	:global(.form-row > .form-group) {
		width: 0;
		flex-grow: 1;
	}

	:global(.form-actions) {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
	}

	main {
		margin: 2rem 0.5rem 4rem 0.5rem;
		padding-bottom: 1rem;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 600, 'opsz' 40;
		font-size: 2rem;
	}

	.button {
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 4rem;
		width: 100vw;
		border: none;
		background: var(--default-primary-color);
		color: var(--default-accent-color);
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.329));
	}

	.button:hover {
		background: var(--default-dark-color);
	}

	.habits-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(.material-icons) {
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 24px; /* Preferred icon size */
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;

		/* Support for all WebKit browsers. */
		-webkit-font-smoothing: antialiased;
		/* Support for Safari and Chrome. */
		text-rendering: optimizeLegibility;

		/* Support for Firefox. */
		-moz-osx-font-smoothing: grayscale;

		/* Support for IE. */
		font-feature-settings: 'liga';
	}

	h1 {
		font-size: 2rem;
	}

	.dashboard {
		margin: auto;
		width: 95%;
	}
</style>
