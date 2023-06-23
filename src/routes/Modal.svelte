<script lang="ts">
	export let showModal: boolean;
	export let dialog: HTMLDialogElement;
	export let onClose: () => void;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {
		onClose();
		showModal = false;
	}}
	on:mousedown|self={() => dialog.close()}
>
	<div on:mousedown|stopPropagation>
		<slot name="header" />
		<slot name="content" />
	</div>
</dialog>

<style>
	dialog {
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.1);
	}

	dialog > div {
		padding: 1.5em;
	}
</style>
