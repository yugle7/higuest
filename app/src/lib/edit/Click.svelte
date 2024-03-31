<script>
	import { state } from '$lib';

	export let key;
	export let values;
	export let title;
</script>

<div class="row line-1 gap-5 font-16">
	<span class="label right-5">{title}</span>

	{#each values as value (value)}
		<button
			class="button"
			class:selected={$state[key] === value}
			on:click|preventDefault={() => ($state[key] = value === $state[key] ? null : value)}
		>
			{value}
		</button>
	{/each}
</div>

<style>
	button {
		width: 34px;
		padding: 8px 0;
		transition: none;
	}
	div {
		min-width: fit-content;
	}
</style>
