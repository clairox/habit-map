<nav class="nav">
	<div id="nav-left">
		<h1 class="brand">HabitMap</h1>
	</div>
	<div id="nav-right">
		<button class="button settings-button material-symbols-rounded">settings</button>
	</div>
</nav>

<style>
	h1,
	h3 {
		margin: 0;
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;
		font-size: 1.8rem;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	#nav-left {
	}

	#nav-right {
		display: flex;
		align-items: center;
	}

	.brand {
		font-size: 2rem;
		cursor: pointer;
	}

	.button {
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	}
</style>
