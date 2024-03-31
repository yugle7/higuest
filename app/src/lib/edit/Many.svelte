<script>
	import { state } from '$lib';
	import { getMask } from '$lib/data/edit';

	export let key;
	export let labels;
	export let title;

	$state[key] = $state[key] || [];
	$: mask = $state[key] && getMask($state[key]);
	let hidden = $state[key]?.length;
</script>

<button class="link font-14" on:click|preventDefault={() => (hidden = !hidden)}>
	{#if hidden && $state[key]?.length}
		{$state[key].map((v) => labels[v]).join(', ')}
	{:else}
		{title}
	{/if}
</button>

<div class="col gap-10" class:hidden>
	{#each Object.entries(labels) as [value, label] (value)}
		<label class="link" class:selected={mask & (1 << value)}>
			<input type="checkbox" name={key} {value} bind:group={$state[key]} />
			{label}
		</label>
	{/each}
</div>

<style>
	input[type='checkbox'] {
		visibility: hidden;
	}
	label:before {
		content: '–';
	}
</style>
