<script lang="ts">
	import Habit from './Habit.svelte';
	import Navbar from './Navbar.svelte';
	import NewHabitModal from './Modals/NewHabitModal.svelte';
	import { habits } from './stores';

	let showNewHabitModal = false;
</script>

<Navbar />
<main>
	<!-- <section class="dashboard">
		<h1>Hello, Claire</h1>
	</section> -->
	<section class="habits-section">
		<button class="button add-habit-button" on:click={() => (showNewHabitModal = true)}
			><span class="material-symbols-rounded">add</span><span class="button-text">
				Habit</span
			></button
		>
		<div class="habits-content">
			{#each $habits as habit (habit.id)}
				<Habit {...habit} />
			{/each}
		</div>
	</section>
</main>
<NewHabitModal bind:showModal={showNewHabitModal} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;700&family=Lato&display=swap');

	:global(:root) {
		font-family: 'Albert Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		font-size: 1em;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 48;
		font-size: 1.3rem;
	}

	.button {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.7rem 0.5rem 0.4rem;
		border: none;
		border-radius: 3px;
		background: #00b579;
		color: white;
	}

	.button-text {
		font-size: 1.2rem;
	}

	.habits-content {
		margin-top: 0.5rem;
	}
</style>
