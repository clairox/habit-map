<script lang="ts">
	import Habit from './Habit.svelte';
	import Navbar from './Navbar.svelte';
	import NewHabitModal from './Modals/NewHabitModal.svelte';
	import { habits } from './stores';

	let showNewHabitModal = false;
</script>

<Navbar />
<main>
	<section class="dashboard">
		<h1>Hello, Claire</h1>
	</section>
	<section class="habits-section">
		<button on:click={() => (showNewHabitModal = true)}>+</button>
		{#each $habits as habit (habit.id)}
			<Habit {...habit} bind:category={habit.category} />
		{/each}
	</section>
</main>
<NewHabitModal bind:showModal={showNewHabitModal} />
