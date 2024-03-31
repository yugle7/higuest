<script>
	import { state } from '$lib';

	export let key;
	export let labels;
</script>

<div class="col gap-20">
	{#each labels as label, i (i)}
		<button
			class="link"
			class:selected={$state[key] == i}
			on:click|preventDefault={() => ($state[key] = $state[key] != i ? i : null)}
		>
			{label}
		</button>
	{/each}
</div>
