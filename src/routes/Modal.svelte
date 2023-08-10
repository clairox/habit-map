<script lang="ts">
	export let showModal: boolean;
	export let dialog: HTMLDialogElement;
	export let onClose: () => void;

	export let canIgnore: boolean = true;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {
		onClose();
		showModal = false;
	}}
	on:mousedown|self={() => canIgnore && dialog.close()}
>
	<div class="inner" on:mousedown|stopPropagation>
		<div class="header">
			<slot name="header" />
		</div>
		<div class="content">
			<slot name="content" />
		</div>
	</div>
</dialog>

<style>
	dialog {
		top: -40vh;
		padding: 0;
		width: 75vw;
		max-width: 20rem;
		border: 5px solid var(--default-bg-secondary-color);
		border-radius: 10px;
		background: var(--default-bg-color);
		color: var(--default-accent-color);
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.329));
		overflow: visible;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.2);
	}

	dialog > div {
		padding: 1.5em;
	}
	.inner {
		padding: 0;
	}

	.header {
		padding: 0.2rem 0.7rem 0.3rem 0.7rem;
		background: var(--default-bg-secondary-color);
		font-weight: bold;
	}

	.content {
		padding: 1.5rem 1rem;
	}

	@media (min-width: 600px) {
		dialog {
			max-width: 22rem;
		}
		.content {
			padding: 2rem 1.5rem;
		}
	}

	@media (min-width: 768px) {
		dialog {
			max-width: 24rem;
		}

		.content {
			padding: 3rem 1.75rem;
		}
	}
</style>
