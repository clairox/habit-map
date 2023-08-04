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
		padding: 0;
		border: 5px solid var(--default-bg-secondary-color);
		border-radius: 10px;
		width: 75vw;
		background: var(--default-bg-color);
		color: var(--default-accent-color);
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.329));
		overflow: visible;
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
		padding: 1rem;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.1);
	}

	dialog > div {
		padding: 1.5em;
	}
</style>
