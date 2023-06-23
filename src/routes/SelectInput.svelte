<div>
	<div>
		<span>{selectedOption}</span>
		<span>{downChevron}</span>
	</div>
	<div>
		{#if isMenuOpen}
			<ul id="options-menu" role="menu" aria-labelledby="options-menu-button">
				<li>-- Select a category --</li>
				{#each options as option (option.id)}
					<li
						role="menuitem"
						on:keydown={(e) => onOptionClicked(e, option.id)}
						on:click={(e) => onOptionClicked(e, option.id)}
					>
						Edit
					</li>
				{/each}
				<li>+ New Category</li>
			</ul>
		{/if}
	</div>
</div>
