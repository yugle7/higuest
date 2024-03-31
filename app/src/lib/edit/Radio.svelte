<script>
	import { state } from '$lib';

	export let key;
	export let labels;
</script>

<div class="col gap-20">
	{#each Object.entries(labels) as [value, label] (value)}
		<button
			class="link"
			class:selected={$state[key] == value}
			on:click|preventDefault={() => ($state[key] = value)}
		>
			{label}
		</button>
	{/each}
</div>
